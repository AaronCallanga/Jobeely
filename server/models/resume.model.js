import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileName: {
        type: String,
        default: "Untitled File"
    },
    filteType: {
        type: String,
        required: true
    },
    extractedText: String,
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
// const resume = await Resume.findById(resumeId);
// const sessions = await ChatSession.find({ resume: resumeId });
// res.json({ resume, sessions });