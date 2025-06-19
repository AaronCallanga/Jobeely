import mongoose from "mongoose";

const chatSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },
    prompts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prompt",
      },
    ],
    title: {
      type: String,
      default: "Untitled",
    },
  },
  { timestamps: true }
);

const ChatSession = mongoose.model("ChatSession", chatSessionSchema);
export default ChatSession;