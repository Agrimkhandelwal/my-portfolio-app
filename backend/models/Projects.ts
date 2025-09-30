import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  skills: string[];
  link: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectSchema: Schema<IProject> = new mongoose.Schema({
  title:{
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  skills:{
    type: [String],
    required: true,
    index: true 
  },
  link: {
    type: String,
    required: true
  },
}, { timestamps: true });

const ProjectModel = mongoose.model<IProject>("Project", ProjectSchema);

export default ProjectModel;
