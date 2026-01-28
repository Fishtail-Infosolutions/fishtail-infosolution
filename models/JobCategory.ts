import mongoose from 'mongoose';

const JobCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide category name'],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for jobs in this category
JobCategorySchema.virtual('jobs', {
    ref: 'Job',
    localField: '_id',
    foreignField: 'category'
});

export default mongoose.models.JobCategory || mongoose.model('JobCategory', JobCategorySchema);
