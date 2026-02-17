import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path: pathSegments } = await params;
        const relativePath = pathSegments.join("/");
        const filePath = path.join(process.cwd(), "public", "uploads", relativePath);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return new NextResponse("File Not Found", { status: 404 });
        }

        // Get file stats
        const stats = fs.statSync(filePath);
        if (!stats.isFile()) {
            return new NextResponse("Not a File", { status: 404 });
        }

        // Read file
        const fileBuffer = fs.readFileSync(filePath);

        // Determine content type
        const ext = path.extname(filePath).toLowerCase();
        const contentTypeMap: { [key: string]: string } = {
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
            ".gif": "image/gif",
            ".webp": "image/webp",
            ".svg": "image/svg+xml",
            ".pdf": "application/pdf",
            ".jfif": "image/jpeg",
            ".avif": "image/avif"
        };

        const contentType = contentTypeMap[ext] || "application/octet-stream";

        // Return the file
        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": contentType,
                "Content-Length": stats.size.toString(),
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        console.error("Error serving upload:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
