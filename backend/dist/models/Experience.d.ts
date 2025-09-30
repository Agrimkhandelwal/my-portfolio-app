import mongoose, { Document } from "mongoose";
export type ExperienceType = "Internship" | "Academic Project" | "Volunteer" | "Personal Project" | "Training";
export interface IExperience extends Document {
    title: string;
    organization: string;
    type: ExperienceType;
    duration: string;
    description: string[];
    link?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const ExperienceModel: mongoose.Model<IExperience, {}, {}, {}, mongoose.Document<unknown, {}, IExperience, {}, {}> & IExperience & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default ExperienceModel;
//# sourceMappingURL=Experience.d.ts.map