import mongoose, { Schema, Document } from 'mongoose';

interface ILinks {
    github: string;
    linkedin: string;
    portfolio: string;
}

export interface IProfile extends Document {
    name: string;
    email: string;
    education: string;
    links: ILinks;
    createdAt?: Date;
    updatedAt?: Date;
}

const ProfileSchema: Schema<IProfile> = new Schema({
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
const ProfileModel = mongoose.model<IProfile>("Profile", ProfileSchema);

export default ProfileModel;