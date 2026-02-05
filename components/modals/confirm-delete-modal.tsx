"use client";

import React from "react";
import { Trash2, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: React.ReactNode;
    loading?: boolean;
    itemName?: string;
}

export function ConfirmDeleteModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Deletion",
    description,
    loading = false,
    itemName,
}: ConfirmDeleteModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden bg-white/80 dark:bg-[#0B0F1A]/80 border-gray-200 dark:border-gray-800 shadow-2xl backdrop-blur-xl">
                <div className="p-6 pt-8 flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/10 flex items-center justify-center">
                        <Trash2 size={32} className="text-red-500" />
                    </div>
                    <div className="space-y-2">
                        <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                            {title}
                        </DialogTitle>
                        <DialogDescription className="text-gray-500 dark:text-gray-400 text-sm">
                            {description || (
                                <>
                                    Are you sure you want to delete{" "}
                                    <span className="font-bold text-gray-900 dark:text-white">
                                        "{itemName || "this item"}"
                                    </span>
                                    ? This action cannot be undone.
                                </>
                            )}
                        </DialogDescription>
                    </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex gap-3">
                    <Button
                        variant="outline"
                        className="flex-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-xs font-semibold h-11 rounded-xl"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        className="flex-1 bg-red-500/15 dark:bg-red-500/8 hover:bg-red-500 dark:hover:bg-red-600 text-red-600 dark:text-red-400 hover:text-white dark:hover:text-white border-none text-xs font-semibold h-11 rounded-xl"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={16} className="animate-spin mr-2" />
                                Deleting...
                            </>
                        ) : (
                            "Delete Permanently"
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
