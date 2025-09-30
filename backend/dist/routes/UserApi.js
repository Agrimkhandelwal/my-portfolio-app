import { Router } from "express";
import ProfileModel, {} from "../models/Profile.js";
import SkillModel, {} from "../models/Skills.js";
import ProjectModel, {} from "../models/Projects.js";
import ExperienceModel, {} from "../models/Experience.js";
const router = Router();
// --- Profile Routes ---
router.get("/profile", async (req, res) => {
    try {
        const profile = await ProfileModel.findOne();
        res.json(profile);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching profile" });
    }
});
router.put("/profile", async (req, res) => {
    try {
        const updatedProfile = await ProfileModel.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(updatedProfile);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating profile" });
    }
});
// --- Project Routes ---
router.get("/projects", async (req, res) => {
    try {
        const { skill } = req.query;
        const filter = skill ? { skills: skill } : {};
        const projects = await ProjectModel.find(filter);
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching projects" });
    }
});
router.post("/projects", async (req, res) => {
    try {
        const newProject = new ProjectModel(req.body);
        await newProject.save();
        res.status(201).json(newProject);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating project" });
    }
});
router.put("/projects/:id", async (req, res) => {
    try {
        const updatedProject = await ProjectModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProject)
            return res.status(404).json({ message: "Project not found" });
        res.json(updatedProject);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating project" });
    }
});
router.delete("/projects/:id", async (req, res) => {
    try {
        const deleted = await ProjectModel.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ message: "Project not found" });
        res.json({ message: "Project deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting project" });
    }
});
// --- Skill Routes ---
router.get("/skills", async (req, res) => {
    try {
        const skills = await SkillModel.find();
        res.json(skills);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching skills" });
    }
});
router.get("/skills/top", async (req, res) => {
    try {
        const skills = await SkillModel.find().limit(3);
        res.json(skills);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching top skills" });
    }
});
router.post("/skills", async (req, res) => {
    try {
        const newSkill = new SkillModel(req.body);
        await newSkill.save();
        res.status(201).json(newSkill);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating skill" });
    }
});
router.put("/skills/:id", async (req, res) => {
    try {
        const updatedSkill = await SkillModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSkill)
            return res.status(404).json({ message: "Skill not found" });
        res.json(updatedSkill);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating skill" });
    }
});
router.delete("/skills/:id", async (req, res) => {
    try {
        const deleted = await SkillModel.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ message: "Skill not found" });
        res.json({ message: "Skill deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting skill" });
    }
});
// --- Experience Routes (Corrected to be plural) ---
router.get("/experiences", async (req, res) => {
    try {
        const experiences = await ExperienceModel.find().sort({ createdAt: -1 });
        res.json(experiences);
    }
    catch (error) {
        console.error("Error fetching experiences:", error); // Added a server log for better debugging
        res.status(500).json({ message: "Error fetching experiences" });
    }
});
router.post("/experiences", async (req, res) => {
    try {
        const newExperience = new ExperienceModel(req.body);
        await newExperience.save();
        res.status(201).json(newExperience);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating experience" });
    }
});
router.put("/experiences/:id", async (req, res) => {
    try {
        const updatedExperience = await ExperienceModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedExperience)
            return res.status(404).json({ message: "Experience not found" });
        res.json(updatedExperience);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating experience" });
    }
});
router.delete("/experiences/:id", async (req, res) => {
    try {
        const deleted = await ExperienceModel.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ message: "Experience not found" });
        res.json({ message: "Experience deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting experience" });
    }
});
// --- General Search Route ---
router.get("/search", async (req, res) => {
    try {
        const { q } = req.query;
        if (!q || typeof q !== 'string') {
            return res.status(400).json({ message: "Search query 'q' is required." });
        }
        const searchRegex = new RegExp(q, 'i');
        const [projects, skills, experiences] = await Promise.all([
            ProjectModel.find({ $or: [{ title: searchRegex }, { description: searchRegex }] }),
            SkillModel.find({ name: searchRegex }),
            ExperienceModel.find({ $or: [{ title: searchRegex }, { organization: searchRegex }] })
        ]);
        res.json({ projects, skills, experiences });
    }
    catch (error) {
        res.status(500).json({ message: "Error performing search" });
    }
});
export default router;
//# sourceMappingURL=UserApi.js.map