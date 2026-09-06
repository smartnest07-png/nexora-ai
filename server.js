import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// Get current directory (ES Module compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(__dirname));

// Gemini API Key
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ GEMINI_API_KEY not found!");
  process.exit(1);
}

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: API_KEY
});

// Home route - serve website
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// AI Chat API
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    console.log("User:", message);

    const result = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: message
    });

    const reply =
      result.text ||
      "Sorry, I couldn't generate a response.";

    console.log("NEXORA:", reply);

    res.json({
      reply: reply
    });

  } catch (error) {
    console.error("❌ Gemini Error:", error);

    res.status(500).json({
      error: "AI response failed"
    });
  }
});

// Render automatically provides PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 NEXORA AI running on port ${PORT}`);
});