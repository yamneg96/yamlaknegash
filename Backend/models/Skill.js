import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema({
  name: String,
  level: Number, // 1-100
});

export default mongoose.model("Skill", SkillSchema);
