import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

// Minimal Schema to target the User collection
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }
}, { strict: false });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function deleteAdmin() {
    try {
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected to MongoDB...');

        const emailToDelete = 'anotheradmin@gmail.com';
        const user = await User.findOne({ email: emailToDelete });

        if (!user) {
            console.log(`No user found with email: ${emailToDelete}`);
            process.exit(0);
        }

        await User.deleteOne({ email: emailToDelete });
        console.log(`Successfully deleted admin: ${emailToDelete}`);

        process.exit(0);
    } catch (error) {
        console.error('Error deleting admin:', error);
        process.exit(1);
    }
}

deleteAdmin();
