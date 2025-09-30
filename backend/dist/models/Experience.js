import mongoose, { Schema, Document } from "mongoose";
// Create the Mongoose schema corresponding to the interface
const ExperienceSchema = new Schema({
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
const ExperienceModel = mongoose.model("Experience", ExperienceSchema);
export default ExperienceModel;
//# sourceMappingURL=Experience.js.map