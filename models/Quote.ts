import mongoose, { Schema, Document } from 'mongoose';

export interface IQuote extends Document {
    websiteUrl: string;
    seoGoals?: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    status: 'pending' | 'reviewed' | 'responded' | 'completed';
    createdAt: Date;
    updatedAt: Date;
}

const QuoteSchema: Schema = new Schema({
    websiteUrl: { type: String, required: true },
    seoGoals: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    company: { type: String },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'responded', 'completed'],
        default: 'pending'
    }
}, {
    timestamps: true
});

export default mongoose.models.Quote || mongoose.model<IQuote>('Quote', QuoteSchema);
