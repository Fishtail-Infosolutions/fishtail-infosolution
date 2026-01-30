import mongoose from 'mongoose';

const TeamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide team member name'],
        trim: true,
    },
    role: {
        type: String,
        required: [true, 'Please provide team member role'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide team member description'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Please provide team member image'],
    },
    socials: [{
        platform: {
            type: String,
            enum: ['LinkedIn', 'Twitter', 'Facebook', 'GitHub', 'Instagram', 'Website'],
        },
        url: {
            type: String,
        },
    }],
    order: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

export default mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);
