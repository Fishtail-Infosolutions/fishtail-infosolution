import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: false // May be null if applied to a static job or general application
    },
    jobTitle: {
        type: String,
        required: true // Fallback or snapshot of job title
    },
    fullName: {
        type: String,
        required: [true, 'Please provide full name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide email address'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    phone: {
        type: String,
        required: [true, 'Please provide phone number'],
    },
    address: {
        type: String,
        required: [true, 'Please provide address'],
    },
    workExperience: {
        type: String,
        enum: ["None", "0-1 year", "1-2 years", "2-5 years", "5+ years"],
        required: [true, 'Please select work experience'],
    },
    expectedSalary: {
        type: String,
        default: ''
    },
    portfolioLink: {
        type: String,
        default: ''
    },
    githubLink: {
        type: String,
        default: ''
    },
    cvUrl: {
        type: String,
        required: [true, 'Please upload CV'],
    },
    coverLetter: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'],
        default: 'pending'
    }
}, {
    timestamps: true
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
