import React, { useLayoutEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
  bg?: string; // CSS background string (color/gradient)
  minHeight?: string; // e.g. '28rem'
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '', bg, minHeight = '28rem' }) => (
  <div
    className={`scroll-stack-card relative w-full p-6 md:p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
      // If a gradient/bg is passed we place an opaque dark layer beneath it so cards don't show through each other
      background: bg ? `${bg}, linear-gradient(180deg, rgba(8,8,10,0.96), rgba(4,4,6,0.99))` : 'linear-gradient(180deg, rgba(8,8,10,0.96), rgba(4,4,6,0.99))',
      minHeight
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
  /** top offset for the stack's inner padding (e.g. '20vh' or '6rem') */
  topOffset?: string;
  /** Maximum pixel height for the end spacer (keeps final gap small). Defaults to 300. */
  endSpacerMax?: number;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
  topOffset = '6rem',
  endSpacerMax = 300
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  // track whether current lenis instance is attached to window (true) or scroller (false)
  const lenisUsesWindowRef = useRef(false);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, any>());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const getScrollData = useCallback(() => {
    // Use window scroll if explicitly requested or if the active Lenis instance uses window
    const usingWindow = useWindowScroll || lenisUsesWindowRef.current;

    if (usingWindow) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller ? scroller.scrollTop : 0,
        containerHeight: scroller ? scroller.clientHeight : 0,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element: HTMLElement) => {
      const usingWindow = useWindowScroll || lenisUsesWindowRef.current;
      if (usingWindow) {
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      } else {
        return element.offsetTop;
      }
    },
    [useWindowScroll]
  );

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight, scrollContainer } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const usingWindow = useWindowScroll || lenisUsesWindowRef.current;
    const endElement = usingWindow
      ? (document.querySelector('.scroll-stack-end') as HTMLElement | null)
      : (scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement | null);

    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = getElementOffset(cardsRef.current[j]);
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        // compute pinned translate but prevent negative (moving up) to keep cards from drifting upward
        translateY = Math.max(0, scrollTop - cardTop + stackPositionPx + itemStackDistance * i);
      } else if (scrollTop > pinEnd) {
        // when past pin end, clamp to the max pin position but don't allow negative values
        translateY = Math.max(0, pinEnd - cardTop + stackPositionPx + itemStackDistance * i);
      }

      // additional clamp to keep transforms stable (avoid huge jumps)
      translateY = Math.min(translateY, Math.max(0, pinEnd - cardTop + stackPositionPx + itemStackDistance * i));

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      // stronger thresholds to avoid micro-jitter
      const translateThreshold = 0.5;
      const scaleThreshold = 0.002;
      const rotationThreshold = 0.5;
      const blurThreshold = 0.5;

      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > translateThreshold ||
        Math.abs(lastTransform.scale - newTransform.scale) > scaleThreshold ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > rotationThreshold ||
        Math.abs(lastTransform.blur - newTransform.blur) > blurThreshold;

      if (hasChanged) {
        // apply a small smoothing lerp to reduce vibration
        let appliedTransform = newTransform;
        if (lastTransform) {
          const t = 0.18; // smoothing factor
          appliedTransform = {
            translateY: lastTransform.translateY + (newTransform.translateY - lastTransform.translateY) * t,
            scale: lastTransform.scale + (newTransform.scale - lastTransform.scale) * t,
            rotation: lastTransform.rotation + (newTransform.rotation - lastTransform.rotation) * t,
            blur: lastTransform.blur + (newTransform.blur - lastTransform.blur) * t
          };

          // limit precision to avoid sub-pixel flicker
          appliedTransform.translateY = Math.round(appliedTransform.translateY * 2) / 2; // 0.5px steps
          appliedTransform.scale = Math.round(appliedTransform.scale * 1000) / 1000;
          appliedTransform.rotation = Math.round(appliedTransform.rotation * 100) / 100;
          appliedTransform.blur = Math.round(appliedTransform.blur * 100) / 100;
        }

        const transform = `translate3d(0, ${appliedTransform.translateY}px, 0) scale(${appliedTransform.scale}) rotate(${appliedTransform.rotation}deg)`;
        const filter = appliedTransform.blur > 0 ? `blur(${appliedTransform.blur}px)` : '';

        const el = card as HTMLElement;
        el.style.transform = transform;
        el.style.filter = filter;
        // keep a consistent stacking order: later items (higher index) render above earlier ones
        el.style.zIndex = `${1000 + i}`;

        lastTransformsRef.current.set(i, appliedTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    const defaultOpts = {
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075
    };

    const createLenisForWindow = () => {
      const lenis = new Lenis(defaultOpts);
      lenis.on('scroll', handleScroll);
      const raf = (time: number) => {
        if (!document.documentElement.classList.contains('lenis-stopped')) {
          lenis.raf(time);
        }
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);
      lenisRef.current = lenis;
      lenisUsesWindowRef.current = true;
      return lenis;
    };

    if (useWindowScroll) {
      return createLenisForWindow();
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      // If the scroller doesn't overflow (no internal scroll), fall back to window scrolling
      if (scroller.scrollHeight <= scroller.clientHeight) {
        return createLenisForWindow();
      }

      // ensure we note lenis is attached to the scroller element
      lenisUsesWindowRef.current = false;

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
        ...defaultOpts,
        gestureOrientation: 'vertical'
      });

      lenis.on('scroll', handleScroll);

      const raf = (time: number) => {
        // Pausing Lenis if the global class 'lenis-stopped' is present (e.g. when dialog is open)
        if (!document.documentElement.classList.contains('lenis-stopped')) {
          lenis.raf(time);
        }
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    }
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    if (!useWindowScroll && !scrollerRef.current) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : (scrollerRef.current?.querySelectorAll('.scroll-stack-card') ?? [])
    ) as HTMLElement[];
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    // Compute and apply a dynamic spacer at the end so the last pin can release
    const usingWindow = useWindowScroll || lenisUsesWindowRef.current;
    const endEl = usingWindow
      ? (document.querySelector('.scroll-stack-end') as HTMLElement | null)
      : (scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement | null);

    if (endEl) {
      const { containerHeight } = getScrollData();

      // compute a precise spacer by using global positions (bounding rects) so we avoid mismatches
      const innerEl = endEl.parentElement as HTMLElement | null;
      const endCurrentHeight = endEl.clientHeight || 0;
      const lastCard = cards[cards.length - 1];

      const lastCardRect = lastCard ? (lastCard as HTMLElement).getBoundingClientRect() : null;
      const lastCardTopGlobal = lastCardRect ? lastCardRect.top + window.scrollY : (lastCard ? getElementOffset(lastCard) : 0);
      const lastCardHeight = lastCard ? (lastCard as HTMLElement).offsetHeight : 0;

      const innerRect = innerEl ? innerEl.getBoundingClientRect() : null;
      const innerTopGlobal = innerRect ? innerRect.top + window.scrollY : (innerEl ? getElementOffset(innerEl as HTMLElement) : 0);
      const innerHeightNoEnd = (innerEl?.scrollHeight || 0) - endCurrentHeight;
      const currentInnerBottomGlobal = innerTopGlobal + innerHeightNoEnd;

      const isMobile = window.innerWidth < 768;
      // desired end top in global coordinates so last card can pin to center area
      // On mobile, we use a much smaller buffer so it releases faster and stays tight
      const verticalBuffer = isMobile ? containerHeight / 4 : containerHeight / 2;
      const desiredEndTopGlobal = lastCardTopGlobal + lastCardHeight + verticalBuffer + (isMobile ? 20 : 80);
      let desiredHeight = desiredEndTopGlobal - currentInnerBottomGlobal;

      // clamp to reasonable bounds to avoid runaway values
      const perCardEstimate = cards.length * (itemDistance ?? 100);
      const maxAllowed = Math.max(Math.min(containerHeight + 200, Math.max(containerHeight * 1.2, perCardEstimate)), 0);

      // enforce a stricter hard cap so the final gap stays small.
      // On mobile, changed from 40 to 180 to prevent "merging" with the next section
      const hardCap = isMobile ? Math.min(typeof endSpacerMax === 'number' ? endSpacerMax : 180, 180) : endSpacerMax;
      const finalMax = Math.min(maxAllowed, hardCap);
      if (desiredHeight > finalMax) desiredHeight = finalMax;
      if (desiredHeight < 0) desiredHeight = 0;

      endEl.style.height = `${Math.round(desiredHeight)}px`;
    }

    cards.forEach((card, i) => {
      // remove any extra top gap for the first card so it sits closer to the heading
      if (i === 0) {
        (card as HTMLElement).style.marginTop = '0';
      }

      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    setupLenis();

    // ensure we update transforms on resize/orientationchange
    window.addEventListener('resize', updateCardTransforms);
    window.addEventListener('orientationchange', updateCardTransforms);

    updateCardTransforms();

    return () => {
      window.removeEventListener('resize', updateCardTransforms);
      window.removeEventListener('orientationchange', updateCardTransforms);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        try {
          lenisRef.current.destroy();
        } catch (e) {
          // ignore destroy errors
        }
        lenisRef.current = null;
      }
      // ensure we reset the window-attached flag
      lenisUsesWindowRef.current = false;
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms,
    endSpacerMax
  ]);

  return (
    <div
      className={`relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim()}
      ref={scrollerRef}
      style={{
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: 'scroll-position'
      }}
    >
      <div
        className="scroll-stack-inner px-6 sm:px-12 min-h-screen"
        style={{ paddingTop: topOffset }}
      >
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
