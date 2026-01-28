"use client";

import * as React from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Breadcrumb as BreadcrumbRoot,
    BreadcrumbList,
    BreadcrumbItem as BreadcrumbUIItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
    return (
        <BreadcrumbRoot className={className}>
            <BreadcrumbList>
                <BreadcrumbUIItem>
                    <BreadcrumbLink asChild>
                        <Link href="/admin" className="flex items-center gap-1">
                            <Home size={16} />
                            <span>Dashboard</span>
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbUIItem>

                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <React.Fragment key={index}>
                            <BreadcrumbSeparator />
                            <BreadcrumbUIItem>
                                {item.href && !isLast ? (
                                    <BreadcrumbLink asChild>
                                        <Link href={item.href}>{item.label}</Link>
                                    </BreadcrumbLink>
                                ) : (
                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                )}
                            </BreadcrumbUIItem>
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </BreadcrumbRoot>
    );
}
