import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide blog title'],
        trim: true,
    },
    slug: {
        type: String,
        required: [true, 'Please provide slug'],
        unique: true,
        trim: true,
        lowercase: true
    },
    content: {
        type: String,
        required: [true, 'Please provide blog content'],
    },
    excerpt: {
        type: String,
        trim: true,
    },
    imageUrl: {
        type: String,
        required: [true, 'Please provide featured image'],
    },
    author: {
        type: String,
        default: 'Fishtail Admin'
    },
    tags: [{
        type: String,
        trim: true
    }],
    category: {
        type: String,
        default: 'Technology'
    },
    publishedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Force refresh the model in development to pick up schema changes
if (process.env.NODE_ENV === 'development' && mongoose.models.Blog) {
    delete (mongoose.models as any).Blog;
}

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
