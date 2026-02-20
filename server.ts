import express from "express";
import { createServer as createViteServer } from "vite";
import multer from "multer";
import path from "path";
import fs from "fs";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Ensure directories exist
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
const DATA_DIR = path.join(process.cwd(), "data");
const PORTFOLIO_FILE = path.join(DATA_DIR, "portfolio.json");
const SITE_CONTENT_FILE = path.join(DATA_DIR, "site_content.json");

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial data if file doesn't exist
if (!fs.existsSync(PORTFOLIO_FILE)) {
  const initialData = [
    {
      id: "1",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL2bd5ONoJocQhUGCafULHLNRz_RWQhkPJRQ&s",
      link: "https://www.facebook.com/LCMobiliLionetto/photos/d41d8cd9/1352057459946831/",
      title: "Social Media Design"
    },
    {
      id: "2",
      image: "https://www.lcmobili.it/wp-content/uploads/2026/01/Grigio-Moderno-Divano-Annuncio-Post-Instagram.png",
      link: "https://www.lcmobili.it/",
      title: "Web & Ad Strategy"
    },
    {
      id: "3",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRr6rHt4i6eaMTTIEsJYtSZ47-nLipQovVnw&s",
      link: "https://www.facebook.com/LCMobiliLionetto/videos/",
      title: "Video Content"
    },
    {
      id: "4",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuG4rZn7_unHiNTqxd57MC_SMePfBZgHhjnw&s",
      link: "https://www.facebook.com/LCMobiliLionetto/videos/",
      title: "Creative Production"
    }
  ];
  fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(initialData, null, 2));
}

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// API Routes
app.get("/api/site-content", (req, res) => {
  try {
    if (!fs.existsSync(SITE_CONTENT_FILE)) {
      return res.status(404).json({ error: "Site content not found" });
    }
    const data = fs.readFileSync(SITE_CONTENT_FILE, "utf-8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: "Failed to read site content" });
  }
});

app.post("/api/site-content", (req, res) => {
  try {
    const { content, password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD || "federica2024";
    if (password !== adminPassword) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    fs.writeFileSync(SITE_CONTENT_FILE, JSON.stringify(content, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to save site content" });
  }
});

app.get("/api/portfolio", (req, res) => {
  try {
    const data = fs.readFileSync(PORTFOLIO_FILE, "utf-8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: "Failed to read portfolio data" });
  }
});

app.post("/api/portfolio", upload.single("image"), (req, res) => {
  try {
    const { title, link, password } = req.body;
    
    // Simple password check (should be in .env in real app)
    const adminPassword = process.env.ADMIN_PASSWORD || "federica2024";
    if (password !== adminPassword) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const data = JSON.parse(fs.readFileSync(PORTFOLIO_FILE, "utf-8"));
    const newItem = {
      id: Date.now().toString(),
      image: `/uploads/${req.file.filename}`,
      link: link || "#",
      title: title || "New Project",
    };

    data.push(newItem);
    fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(data, null, 2));
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to save portfolio item" });
  }
});

app.post("/api/profile-image", upload.single("image"), (req, res) => {
  try {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD || "federica2024";
    if (password !== adminPassword) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload profile image" });
  }
});

app.delete("/api/portfolio/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    
    console.log(`Tentativo di eliminazione progetto ID: ${id}`);

    const adminPassword = process.env.ADMIN_PASSWORD || "federica2024";
    if (password !== adminPassword) {
      console.log("Eliminazione fallita: Password errata");
      return res.status(401).json({ error: "Unauthorized" });
    }

    let data = JSON.parse(fs.readFileSync(PORTFOLIO_FILE, "utf-8"));
    const itemToDelete = data.find((item: any) => item.id === id);
    
    if (!itemToDelete) {
      console.log(`Progetto con ID ${id} non trovato`);
      return res.status(404).json({ error: "Item not found" });
    }

    // Elimina il file dell'immagine se è locale
    if (itemToDelete.image && itemToDelete.image.startsWith("/uploads/")) {
      const fileName = itemToDelete.image.replace("/uploads/", "");
      const filePath = path.join(UPLOADS_DIR, fileName);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
          console.log(`File eliminato: ${filePath}`);
        } catch (err) {
          console.error(`Errore durante l'eliminazione del file: ${err}`);
        }
      }
    }

    data = data.filter((item: any) => item.id !== id);
    fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(data, null, 2));
    console.log(`Progetto ID ${id} rimosso dal database`);
    res.json({ success: true });
  } catch (error) {
    console.error("Errore server durante l'eliminazione:", error);
    res.status(500).json({ error: "Failed to delete portfolio item" });
  }
});

app.post("/api/login", (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || "federica2024";
  
  if (password === adminPassword) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, error: "Password errata" });
  }
});

// Serve static files from public
app.use(express.static("public"));

// Vite middleware for development
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    // Don't use wildcard here if we want Vercel to handle routing
    // app.get("*", (req, res) => {
    //   res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    // });
  }

  // Only listen if not running as a serverless function
  if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

setupVite();

export default app;
