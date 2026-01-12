"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import GradientBanner from "@/components/self-made-ui/gradeint-banner";
import { MessageFAQ } from "@/constants";
import { cn } from "@/lib/utils";
import Tabs from "@/components/tab";

export default function FAQSection() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section className="w-full bg-black py-20 px-4 md:px-8">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                <div className="mb-12">
                    <GradientBanner text="Frequently Asked Questions" />
                </div>

                {/* Tabs */}
                <Tabs
                    tabs={MessageFAQ.map(c => c.category)}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    className="mb-12"
                />

                {/* Questions Accordion */}
                <div className="w-full space-y-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            {MessageFAQ[activeTab].items.map((item, index) => (
                                <FAQItem key={index} question={item.question} answer={item.answer} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-neutral-700 rounded-2xl overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left"
            >
                <span className="text-lg text-white">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <Plus className="w-6 h-6 text-neutral-400" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-6 pb-6 text-neutral-400 leading-relaxed">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
