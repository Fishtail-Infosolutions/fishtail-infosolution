'use client';

import Image from "next/image";
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Info, Wrench, FolderKanban, BookOpen, Mail, Menu, X } from 'lucide-react';
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { RainbowButton } from "./ui/rainbow-button";
import { Button } from "./ui/button";
import { Button as MovingBorderButton } from "./ui/moving-border";
import { FreeQuoteDialog } from "./homepage/free-quote-dialog";
import { ThemeToggle } from "./theme-toggle";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

interface IndicatorStyle {
  left: number;
  width: number;
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Company', path: '/company', icon: Info },
  { name: 'Career', path: '/career', icon: Wrench },
  { name: 'Projects', path: '/projects', icon: FolderKanban },
  { name: 'Blog', path: '/blog', icon: BookOpen },
  { name: 'Contact', path: '/contact', icon: Mail }
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [indicatorStyle, setIndicatorStyle] = useState<IndicatorStyle | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const prevPathnameRef = useRef<string | null>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);



  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const activeIndex = navItems.findIndex(item => isActive(item.path));

  useEffect(() => {
    const updateIndicator = () => {
      if (activeIndex !== -1) {
        const element = navItemsRef.current[activeIndex];
        if (element) {
          setIndicatorStyle({
            left: element.offsetLeft,
            width: element.offsetWidth
          });
        }
      }
    };

    // Check if this is a navigation (not first load)
    if (prevPathnameRef.current !== null && prevPathnameRef.current !== pathname) {
      setShouldAnimate(true);
    }

    const timer = setTimeout(updateIndicator, 50);
    prevPathnameRef.current = pathname;

    return () => clearTimeout(timer);
  }, [activeIndex, pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Navbar with Glassmorphism */}
      <nav className="fixed top-0 left-0 w-full bg-background/40 backdrop-blur-lg border-b border-border/40 z-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-4.5 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Image
                src={mounted && theme === 'light' ? "/logos/fishtail-logo-blue.svg" : "/logos/fishtail-logo-white.svg"}
                alt="Logo"
                width={50}
                height={50}
                className="w-40 h-10 object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex relative items-center space-x-2">
            {activeIndex !== -1 && indicatorStyle && (
              <div
                className={`absolute h-10 border border-gray-600 rounded-full ${shouldAnimate ? 'transition-all duration-500 ease-out' : ''}`}
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`
                }}
              />
            )}

            {navItems.map((item, index) => (
              <Link
                key={item.path}
                href={item.path}
                ref={(el) => {
                  navItemsRef.current[index] = el;
                }}
                className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${isActive(item.path) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side - CTA & Mobile Menu */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />

            <div className="hidden sm:block">
              <FreeQuoteDialog>
                <Button
                  className="h-10 w-32 rounded-full bg-linear-to-br from-blue-400 to-blue-700 text-white font-semibold border-none transition-all hover:opacity-90"
                >
                  Free Quote
                </Button>
              </FreeQuoteDialog>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-foreground p-2 hover:bg-accent rounded-lg transition"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>


      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-60 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu with Glassmorphism */}
      <div
        className={`fixed top-[73px] right-0 max-h-[calc(100vh-73px)] overflow-y-auto w-72 bg-white/70 dark:bg-black/60 backdrop-blur-2xl rounded-xl border-l border-b border-border/20 z-999 transform transition-transform duration-300 ease-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col p-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={handleNavClick}
                className={cn(
                  "flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive(item.path)
                    ? "bg-zinc-200/50 dark:bg-zinc-800/60 text-foreground border border-black/5 dark:border-white/10 backdrop-blur-md shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-zinc-100/30 dark:hover:bg-white/5 hover:backdrop-blur-sm"
                )}
              >
                <Icon size={20} />
                <span className="font-semibold text-base">{item.name}</span>
              </Link>
            );
          })}
          <div className="pt-4 sm:hidden">
            <FreeQuoteDialog>
              <Button
                className="w-full h-12 rounded-xl bg-linear-to-br from-blue-400 to-blue-700 text-white text-base font-semibold border-none transition-all "
                onClick={handleNavClick}
              >
                Free Quote
              </Button>
            </FreeQuoteDialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar