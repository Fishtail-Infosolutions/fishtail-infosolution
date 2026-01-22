"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
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
    const router = useRouter();
    const [formKey, setFormKey] = React.useState(0);
    const {
        register,
        handleSubmit,
        trigger,
        control,
        reset,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

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
        toast.success("Application submitted successfully");
        reset();
        // Reset stepper to step 1 by changing key
        setFormKey(prev => prev + 1);
        // Redirect to career page after a short delay
        // setTimeout(() => {
        router.push("/career");
        // }, 4000);
    };

    return (
        <div className="" >
            <Stepper
                key={formKey}
                initialStep={1}
                onBeforeNext={onBeforeNext}
                onFinalStepCompleted={handleSubmit(onSubmit)}
                backButtonText="Previous"
                nextButtonText="Next Step"
                stepCircleContainerClassName="!bg-background !border-border"
                stepContainerClassName="!bg-background"
                contentClassName="m-9"
                footerClassName="border-t border-border"
                className="justify-start h-auto min-h-0 aspect-auto"
            >
                {/* Step 1: Personal Information */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-foreground mb-4">Personal Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-muted-foreground">Full Name <span className="text-red-500">*</span></Label>
                            <Input
                                id="fullName"
                                placeholder="John Doe"
                                className="bg-secondary"
                                {...register("fullName")}
                            />
                            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-muted-foreground">Email Address <span className="text-red-500">*</span></Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                className="bg-secondary"
                                {...register("email")}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-muted-foreground">Phone Number <span className="text-red-500">*</span></Label>
                            <Input
                                id="phone"
                                placeholder="+1 (555) 000-0000"
                                className="bg-secondary"
                                {...register("phone")}
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address" className="text-muted-foreground">Address <span className="text-red-500">*</span></Label>
                            <Input
                                id="address"
                                placeholder="City, Country"
                                className="bg-secondary"
                                {...register("address")}
                            />
                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message as string}</p>}
                        </div>
                    </div>
                </div>

                {/* Step 2: Professional Information */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-foreground mb-4">Professional Details</h2>

                    {/* Work Experience */}
                    <div className="space-y-3">
                        <Label className="text-muted-foreground">Work Experience <span className="text-red-500">*</span></Label>
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
                                        <div key={exp} className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-accent/50 has-checked:border-primary has-checked:bg-accent transition-colors">
                                            <RadioGroupItem value={exp} id={exp} className="border-border text-foreground" />
                                            <Label htmlFor={exp} className="text-sm text-foreground cursor-pointer w-full h-full flex items-center">{exp}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            )}
                        />
                        {errors.workExperience && <p className="text-red-500 text-xs mt-1">{errors.workExperience.message as string}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="expectedSalary" className="text-muted-foreground">Expected Salary</Label>
                            <Input
                                id="expectedSalary"
                                placeholder="e.g. $50k - $70k"
                                className="bg-secondary"
                                {...register("expectedSalary")}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="portfolioLink" className="text-muted-foreground">Portfolio Link</Label>
                            <Input
                                id="portfolioLink"
                                placeholder="https://..."
                                className="bg-secondary"
                                {...register("portfolioLink")}
                            />
                            {errors.portfolioLink && <p className="text-red-500 text-xs mt-1">{errors.portfolioLink.message as string}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="githubLink" className="text-muted-foreground">GitHub Link</Label>
                            <Input
                                id="githubLink"
                                placeholder="https://github.com/..."
                                className="bg-secondary"
                                {...register("githubLink")}
                            />
                            {errors.githubLink && <p className="text-red-500 text-xs mt-1">{errors.githubLink.message as string}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cv" className="text-muted-foreground">CV / Resume <span className="text-red-500">*</span></Label>
                            <Input
                                id="cv"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                className="cursor-pointer bg-secondary"
                                {...register("cv")}
                            />
                            {errors.cv && <p className="text-red-500 text-xs mt-1">{errors.cv.message as string}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="coverLetter" className="text-muted-foreground">Cover Letter</Label>
                        <Textarea
                            id="coverLetter"
                            rows={4}
                            placeholder="Tell us why you're a great fit..."
                            className="bg-secondary"
                            {...register("coverLetter")}
                        />
                    </div>
                </div>
            </Stepper>
        </div>
    );
}
