import mongoose, { Document } from "mongoose";
export interface ISkill extends Document {
    name: string;
    level: string;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const SkillModel: mongoose.Model<ISkill, {}, {}, {}, mongoose.Document<unknown, {}, ISkill, {}, {}> & ISkill & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default SkillModel;
//# sourceMappingURL=Skills.d.ts.map