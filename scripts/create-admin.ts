
import mongoose from 'mongoose';
import User from '../models/User'; // Relative path might depend on execution context
import { hashPassword } from '../lib/auth';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

async function createSuperAdmin() {
    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log('Connected to database.');

        const email = 'admin@fishtail.com'; // Default super admin email
        const password = 'adminpassword123'; // Default super admin password - CHANGE THIS

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Super Admin already exists.');
            process.exit(0);
        }

        const hashedPassword = await hashPassword(password);

        const newAdmin = new User({
            email,
            password: hashedPassword,
            role: 'super-admin',
        });

        await newAdmin.save();
        console.log(`String created successfully.\nEmail: ${email}\nPassword: ${password}\n\nIMPORTANT: Change this password immediately after login!`);

    } catch (error) {
        console.error('Error creating super admin:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

createSuperAdmin();
