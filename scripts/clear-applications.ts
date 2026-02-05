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

// Minimal Schema to target the collection
const ApplicationSchema = new mongoose.Schema({}, { strict: false });
const Application = mongoose.models.Application || mongoose.model('Application', ApplicationSchema, 'applications');

async function clearApplications() {
    try {
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected to MongoDB...');

        const count = await Application.countDocuments();
        console.log(`Current application count: ${count}`);

        if (count > 0) {
            const result = await Application.deleteMany({});
            console.log(`Successfully deleted ${result.deletedCount} applications.`);
        } else {
            console.log('No applications found to delete.');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error clearing applications:', error);
        process.exit(1);
    }
}

clearApplications();
