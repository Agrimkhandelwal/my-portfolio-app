import mongoose, { Schema, Document } from "mongoose";

export interface ISkill extends Document {
  name: string;
  level: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const SkillSchema: Schema<ISkill> = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  level: {
    type: String,
    trim: true,
    required: true
  },
}, { timestamps: true });

const SkillModel = mongoose.model<ISkill>("Skill", SkillSchema);

export default SkillModel;