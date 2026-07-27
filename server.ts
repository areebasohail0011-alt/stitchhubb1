import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini API client
const aiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (aiKey) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: aiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI client:", err);
  }
}

// StitchHub System Prompt for Chatbot
const STITCHHUB_SYSTEM_INSTRUCTION = `You are Stitchy, the friendly and intelligent AI assistant for StitchHub — an AI-powered online tailoring platform connecting customers with professional tailors and couriers.

Your duty is to answer questions ONLY related to StitchHub and tailoring services.
Topics you can assist with:
1. Creating an account, profile setup, and user roles (Customer, Tailor, Courier, Admin).
2. Browsing tailors, checking tailor reviews, ratings, and portfolios.
3. How to place stitching or alteration orders on StitchHub.
4. Uploading body measurements (chest, waist, hips, inseam, shoulder, sleeve, neck) and saved measurement profiles.
5. Uploading reference design images or fabric photos.
6. Order tracking and status stages (Order Placed, Fabric Picked Up, Material Delivered, Cutting & Stitching, Quality Check, Out for Delivery, Delivered).
7. Doorstep fabric pickup and courier delivery process.
8. Payments, pricing tiers, commission, and earnings.
9. Tailoring guidance: choosing suitable fabrics (silk, cotton, linen, wool, chiffon, denim), understanding suit vs gown vs traditional dress cuts, fitting advice, alterations.
10. Frequently Asked Questions (FAQs) and navigating the StitchHub website.

IMPORTANT RULE:
If a user asks a question that is NOT related to StitchHub, tailoring, fabrics, measurements, fashion design, or platform usage (e.g. asking for general coding help, history, math, physics, politics, general advice), politely decline by saying:
"I am Stitchy, the StitchHub AI Assistant. I am specialized only in StitchHub tailoring services, order tracking, measurements, and custom garment guidance. How can I assist you with your tailoring needs today?"

Keep your answers warm, clear, professional, concise, and beautifully structured with bullet points or bold text where appropriate.`;

// API Route for AI Chatbot
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, prompt } = req.body;
    const userMessage = prompt || (Array.isArray(messages) && messages[messages.length - 1]?.content);

    if (!userMessage) {
      return res.status(400).json({ error: "Message prompt is required." });
    }

    if (!aiClient) {
      // Fallback response if GEMINI_API_KEY is not available
      return res.json({
        reply: getFallbackAnswer(userMessage),
        isFallback: true,
      });
    }

    // Format chat history for Gemini if messages array provided
    let contents: any[] = [];
    if (Array.isArray(messages) && messages.length > 0) {
      contents = messages.map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      }));
    } else {
      contents = [{ parts: [{ text: userMessage }] }];
    }

    const response = await aiClient.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contents,
      config: {
        systemInstruction: STITCHHUB_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I'm sorry, I couldn't generate a response. Please try again.";
    return res.json({ reply: replyText });
  } catch (error: any) {
    console.error("Gemini API error in /api/chat:", error);
    // Return friendly fallback answer
    const fallback = getFallbackAnswer(req.body.prompt || "help");
    return res.json({
      reply: `${fallback}\n\n*(Note: AI Chatbot is currently operating in smart offline mode)*`,
      isFallback: true,
    });
  }
});

function getFallbackAnswer(userQuery: string): string {
  const q = userQuery.toLowerCase();
  if (q.includes("measurement") || q.includes("size") || q.includes("fit")) {
    return "To upload or update your measurements on StitchHub:\n1. Go to **Customer Dashboard > Profile > Measurement Profiles**.\n2. Click **Add New Profile** (e.g. 'Formal Suit' or 'Casual Dress').\n3. Enter neck, chest, waist, hips, shoulder, sleeve length, and inseam.\n4. Save your profile to quickly select it whenever booking a tailor!";
  } else if (q.includes("order") || q.includes("book") || q.includes("place")) {
    return "Placing an order on StitchHub is simple:\n1. Navigate to **Browse Tailors** and choose an expert.\n2. Click **Book Tailor** on their profile.\n3. Choose your garment type (Suit, Dress, Traditional, Alteration).\n4. Select your saved measurement profile and attach reference design photos.\n5. Select courier pickup if you have fabric, or request tailor's fabric.\n6. Confirm address and complete payment!";
  } else if (q.includes("track") || q.includes("status") || q.includes("where")) {
    return "You can track your order live on StitchHub:\n1. Go to **My Orders** in your Customer Dashboard.\n2. Click **Track Order** on any active order.\n3. View real-time progress steps: *Order Placed -> Fabric Picked Up -> Material Delivered -> Cutting & Stitching -> Quality Inspection -> Out for Delivery -> Delivered*!";
  } else if (q.includes("courier") || q.includes("delivery") || q.includes("pickup")) {
    return "StitchHub partners with trusted local couriers. Once your order is confirmed, a courier picks up your fabric from your doorstep and delivers it directly to the tailor's studio. When stitching is done, the courier delivers your custom fitted garment right back to your door!";
  } else if (q.includes("tailor") || q.includes("choose") || q.includes("best")) {
    return "You can filter tailors on StitchHub by expertise (Suiting, Evening Gowns, Ethnic Wear, Casual, Alterations), minimum rating (4.5+), price tier, and estimated turnaround time. Read customer reviews and view past work in each tailor's portfolio before booking!";
  } else if (q.includes("account") || q.includes("register") || q.includes("login") || q.includes("role")) {
    return "StitchHub supports 4 roles: **Customer**, **Tailor**, **Courier**, and **Admin**. You can create a new account or log in via the Login page. Use the quick role switcher to test different views!";
  } else {
    return "I am Stitchy, your StitchHub AI Assistant! I can help you with:\n- Booking tailors and custom garment orders\n- Taking and saving body measurements\n- Tracking fabric pickup and doorstep delivery\n- Choosing fabrics and fitting options\n\nHow can I help you with your tailoring project today?";
  }
}

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`StitchHub Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
