import mongoose from "mongoose";
import { Messages } from "openai/resources/chat/completions.js";

const MessageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },

  timeStanp: {
    type: Date,
    default: Date.now,
  },
});



const ThreadsSchema = new mongoose.Schema({
  threadId: {
    type: String,
    required: true,
    unique: true,
  },

  title: {
    type: String,
    default: "New Chat",
  },

  messages: [MessageSchema],

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Thread", ThreadsSchema);
