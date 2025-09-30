import mongoose, { Schema, Document } from "mongoose";
const SkillSchema = new mongoose.Schema({
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
const SkillModel = mongoose.model("Skill", SkillSchema);
export default SkillModel;
//# sourceMappingURL=Skills.js.map