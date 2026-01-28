import express from "express";
const router = express.Router();

import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";
//test
router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId:"zxczxcvjhjhjhg",
      title: "nrtgervvvjhvtjhghthg",
    });

    const response = await thread.save();
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "failed to save thread" });
  }
});

// get all threads
router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 }); //descending order of updatedat  most recent data on top

    res.json(threads);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "failed to fetch threads " });
  }
});

router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const thread = await Thread.findOne({ threadId });
    if (!thread) {
      res.status(404).json({ err: "Thread not found" });
    }

    res.json(thread.messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "failed to fetch threads " });
  }
});

router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const deletedThread = await Thread.findOneAndDelete({ threadId });

    if (!deletedThread) {
      res.status(404).json({ err: "Thread not found" });
    }

    res.status(200).json({ success: "Thread deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "failed to fetch threads " });
  }
});

router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    res.status(404).json({ error: "missing required fields" });
  }

  try {
    let thread = await Thread.findOne({ threadId });
    if (!thread) {
      //create new thread

      thread = new Thread({
        threadId,
        title: message,
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }

    const assistantReply = await getOpenAIAPIResponse(message);

    thread.messages.push({ role: "assistant", content: assistantReply });
    thread.updatedAt = new Date();

    await thread.save();
    res.json({ reply: assistantReply });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Something went wrong  " });
  }
});

export default router;
