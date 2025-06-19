import mongoose from "mongoose";

const promptSchema = new mongoose.Schema(
  {
    chatSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatSession",
    },
    userPrompt: String,
    aiResponse: String,
  },
  { timestamps: true }
);

const Prompt = mongoose.model("Prompt", promptSchema);
export default Prompt;
