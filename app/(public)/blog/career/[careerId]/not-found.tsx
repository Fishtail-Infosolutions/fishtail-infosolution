import { NotFoundComponent } from "@/components/ui/not-found-component";

export default function CareerNotFound() {
    return (
        <NotFoundComponent
            message="Job not found"
            linkText="Go to Career"
            linkHref="/career"
        />
    );
}
