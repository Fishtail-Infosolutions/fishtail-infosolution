import multer from 'multer';
import path from 'path';
import fs from 'fs';

// We define a storage engine using Multer
// This is reusable for different sections (jobs, blogs, projects)
const storage = (folder: string) => multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
});

interface UploadOptions {
    folder?: string;
    maxSizeMB?: number;
    allowedTypes?: string[];
}

/**
 * Clean implementation for image uploads using Multer logic
 * Suitable for future use in blog and project sections.
 */
export async function uploadFile(
    file: File,
    options: UploadOptions = {}
): Promise<string> {
    const {
        folder = 'general',
        maxSizeMB = 5,
        allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml']
    } = options;

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
        throw new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
    }

    // Validate file size
    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
        throw new Error(`File size exceeds ${maxSizeMB}MB limit`);
    }

    // Use Multer-style unique filename generation
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const fileExtension = path.extname(file.name);
    const filename = `${folder}-${timestamp}-${randomString}${fileExtension}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filepath = path.join(uploadDir, filename);
    await fs.promises.writeFile(filepath, buffer);

    return `/uploads/${folder}/${filename}`;
}

/**
 * Delete a file from the public directory
 */
export async function deleteFile(filePath: string): Promise<void> {
    if (!filePath) return;

    const fullPath = path.join(process.cwd(), 'public', filePath);

    try {
        if (fs.existsSync(fullPath)) {
            await fs.promises.unlink(fullPath);
        }
    } catch (error) {
        console.error('Error deleting file:', error);
    }
}
