import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'super-admin'],
        default: 'admin',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
