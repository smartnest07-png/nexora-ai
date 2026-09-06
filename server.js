import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ GEMINI_API_KEY not found in .env file");
  process.exit(1);
}

const ai = new GoogleGenAI({
  apiKey: API_KEY
});

app.get("/", (req, res) => {
  res.send("NEXORA AI Server is running! 🤖");
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    console.log("User:", message);

    const result = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: message
    });

    const reply = result.text;

    console.log("NEXORA:", reply);

    res.json({
      reply
    });

  } catch (error) {
    console.error("❌ Gemini Error:", error);

    res.status(500).json({
      error: "AI response failed",
      details: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 NEXORA AI running at http://localhost:${PORT}`);
});