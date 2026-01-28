'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/moving-border'; // User requested this specific button
import { Input } from '@/components/ui/input'; // Assuming this exists or I'll use standard input
import { Label } from '@/components/ui/label'; // Assuming this exists
import toast from 'react-hot-toast';
import { motion } from 'motion/react';
import { Eye, EyeOff } from 'lucide-react';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || 'Login failed');
            }

            toast.success('Logged in successfully');
            router.push('/admin/dashboard'); // Or wherever the admin home is
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        /* Forces the entire login block to behave as if it's in light mode */
        <div className="light min-h-screen w-full flex items-center justify-center bg-gray-50 text-gray-900 antialiased relative overflow-hidden">
            {/* Ambient background effect */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="z-10 w-full max-w-md p-4"
            >
                {/* The card is now explicitly white even in dark theme contexts */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl dark:bg-white dark:text-gray-900">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-900">
                            Admin Login
                        </h1>
                        <p className="text-gray-500 mt-2 text-sm dark:text-gray-500">
                            Enter your credentials to access the dashboard
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700 font-medium dark:text-gray-700">Email Address</Label>
                            <Input
                                {...register('email')}
                                type="email"
                                placeholder="admin@fishtail.com"
                                /* We force these classes to stay light even if the global system is dark */
                                className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 dark:bg-white dark:text-gray-900 dark:placeholder:text-gray-400 "
                                id="email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-700 font-medium dark:text-gray-700">Password</Label>
                            <div className="relative">
                                <Input
                                    {...register('password')}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 pr-12 dark:bg-white dark:text-gray-900 dark:placeholder:text-gray-400"
                                    id="password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-30"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="flex justify-center mt-8">
                            <Button
                                borderRadius="1.75rem"
                                className="bg-slate-900 text-white border-transparent font-semibold shadow-md"
                                containerClassName="h-12 w-full"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                                        <span>Verifying...</span>
                                    </div>
                                ) : "Access Dashboard"}
                            </Button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
