// models/Projects.js

import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ["screen", "upload", "slides"],
      default: "screen",
    },
    status: {
      type: String,
      enum: ["draft", "uploaded", "processing", "processed", "failed"], // ← FIXED
      default: "draft",
    },
    script: {
      type: String,
      default: "",
    },

    // Keep all the new fields from before
    filePath: { type: String },
    originalFileName: { type: String },
    fileType: { type: String, enum: ["video", "document"] },
    mimeType: { type: String },
    fileSize: { type: Number },
    duration: { type: Number },

    generatedVideoUrl: { type: String },
    generatedArticle: { type: String },
    voiceoverUrl: { type: String },
    thumbnailUrl: { type: String },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);