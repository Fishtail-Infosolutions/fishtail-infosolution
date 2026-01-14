"use client";
import React from "react";
import { motion } from "motion/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { IconMail, IconPhone, IconMapPin } from "@tabler/icons-react";
import { cn } from "@/lib/utils"; // Importing GradientBanner
import { DotPattern } from "@/components/ui/dot-pattern"; // DotPattern component
import GradientBanner from "./self-made-ui/gradeint-banner";
import { Socials } from "@/constants";
import { Globe } from "lucide-react";

// Validation schema with Zod
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  message: z.string().min(1, "Message is required"),
  subject: z.string().min(1, "Subject is required"), // New field
});

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject: string; // New field
}

const ContactUs = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      subject: "", // Default value for the new field
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form submitted", data);
  };

  return (
    <div className="relative overflow-hidden h-full mt-40 bg-background text-foreground flex flex-col md:px-40 px-4 transition-colors duration-500">
      {/* Gradient Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center gap-2"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GradientBanner text="Contact Us" />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl font-semibold mb-4 text-center"
        >
          Get in Touch
        </motion.h3>
      </motion.div>


      <div className="relative p-8 sm:px-20  z-10 flex flex-col lg:flex-row md:gap-9 gap-5 justify- items-start">
        {/* Left Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:w-1/3 p-6 border border-border rounded-xl relative overflow-hidden"
        >
          <div className="space-y-8">
            {/* Contact Email */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2">
                <IconMail className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-semibold bg-gradient-to-br from-[#70C1FF] to-[#005CAD] dark:from-[#ABDCFF] dark:to-[#0396FF] bg-clip-text text-transparent">Email</h3>
              </div>
              <a href="mailto:info@fishtailinfosolutions.com/" target="_blank" rel="noopener noreferrer">
                <p className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">info@fishtailinfosolutions.com</p>
              </a>
            </div>

            {/* Contact Phone */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2">
                <IconPhone className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-semibold bg-gradient-to-br from-[#70C1FF] to-[#005CAD] dark:from-[#ABDCFF] dark:to-[#0396FF] bg-clip-text text-transparent">Phone number</h3>
              </div>
              <p className="text-muted-foreground">+977 9806673560</p>
            </div>

            {/* Contact Location */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2">
                <IconMapPin className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-semibold bg-gradient-to-br from-[#70C1FF] to-[#005CAD] dark:from-[#ABDCFF] dark:to-[#0396FF] bg-clip-text text-transparent">Location</h3>
              </div>
              <a href='https://www.google.com/maps/place/Fishtail+Infosolutions/@28.2211603,83.9819452,691m/data=!3m1!1e3!4m7!3m6!1s0xaf8712d0425aa3e7:0x528c4e6c8c86ffbf!4b1!8m2!3d28.2207887!4d83.9840869!16s%2Fg%2F11yq1r478s?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D' target="_blank" rel="noopener noreferrer">
                <p className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Pokhara-8, Bagaletol</p>
              </a>

            </div>

            <div className="space-y-2">

              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-semibold bg-gradient-to-br from-[#70C1FF] to-[#005CAD] dark:from-[#ABDCFF] dark:to-[#0396FF] bg-clip-text text-transparent">Social Media</h3>
              </div>
              <div className="flex justify-start gap-6">
                {Socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 min-w-[3rem] rounded-full flex items-center justify-center transition-all duration-300 group hover:bg-white dark:bg-transparent shadow-none hover:shadow-lg "
                  >
                    <social.icon
                      className={cn(
                        "w-6 h-6 text-foreground/60 dark:text-white transition-colors duration-300",
                        social.groupHoverColor,
                        social.darkGroupHoverColor
                      )}
                    />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

        {/* Right Card (Form) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full lg:w-2/3 p-6 border border-border space-y-6 rounded-lg mt-8 md:mt-0 relative"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">


              {/* Name and Phone Fields */}
              <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                <LabelInputContainer>
                  <FormField
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="name">Name <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input id="name" placeholder="Your Name" className="bg-secondary" {...field} />
                        </FormControl>
                        <FormMessage>{form.formState.errors.name?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                </LabelInputContainer>

                <LabelInputContainer>
                  <FormField
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="phone">Phone</FormLabel>
                        <FormControl>
                          <Input id="phone" placeholder="Your Phone" className="bg-secondary" {...field} />
                        </FormControl>
                        <FormMessage>{form.formState.errors.phone?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                </LabelInputContainer>
              </div>

              {/* Subject Field */}
              <LabelInputContainer>
                <FormField
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="subject">Subject</FormLabel>
                      <FormControl>
                        <Input id="subject" placeholder="Subject" className="bg-secondary" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.subject?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </LabelInputContainer>

              {/* Email Field */}
              <LabelInputContainer>
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input id="email" placeholder="Your Email" className="bg-secondary" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </LabelInputContainer>

              {/* Message Field */}
              <LabelInputContainer>
                <FormField
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="message">Message <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Textarea id="message" placeholder="Your Message" className="bg-secondary" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.message?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </LabelInputContainer>

              {/* Submit Button */}
              <Button type="submit" variant="secondary" className="group/btn relative block h-10 w-fit px-8 rounded-md dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 font-medium text-foreground dark:text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]">
                Submit
                <BottomGradient />
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </div >
  );
};

// Bottom gradient effect for buttons
const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

// LabelInputContainer component for wrapping each field and its label
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default ContactUs;
