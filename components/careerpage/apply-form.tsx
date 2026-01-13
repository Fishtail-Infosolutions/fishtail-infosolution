"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Stepper from "@/components/ui/Stepper"; // Default export
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "../ui/textarea";

// Actually, user mentioned "radio input type like none , o-1 yr..."
// I'll use standard HTML inputs styled if RadioGroup is not guaranteed, but I saw it in a previous turn... wait, I did NOT see radio-group in components/ui list.
// So I will use native inputs or check if I can make them look good. Or I will just use a simple select or standard radio inputs.
// User said: "step 2 the have work experience it will be the radio input type like none , o-1 yr ,1-2 year like that up to 5"

const schema = z.object({
    // Step 1
    fullName: z.string().min(1, "Full Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),

    // Step 2
    workExperience: z.enum(["None", "0-1 year", "1-2 years", "2-5 years", "5+ years"]),
    expectedSalary: z.string().optional(),
    portfolioLink: z.string().url("Invalid URL").optional().or(z.literal("")),
    githubLink: z.string().url("Invalid URL").optional().or(z.literal("")),
    cv: z.any().refine((files) => files?.length > 0, "CV is required"),
    coverLetter: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ApplyForm() {
    const {
        register,
        handleSubmit,
        trigger,
        control,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const [isSuccess, setIsSuccess] = useState(false);

    const onBeforeNext = async (step: number) => {
        if (step === 1) {
            const isValid = await trigger(["fullName", "email", "phone", "address"]);
            return isValid;
        }
        if (step === 2) {
            const isValid = await trigger(["workExperience", "cv", "expectedSalary", "portfolioLink", "githubLink", "coverLetter"]);
            return isValid;
        }
        return true;
    };

    const onSubmit = (data: FormData) => {
        console.log("Form Data:", data);
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center p-10 bg-zinc-900 border border-zinc-800 rounded-3xl text-center">
                <h3 className="text-2xl font-bold text-green-500 mb-2">Application Submitted!</h3>
                <p className="text-zinc-400">Thank you for applying. We will review your application and get back to you shortly.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
                >
                    Apply for another position
                </button>
            </div>
        );
    }

    return (
        <div className="" >
            <Stepper
                initialStep={1}
                onBeforeNext={onBeforeNext}
                onFinalStepCompleted={handleSubmit(onSubmit)}
                backButtonText="Previous"
                nextButtonText="Next Step"
                stepCircleContainerClassName="bg-black border-zinc-800"
                stepContainerClassName=" bg-black  "
                contentClassName=" m-9"
                footerClassName=" border-t border-zinc-800"
                className="justify-start h-auto min-h-0 aspect-auto"
            >
                {/* Step 1: Personal Information */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Personal Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-zinc-400">Full Name <span className="text-red-500">*</span></Label>
                            <Input
                                id="fullName"
                                placeholder="John Doe"
                                className="bg-zinc-900/50 border-zinc-700 focus:border-white text-white"
                                {...register("fullName")}
                            />
                            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-zinc-400">Email Address <span className="text-red-500">*</span></Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                className="bg-zinc-900/50 border-zinc-700 focus:border-white text-white"
                                {...register("email")}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-zinc-400">Phone Number <span className="text-red-500">*</span></Label>
                            <Input
                                id="phone"
                                placeholder="+1 (555) 000-0000"
                                className="bg-zinc-900/50 border-zinc-700 focus:border-white text-white"
                                {...register("phone")}
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address" className="text-zinc-400">Address <span className="text-red-500">*</span></Label>
                            <Input
                                id="address"
                                placeholder="City, Country"
                                className="bg-zinc-900/50 border-zinc-700 focus:border-white text-white"
                                {...register("address")}
                            />
                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message as string}</p>}
                        </div>
                    </div>
                </div>

                {/* Step 2: Professional Information */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Professional Details</h2>

                    {/* Work Experience */}
                    <div className="space-y-3">
                        <Label className="text-zinc-400">Work Experience <span className="text-red-500">*</span></Label>
                        <Controller
                            control={control}
                            name="workExperience"
                            render={({ field }) => (
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
                                >
                                    {["None", "0-1 year", "1-2 years", "2-5 years", "5+ years"].map((exp) => (
                                        <div key={exp} className="flex items-center space-x-2 p-3 rounded-lg border border-zinc-800 hover:bg-zinc-800/50 has-checked:border-white has-checked:bg-zinc-800 transition-colors">
                                            <RadioGroupItem value={exp} id={exp} className="border-zinc-600 text-white" />
                                            <Label htmlFor={exp} className="text-sm text-zinc-300 cursor-pointer w-full h-full flex items-center">{exp}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            )}
                        />
                        {errors.workExperience && <p className="text-red-500 text-xs mt-1">{errors.workExperience.message as string}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="expectedSalary" className="text-zinc-400">Expected Salary</Label>
                            <Input
                                id="expectedSalary"
                                placeholder="e.g. $50k - $70k"
                                className="bg-zinc-900/50 border-zinc-700 focus:border-white text-white"
                                {...register("expectedSalary")}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="portfolioLink" className="text-zinc-400">Portfolio Link</Label>
                            <Input
                                id="portfolioLink"
                                placeholder="https://..."
                                className="bg-zinc-900/50 border-zinc-700 focus:border-white text-white"
                                {...register("portfolioLink")}
                            />
                            {errors.portfolioLink && <p className="text-red-500 text-xs mt-1">{errors.portfolioLink.message as string}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="githubLink" className="text-zinc-400">GitHub Link</Label>
                            <Input
                                id="githubLink"
                                placeholder="https://github.com/..."
                                className="bg-zinc-900/50 border-zinc-700 focus:border-white text-white"
                                {...register("githubLink")}
                            />
                            {errors.githubLink && <p className="text-red-500 text-xs mt-1">{errors.githubLink.message as string}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cv" className="text-zinc-400">CV / Resume <span className="text-red-500">*</span></Label>
                            <Input
                                id="cv"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                className="bg-zinc-900/50 border-zinc-700 focus:border-white text-white file:text-white file:bg-zinc-800 file:border-0 file:rounded-md file:mr-4 file:px-4 file:py-1 cursor-pointer"
                                {...register("cv")}
                            />
                            {errors.cv && <p className="text-red-500 text-xs mt-1">{errors.cv.message as string}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="coverLetter" className="text-zinc-400">Cover Letter</Label>
                        <Textarea
                            id="coverLetter"
                            rows={4}
                            className="flex w-full rounded-md border border-zinc-700 bg-zinc-900/50 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Tell us why you're a great fit..."
                            {...register("coverLetter")}
                        />
                    </div>
                </div>
            </Stepper>
        </div>
    );
}
