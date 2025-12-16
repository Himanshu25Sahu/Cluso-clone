import { Project } from "../models/Project.js";

/* Create Project */
export const createProject = async (req, res) => {
  try {
    const { title, description, type } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const project = await Project.create({
      user: req.user._id,
      title,
      description,
      type,
    });

    res.status(201).json({ project });
  } catch (error) {
    res.status(500).json({ message: "Failed to create project" });
  }
};

/* Get all projects for logged-in user */
export const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json({ projects });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

/* 🔥 Get single project (Editor page) */
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ project });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch project" });
  }
};

/* 🔥 Update project script/content */
export const updateProjectScript = async (req, res) => {
  try {
    const { script } = req.body;

    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { script },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ project });
  } catch (error) {
    res.status(500).json({ message: "Failed to update project" });
  }
};

/* 🔥 AI Insights (MOCK) */
export const generateProjectInsights = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Mock AI logic (INTENTIONALLY SIMPLE)
    const summary = project.script
      ? `This project focuses on ${project.title}. The content highlights key aspects of the product and explains its core functionality in a structured manner.`
      : `This project is in an early stage. Add content to generate meaningful AI insights.`;

    res.json({
      summary,
      suggestions: [
        "Improve onboarding explanation",
        "Add a short intro section",
        "Highlight key features visually",
      ],
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate insights" });
  }
};
