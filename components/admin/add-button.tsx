"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AddButtonProps {
    onClick?: () => void;
    href?: string;
    label: string;
    className?: string;
}

export const AddButton = ({ onClick, href, label, className }: AddButtonProps) => {
    const buttonClasses = cn(
        "w-fit bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 px-6 h-11 rounded-xl font-semibold gap-2 transition-all active:scale-95",
        className
    );

    if (href) {
        return (
            <Button asChild className={buttonClasses}>
                <Link href={href}>
                    <Plus size={18} />
                    {label}
                </Link>
            </Button>
        );
    }

    return (
        <Button onClick={onClick} className={buttonClasses}>
            <Plus size={18} />
            {label}
        </Button>
    );
};
