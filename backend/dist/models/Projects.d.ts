import mongoose, { Document } from "mongoose";
export interface IProject extends Document {
    title: string;
    description: string;
    skills: string[];
    link: string;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const ProjectModel: mongoose.Model<IProject, {}, {}, {}, mongoose.Document<unknown, {}, IProject, {}, {}> & IProject & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default ProjectModel;
//# sourceMappingURL=Projects.d.ts.map