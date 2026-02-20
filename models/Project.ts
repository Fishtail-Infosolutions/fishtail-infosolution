import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide project title'],
        trim: true,
    },
    imageUrl: {
        type: String,
        required: [true, 'Please provide image URL'],
    },
    projectUrl: {
        type: String,
        required: [true, 'Please provide project link'],
    },
    category: {
        type: String,
        default: 'Development'
    },
    description: {
        type: String,
        default: ''
    },
    order: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
