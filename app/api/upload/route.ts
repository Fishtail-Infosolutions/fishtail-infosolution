import { NextResponse } from "next/server";
import { uploadFile } from "@/lib/upload";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file || !(file instanceof File)) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        const folder = formData.get('folder') as string || 'general';

        // Set allowed types based on folder
        let allowedTypes: string[] | undefined = undefined;
        if (folder === 'resumes') {
            allowedTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'image/jpeg',
                'image/png',
                'image/webp'
            ];
        }

        const filePath = await uploadFile(file, { folder, allowedTypes });

        return NextResponse.json({
            success: true,
            path: filePath
        });
    } catch (error: any) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: error.message || "Failed to upload file" },
            { status: 500 }
        );
    }
}
