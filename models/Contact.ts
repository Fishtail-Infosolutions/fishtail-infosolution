import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    status: 'pending' | 'read' | 'replied' | 'archived';
    createdAt: Date;
    updatedAt: Date;
}

const ContactSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String },
    message: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'read', 'replied', 'archived'],
        default: 'pending'
    }
}, {
    timestamps: true
});

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
