import mongoose, { Schema, Document } from "mongoose";
const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true
    },
    link: {
        type: String,
        required: true
    },
}, { timestamps: true });
const ProjectModel = mongoose.model("Project", ProjectSchema);
export default ProjectModel;
//# sourceMappingURL=Projects.js.map