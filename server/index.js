console.log("🔥 THIS INDEX.JS FILE IS RUNNING 🔥");


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/ping", (req, res) => {
  console.log("✅ PING HIT");
  res.send("PONG");
});


app.post("/api/recommend", async (req, res) => {
  console.log("👉 /api/recommend HIT");
  console.log("👉 BODY:", req.body);

  const { background, goal, experience } = req.body;

  if (!background || !goal || !experience) {
    return res.status(400).json({
      error: "Missing required fields",
    });
  }

  try {
    const completion = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `You are an AI career advisor for Iron Lady.

User background: ${background}
Career goal: ${goal}
Experience level: ${experience}

Recommend the most suitable Iron Lady program and clearly explain the learning journey.`,
    });

    res.json({
      reply: completion.output_text,
    });
  } catch (error) {
    console.error("❌ OPENAI ERROR:", error.message);

    // Fallback demo-safe response
    res.json({
  reply:
    "Based on your profile, Iron Lady recommends a structured upskilling program with mentorship and guided projects to help you confidently move toward your career goal.",
});
}
});



const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
