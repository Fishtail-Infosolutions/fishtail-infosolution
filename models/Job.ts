import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide job title'],
        trim: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobCategory',
        required: [true, 'Please provide job category'],
    },
    icon: {
        type: String,
        default: null,
    },
    type: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
        default: 'Full-time',
    },
    location: {
        type: String,
        default: 'Kathmandu, Nepal (Remote/On-site)',
    },
    description: {
        type: String,
        required: [true, 'Please provide job description'],
    },
    requirements: {
        type: [String],
        default: [],
    },
    responsibilities: {
        type: [String],
        default: [],
    },
    salary: {
        type: String,
    },
    openings: {
        type: Number,
        default: 1,
    },
    deadline: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

export default mongoose.models.Job || mongoose.model('Job', JobSchema);
