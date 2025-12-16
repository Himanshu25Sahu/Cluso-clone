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
      enum: ["draft", "processed"],
      default: "draft",
    },
    script: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
