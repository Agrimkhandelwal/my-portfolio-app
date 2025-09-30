import mongoose, { Document } from 'mongoose';
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
declare const ProfileModel: mongoose.Model<IProfile, {}, {}, {}, mongoose.Document<unknown, {}, IProfile, {}, {}> & IProfile & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default ProfileModel;
//# sourceMappingURL=Profile.d.ts.map