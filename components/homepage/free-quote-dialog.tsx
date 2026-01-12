"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { AlertCircle, CheckCircle, Globe, Mail, Phone, Building, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Stepper, { Step } from "@/components/ui/Stepper"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
    // Step 1
    websiteUrl: z.string().url({ message: "Please enter a valid URL (e.g., https://example.com)" }),
    seoGoals: z.string().optional(),

    // Step 2
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: z.string().optional(),
    company: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface FreeQuoteDialogProps {
    children?: React.ReactNode
}

export function FreeQuoteDialog({ children }: FreeQuoteDialogProps) {
    const [isOpen, setIsOpen] = useState(false)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            websiteUrl: "",
            seoGoals: "",
            name: "",
            email: "",
            phone: "",
            company: "",
        },
        mode: "onChange",
    })



    useEffect(() => {
        if (isOpen) {
            document.documentElement.classList.add('lenis-stopped');

            return () => {
                document.documentElement.classList.remove('lenis-stopped');
            };
        }
    }, [isOpen]);


    async function onBeforeNext(step: number): Promise<boolean> {
        // Current step is passed as 'step' argument?
        // Wait, my Stepper logic passes 'currentStep' to onBeforeNext.
        // So if I am on step 1, 'step' is 1. I need to validate fields for step 1.

        // Step 1: websiteUrl
        if (step === 1) {
            const result = await form.trigger(["websiteUrl"])
            return result
        }

        // Step 2: name, email
        if (step === 2) {
            const result = await form.trigger(["name", "email"])
            return result
        }

        return true
    }

    function onFinalStepCompleted() {
        // Submit the form
        form.handleSubmit(onSubmit)()
    }

    function onSubmit(values: FormValues) {
        console.log("Form submitted:", values)
        // Here you would typically send data to API
        setIsOpen(false)
        form.reset()
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent
                data-lenis-prevent
                className="sm:max-w-[700px] w-[95vw] max-h-[85vh] overflow-y-auto bg-black/90 border-white/10 text-white backdrop-blur-xl"
            >
                <DialogTitle className="sr-only">Free Quote Request</DialogTitle>
                <Form {...form}>
                    <form className="space-y-4">
                        {/* Using a key to force re-render Stepper if dialog closes/opens? Not strictly valid but Stepper manages internal state... 
                 Ideally Stepper should control the form steps.
             */}
                        <Stepper
                            className="w-full p-4"
                            initialStep={1}
                            onBeforeNext={onBeforeNext}
                            onFinalStepCompleted={onFinalStepCompleted}
                            nextButtonText="Continue"
                            backButtonText="Back"
                            stepCircleContainerClassName="!bg-transparent !shadow-none !border-none"
                            stepContainerClassName="!p-0 !pb-6"
                            contentClassName="!px-0 !space-y-4"
                            footerClassName="!px-0"
                        >
                            <Step>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-bold">Website Information</h2>
                                        <p className="text-gray-400">Let's start by analyzing your website for free</p>
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="websiteUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base">Website URL <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                        <Input placeholder="https://www.yourwebsite.com" className="pl-9 bg-white/5 border-white/10 text-white focus:border-purple-500" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage className="text-red-400 flex items-center gap-1">
                                                    {form.formState.errors.websiteUrl && <AlertCircle className="h-3 w-3" />}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="seoGoals"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base">SEO Goals & Challenges</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Tell us about your goals or challenges..."
                                                        className="min-h-[120px] bg-white/5 border-white/10 text-white focus:border-purple-500"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </Step>

                            <Step>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-bold">Contact Information</h2>
                                        <p className="text-gray-400">How can we reach you?</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name <span className="text-red-500">*</span></FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                            <Input placeholder="John Doe" className="pl-9 bg-white/5 border-white/10 text-white" {...field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                            <Input placeholder="john@example.com" className="pl-9 bg-white/5 border-white/10 text-white" {...field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Phone Number <span className="text-gray-500 text-xs">(optional)</span></FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                            <Input placeholder="+1 234 567 890" className="pl-9 bg-white/5 border-white/10 text-white" {...field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="company"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Company <span className="text-gray-500 text-xs">(optional)</span></FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                            <Input placeholder="Acme Inc." className="pl-9 bg-white/5 border-white/10 text-white" {...field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </Step>

                            <Step>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-bold">Confirm Your Information</h2>
                                        <p className="text-gray-400">Review and submit your request</p>
                                    </div>

                                    <div className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-3">
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                                            <span className="text-gray-400">Website:</span>
                                            <span className="sm:col-span-2 font-medium break-all">{form.getValues("websiteUrl")}</span>

                                            <span className="text-gray-400">Name:</span>
                                            <span className="sm:col-span-2 font-medium">{form.getValues("name")}</span>

                                            <span className="text-gray-400">Email:</span>
                                            <span className="sm:col-span-2 font-medium break-all">{form.getValues("email")}</span>

                                            {form.getValues("phone") && (
                                                <>
                                                    <span className="text-gray-400">Phone:</span>
                                                    <span className="sm:col-span-2 font-medium">{form.getValues("phone")}</span>
                                                </>
                                            )}

                                            {form.getValues("company") && (
                                                <>
                                                    <span className="text-gray-400">Company:</span>
                                                    <span className="sm:col-span-2 font-medium">{form.getValues("company")}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {form.getValues("seoGoals") && (
                                        <div className="space-y-1">
                                            <Label className="text-gray-400">SEO Goals:</Label>
                                            <p className="text-sm bg-white/5 p-3 rounded-md italic text-gray-300 break-words">
                                                &quot;{form.getValues("seoGoals")}&quot;
                                            </p>
                                        </div>
                                    )}

                                    <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 shrink-0" />
                                            <div className="space-y-2">
                                                <h4 className="font-semibold text-green-400">What Happens Next?</h4>
                                                <ul className="text-sm text-green-100/80 space-y-1 list-disc pl-4">
                                                    <li>SEO analysis will be done in 2-3 business days.</li>
                                                    <li>A report with actionable recommendations will be provided.</li>
                                                    <li>Opportunities for improving rankings and traffic will be identified.</li>
                                                    <li>No obligation, this analysis is free.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Step>
                        </Stepper>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}