// import * as React from "react"

// import { cn } from "@/lib/utils"

// function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
//   return (
//     <textarea
//       data-slot="textarea"
//       className={cn(
//         "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// export { Textarea }

"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "motion/react";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        const radius = 100; // Change this to increase the radius of the hover effect
        const [visible, setVisible] = React.useState(false);

        let mouseX = useMotionValue(0);
        let mouseY = useMotionValue(0);

        function handleMouseMove({ currentTarget, clientX, clientY }: any) {
            let { left, top } = currentTarget.getBoundingClientRect();

            mouseX.set(clientX - left);
            mouseY.set(clientY - top);
        }

        return (
            <motion.div
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              #3b82f6,
              transparent 80%
            )
          `,
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                className="group/input rounded-lg p-[2px] transition duration-300"
            >
                <textarea
                    className={cn(
                        `shadow-input placeholder:text-muted-foreground flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground transition duration-400 group-hover/input:shadow-none focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:text-white dark:focus-visible:ring-ring`,
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </motion.div>
        );
    }
);
Textarea.displayName = "Textarea";

export { Textarea };

