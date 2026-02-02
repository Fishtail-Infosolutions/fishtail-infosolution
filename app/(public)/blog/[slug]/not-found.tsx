import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BlogNotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4 pt-32 px-6">
            <h2 className="text-4xl font-bold">Article Not Found</h2>
            <p className="text-muted-foreground text-center">The blog post you're looking for doesn't exist or has been removed.</p>
            <Button asChild className="rounded-xl">
                <Link href="/blog">Back to Blog</Link>
            </Button>
        </div>
    );
}
