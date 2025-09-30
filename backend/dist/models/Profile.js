import mongoose, { Schema, Document } from 'mongoose';
const ProfileSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    education: {
        type: String,
        required: true
    },
    links: {
        github: {
            type: String,
            required: true
        },
        linkedin: {
            type: String,
            required: true
        },
        portfolio: {
            type: String,
            required: true
        },
    },
}, { timestamps: true });
const ProfileModel = mongoose.model("Profile", ProfileSchema);
export default ProfileModel;
//# sourceMappingURL=Profile.js.map