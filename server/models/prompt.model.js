const mongoose = require("mongoose");

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

module.exports = mongoose.model("Prompt", promptSchema);
