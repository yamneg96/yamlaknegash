import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  techStack: [String],
  liveLink: String,
  githubLink: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Project", ProjectSchema);
