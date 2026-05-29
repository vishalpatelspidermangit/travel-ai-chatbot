/**
 * Atlas Travel Planner - Unified Express Server
 * Serves APIs and the static client frontend under a single portal.
 */

require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const { generateItinerary } = require("./generator");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, "data", "saved_itineraries.json");

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend assets from parent root folder
app.use(express.static(path.join(__dirname, "../")));

// Ensure database directory and file exist
function initializeDatabase() {
  const dataDir = path.join(__dirname, "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2), "utf8");
  }
}
initializeDatabase();

// Helper to read database safely
function readDatabase() {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading database:", err);
    return [];
  }
}

// Helper to write database safely
function writeDatabase(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Error writing database:", err);
    return false;
  }
}

// -------------------------------------------------------------
// API ENDPOINTS
// -------------------------------------------------------------

// 1. Generate customized cinematic itinerary
app.post("/api/itinerary/generate", (req, res) => {
  try {
    const { destination, duration, budgetTier, companion, vibe, memories } = req.body;
    
    if (!destination) {
      return res.status(400).json({ error: "Destination is required." });
    }
    
    const itinerary = generateItinerary({
      destination,
      duration: parseInt(duration) || 3,
      budgetTier: budgetTier || "comfort",
      companion: companion || "solo",
      vibe: vibe || "cafes",
      memories: memories || []
    });
    
    return res.json(itinerary);
  } catch (err) {
    console.error("Generation API error:", err);
    return res.status(500).json({ error: "Failed to compile itinerary." });
  }
});

// 2. Save curated itinerary to persistence
app.post("/api/itinerary/save", (req, res) => {
  try {
    const itinerary = req.body;
    
    if (!itinerary.name) {
      return res.status(400).json({ error: "Invalid itinerary payload." });
    }
    
    const db = readDatabase();
    
    // Assign a unique ID if it doesn't have one
    const id = itinerary.id || `journey-${Date.now()}`;
    
    // Check if it already exists (updating)
    const existingIndex = db.findIndex(item => item.id === id);
    
    const savedPayload = { ...itinerary, id };
    
    if (existingIndex > -1) {
      db[existingIndex] = savedPayload;
    } else {
      db.push(savedPayload);
    }
    
    if (writeDatabase(db)) {
      return res.json({ success: true, id });
    } else {
      return res.status(500).json({ error: "Failed to write database persistence." });
    }
  } catch (err) {
    console.error("Save API error:", err);
    return res.status(500).json({ error: "Failed to save itinerary." });
  }
});

// 3. List all saved itineraries (Summary metadata cards)
app.get("/api/itinerary/list", (req, res) => {
  try {
    const db = readDatabase();
    
    // Return summaries to conserve bandwidth
    const summaries = db.map(item => ({
      id: item.id,
      name: item.name,
      tagline: item.tagline,
      country: item.country,
      duration: item.duration,
      themeClass: item.themeClass,
      companion: item.companion,
      vibe: item.vibe
    }));
    
    return res.json(summaries);
  } catch (err) {
    console.error("List API error:", err);
    return res.status(500).json({ error: "Failed to load saved database." });
  }
});

// 4. Retrieve complete saved itinerary by ID
app.get("/api/itinerary/:id", (req, res) => {
  try {
    const id = req.params.id;
    const db = readDatabase();
    
    const itinerary = db.find(item => item.id === id);
    if (!itinerary) {
      return res.status(404).json({ error: "Itinerary not found." });
    }
    
    return res.json(itinerary);
  } catch (err) {
    console.error("Retrieve API error:", err);
    return res.status(500).json({ error: "Failed to load itinerary details." });
  }
});

// 5. Groq AI Contextual Travel Concierge Chatbot
const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history, itineraryContext, wantsDetail } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }
    
    // Check if the user query contains natural language requests for details
    const lowerMsg = message.toLowerCase();
    const naturalLanguageDetail = lowerMsg.includes("detail") || 
                                  lowerMsg.includes("explain") || 
                                  lowerMsg.includes("elaborate") || 
                                  lowerMsg.includes("describe") || 
                                  lowerMsg.includes("tell me more") || 
                                  lowerMsg.includes("long") ||
                                  lowerMsg.includes("comprehensive") ||
                                  lowerMsg.includes("full") ||
                                  lowerMsg.includes("sensory") ||
                                  lowerMsg.includes("expanded") ||
                                  lowerMsg.includes("more info");
    
    const isDetailed = wantsDetail || naturalLanguageDetail;
    const messages = [];
    
    let systemPrompt = `You are "Atlas" — an AI-powered immersive travel concierge.
Your job is to provide deeply personalized, atmospheric, and highly interesting travel advice.
Your tone is elegant, cinematic, emotionally intelligent, modern, and visually descriptive.
Avoid cheesy roleplay, fake fantasy, or robotic tourism text.
You sound like a premium travel magazine editor or a world-class filmmaker with taste.`;

    if (isDetailed) {
      systemPrompt += `\n\nUNLOCKED DETAILED MODE ACTIVE:
The user has requested details, elaboration, or a deeper explanation.
You MUST provide a rich, detailed, and highly elaborate sensory response (around 150 to 300 words).
Use beautiful headings (e.g., ### 🌸 Title) and blockquotes (e.g., > Quote text) to structure your response.
Be atmospheric, describe smells, sights, and feelings, while remaining realistic. Structure your response beautifully with bold formatting.`;
    } else {
      systemPrompt += `\n\nHYPER-CONCISE MODE ACTIVE (Default):
You MUST keep your response extremely short, direct, and punchy.
CRITICAL PHYSICAL LIMIT: Your entire answer must be strictly under 45 words (1 to 2 sentences max).
Never output lists, long introductions, or long-winded paragraphs.
Answer immediately and concisely. Under no circumstances should you exceed 45 words.
If the user wants more details, tell them they can ask you to "explain in detail" or toggle Detailed Mode.`;
    }

    if (itineraryContext) {
      systemPrompt += `\n\nCURRENT LOADED ITINERARY CONTEXT:
Destination: ${itineraryContext.name} (${itineraryContext.coordinates})
Tagline: ${itineraryContext.tagline}
Vibe: ${itineraryContext.vibe}
Duration: ${itineraryContext.duration} Days
Base Sanctuary (Hotel): ${itineraryContext.stay}
Base Vibe: ${itineraryContext.baseVibe}

Use these itinerary details to answer contextual questions (e.g. if the user asks about hotels, locations, cafés, day timelines, hidden gems, or local tips for their active trip!). Stay strictly faithful to this itinerary, but describe the atmosphere and options vividly.`;
    }

    systemPrompt += `\n\nSPECIAL SIGHTS, HOTELS & BUDGET CAPABILITY:
Whenever the user asks about nearby tourist places/attractions, nearby hotels, or estimated travel budgets for any city or destination (either their currently loaded itinerary or any new place they name):
1. **Nearby Attractions**: Suggest 3-4 highly captivating, off-beat or iconic tourist places/sights.
2. **Nearby Hotels/Stays**: Suggest 2-3 specific nearby hotels matching different explorer preferences (boutique comfort, luxury boutique, or budget voyager).
3. **Structured Budget Table**: Provide a clean breakdown of estimated daily costs (Lodging, Eats & Dinings, Sightseeing & Transits) inside a beautifully formatted Markdown Table.
If the chatbot is in HYPER-CONCISE mode, deliver a very brief, direct list containing 1 main attraction, 1 hotel recommendation, and a quick cost estimate (no table).
If UNLOCKED DETAILED MODE is active, generate a highly comprehensive, beautiful markdown table, specific hotel coordinates, and descriptive sensory details.`;
    
    messages.push({ role: "system", content: systemPrompt });
    
    if (history && Array.isArray(history)) {
      history.forEach(turn => {
        messages.push({ role: turn.role, content: turn.content });
      });
    }
    
    messages.push({ role: "user", content: message });
    
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: messages,
        temperature: 0.75,
        max_tokens: isDetailed ? 800 : 120
      })
    });
    
    if (!response.ok) {
      const errText = await response.text();
      console.error("Groq API error text:", errText);
      throw new Error(`Groq API responded with status ${response.status}`);
    }
    
    const result = await response.json();
    const reply = result.choices[0].message.content;
    
    return res.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return res.status(500).json({ error: "Failed to get response from travel concierge." });
  }
});

// Catch-all route to serve the SPA client for friendly client routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n=============================================================`);
  console.log(`  ATLAS TRAVEL PLANNER UNIFIED SERVER ACTIVE`);
  console.log(`  ➜ Local Portal: http://localhost:${PORT}/`);
  console.log(`=============================================================\n`);
});
