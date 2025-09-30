import mongoose from "mongoose";
import dotenv from "dotenv";
import ProfileModel, { type IProfile } from "./models/Profile.js";
import ProjectModel, { type IProject } from "./models/Projects.js";
import SkillModel, { type ISkill } from "./models/Skills.js";
import ExperienceModel, { type IExperience } from "./models/Experience.js";
import connectDB from "./config/connectDb.js";

// Load environment variables
dotenv.config();

/**
 * A script to seed the database with initial data.
 * It clears existing data and inserts a predefined set of profiles, projects, and skills.
 */
const seedData = async (): Promise<void> => {
  try {
    // Establish database connection
    await connectDB();

    // Clear any existing data from the collections
    console.log("Clearing old data...");
    await ProfileModel.deleteMany({});
    await ProjectModel.deleteMany({});
    await SkillModel.deleteMany({});
    await ExperienceModel.deleteMany({});

    // --- Insert Profile Data ---
    console.log("Inserting profile...");
    await ProfileModel.create({
      name: "Agrim Khandelwal",
      email: "agrimkhandelwal11@gmail.com",
      education: "B.Tech in Computer Science (2022 - 2026)",
      links: {
        github: "https://github.com/agrimkhandelwal",
        linkedin: "https://www.linkedin.com/in/agrim-khandelwal-95662527a/",
        portfolio: "https://portfolio-git-main-agrims-projects-fd95ab4c.vercel.app/",
      },
    });

    // --- Insert Project Data ---
    const projectsToSeed: Partial<IProject>[] = [
      {
        title: "Portfolio API & Frontend",
        description: "The very project you are looking at! A full-stack portfolio site built with Next.js and Express.",
        skills: ["React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB"],
        link: "#",
      },
      {
        title: "Memory Game",
        description: "This is a card game where I use React hooks to make it Optimize.",
        skills: ["React", "Tailwind css "],
        link: "https://onepiece-memory-game-nine.vercel.app/",
      },
      {
        title: "Portfolio Website",
        description: "A fully deployed, interactive portfolio website built with a modern tech stack. It features a custom API to serve data from a MongoDB database to a responsive Next.js frontend.",
        skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
        link: "https://portfolio-git-main-agrims-projects-fd95ab4c.vercel.app/",
      },
    ];
    console.log(`Inserting ${projectsToSeed.length} project(s)...`);
    await ProjectModel.insertMany(projectsToSeed);

    // --- Insert Skill Data ---
    const skillsToSeed: Partial<ISkill>[] = [
      { name: "JavaScript", level: "Intermediate" },
      { name: "TypeScript", level: "Intermediate" },
      { name: "React", level: "Intermediate" },
      { name: "Next.js", level: "Beginner" },
      { name: "Node.js", level: "Beginner" },
      { name: "MongoDB", level: "Beginner" },
      { name: "Tailwind CSS", level: "Intermediate" },
      { name: "Express.js", level: "Intermediate" },
      { name: "C++", level: "Advance" },
      { name: "DSA", level: "Intermediate" },
    ];
    console.log(`Inserting ${skillsToSeed.length} skill(s)...`);
    await SkillModel.insertMany(skillsToSeed);
    
    // --- Insert Experience Data ---
    const experiencesToSeed: Partial<IExperience>[] = [
      {
        title: "Full-Stack Portfolio Website",
        organization: "Personal Project",
        type: "Personal Project",
        duration: "September 2025",
        description: [
          "Developed a RESTful API with Node.js, Express, and TypeScript.",
          "Built a responsive frontend with Next.js and Tailwind CSS.",
          "Designed and implemented a MongoDB schema for storing portfolio data."
        ],
      },
      {
        title: "Cohort 3.0 (WebDev, DevOps & Web3)",
        organization: "100xDevs (Harkirat Singh)",
        type: "Training",
        duration: "August 2022 to Till now",
        description: [
          "Participated in an intensive, full-stack development cohort covering modern web technologies.",
          "Gained hands-on experience in DevOps practices, including CI/CD pipelines and containerization.",
          "Explored Web3 concepts, including blockchain fundamentals and decentralized applications.",
        ]
      },
      {
        title: "MERN Stack Development",
        organization: "Upflair Pvt Ltd",
        type: 'Training',
        duration: "Summer 2025",
        description: [
          "Completed an intensive training course on the MERN stack.",
          "Learned advanced concepts in React, Node.js, and MongoDB."
        ]
      }
    ];
    console.log(`Inserting ${experiencesToSeed.length} experience(s)...`);
    await ExperienceModel.insertMany(experiencesToSeed);


    console.log("✅ Seeding completed successfully!");
    process.exit(0); // Exit with a success code
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1); // Exit with a failure code
  }
};

// Execute the seeding script
seedData();

