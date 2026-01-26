import { NotFoundComponent } from "@/components/ui/not-found-component";

export default function BlogNotFound() {
    return (
        <NotFoundComponent
            message="Blog not found"
            linkText="Go to Blog"
            linkHref="/blog"
        />
    );
}
