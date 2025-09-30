import mongoose, { Schema, Document } from "mongoose";

// Define the allowed types for an experience entry as a TypeScript type
export type ExperienceType = "Internship" | "Academic Project" | "Volunteer" | "Personal Project" | "Training";

// Define the structure of an Experience document
export interface IExperience extends Document {
  title: string;
  organization: string;
  type: ExperienceType;
  duration: string;
  description: string[];
  link?: string; // Link is optional
  createdAt?: Date;
  updatedAt?: Date;
}

// Create the Mongoose schema corresponding to the interface
const ExperienceSchema: Schema<IExperience> = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  organization: { 
    type: String, 
    required: true 
  },
  type: {
    type: String,
    // This enum enforces that the 'type' field must be one of these exact strings
    enum: ["Internship", "Academic Project", "Volunteer", "Personal Project", "Training"],
    required: true
  },
  duration: { 
    type: String, 
    required: true 
  },
  description: { 
    type: [String], 
    required: true 
  },
  link: { 
    type: String, 
    required: false 
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create and export the Mongoose model
const ExperienceModel = mongoose.model<IExperience>("Experience", ExperienceSchema);

export default ExperienceModel;

