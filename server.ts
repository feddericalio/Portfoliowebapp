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

if (!fs.existsSync(SITE_CONTENT_FILE)) {
  const initialSiteContent = {
    "theme": {
      "fontSerif": "Playfair Display",
      "fontSans": "Plus Jakarta Sans",
      "primaryColor": "#0f172a",
      "backgroundColor": "#f8fafc",
      "textColor": "#334155",
      "accentColor": "#64748b",
      "profileImage": "https://media.licdn.com/dms/image/v2/D4D03AQEZDyn4O1WruQ/profile-displayphoto-scale_200_200/B4DZpa38mmJIAc-/0/1762461212551?e=2147483647&v=beta&t=QR9zHl5Ro2dDhtJv8ngO_aV38RtY5271i3UdB0TxtFk"
    },
    "hero": {
      "badge": "Comunicazione & Marketing Strategico",
      "name": "Federica Lionetto",
      "quote": "\"La comunicazione non è un dettaglio. È ciò che determina il risultato.\"",
      "aiText": "Non hai voglia di leggere tutti i miei dati? Chiedi alla mia assistente AI, che ho creato e addestrato per rispondere a tutte le tue domande su di me."
    },
    "about": {
      "title": "Comprendere le persone significa comprendere il mercato.",
      "p1": "Marketing e psicologia non sono strumenti separati, ma parti di uno stesso processo: analizzare, ascoltare, interpretare e costruire strategie che non siano solo efficaci, ma autentiche.",
      "p2": "Crescere in un'azienda familiare mi ha insegnato che i problemi non sono limiti, ma processi da comprendere. Oggi affronto ogni sfida con metodo, calma e una profonda propensione al problem solving rapido."
    },
    "experiences": [
      {
        "company": "LC Mobili",
        "role": "Gestione Comunicazione & Marketing",
        "period": "2019-2026",
        "description": "Responsabile della comunicazione integrata: gestione e aggiornamento del sito web, definizione di strategie marketing sui social media, creazione di contenuti grafici e video. Coordinamento di collaborazioni con radio e TV locali. Gestione del rapporto diretto con il cliente e sviluppo di problem solving rapido in contesti operativi."
      },
      {
        "company": "Yam Lab",
        "role": "Operativa & Relazione Clienti",
        "period": "2023-2024",
        "description": "Gestione del rapporto con il cliente e della comunicazione del brand. Creazione di contenuti accattivanti (grafiche, video e storie) studiati per attrarre nuovi clienti. Risultati tangibili: molti clienti have confermato di aver preso appuntamento proprio grazie alla qualità e all'efficacia dei contenuti social prodotti."
      },
      {
        "company": "Eventi & Hospitality",
        "role": "Hostess",
        "period": "2022-2026 contratto a chiamata",
        "description": "Coordinamento logistico e gestione degli imprevisti in contesti organizzativi di alto livello. Capacità di problem solving immediato e gestione dello stress."
      }
    ],
    "education": [
      {
        "institution": "Innovazione Digitale",
        "degree": "Corso AI & Copywriting",
        "period": "2026",
        "description": "Specializzazione nella gestione di intelligenze artificiali generative per la produzione di contenuti video, fotografici e testuali. Qualificata come tecnico IA con competenze avanzate in copywriting e scrittura creativa."
      },
      {
        "institution": "Università degli Studi di Milano",
        "degree": "Laurea in comunicazione e società",
        "period": "2021-2024",
        "description": "Focus su materie sociologiche, diritto, marketing, studio di radio e tv, per un approccio alla comunicazione a 360°. Esperienza Erasmus come pilastro di apertura mentale."
      },
      {
        "institution": "Specializzazione Digital",
        "degree": "Corso in Digital Marketing",
        "period": "2019",
        "description": "Apprendimento approfondito di SEO, SEM e tecniche di marketing strategico. Utilizzo di piattaforme come Canva per la realizzazione di grafiche professionali e padronanza dei principali pilastri del digital marketing."
      },
      {
        "institution": "Istituti Tecnici",
        "degree": "Diploma di Ragioneria",
        "period": "2014-2019",
        "description": "Solida base analitica in economia, diritto e lingue straniere."
      }
    ],
    "languages": [
      {
        "language": "Italiano",
        "level": "Madrelingua",
        "description": "Lingua principale utilizzata in ambito professionale e accademico."
      },
      {
        "language": "Spagnolo",
        "level": "Livello B2",
        "description": "Competenze consolidate e implementate grazie all'esperienza Erasmus vissuta in Spagna."
      },
      {
        "language": "Inglese",
        "level": "Livello B2",
        "description": "Ottima padronanza della lingua, sia parlata che scritta, utilizzata per studio e ricerca."
      }
    ],
    "skills": [
      { "name": "Comunicazione Strategica", "category": "professional" },
      { "name": "Psicologia dei Mercati", "category": "professional" },
      { "name": "Marketing Digitale", "category": "professional" },
      { "name": "Analisi Critica", "category": "professional" },
      { "name": "Creazione Contenuti (foto, video)", "category": "professional" },
      { "name": "Canva (per grafiche)", "category": "professional" },
      { "name": "Gestione siti Wordpress", "category": "professional" },
      { "name": "Creazione Campagne ADV su Meta", "category": "professional" },
      { "name": "Problem Solving", "category": "interpersonal" },
      { "name": "Team Leadership", "category": "interpersonal" },
      { "name": "Ascolto Attivo", "category": "interpersonal" },
      { "name": "Adattabilità", "category": "interpersonal" }
    ],
    "manifesto": {
      "title": "Manifesto Professionale",
      "p1": "Sono cresciuta all’interno di un’azienda familiare, un contesto che mette alla prova equilibrio e lucidità. Lì ho imparato a gestire crisi e a separare il piano personale da quello professionale.",
      "p2": "La svolta è arrivata con l’università e l’esperienza Erasmus: il confronto, il dibattito, l’ascolto. Ho capito che le idee migliori nascono quando si è disposti a mettersi in discussione e a uscire dalla propria zona di comfort.",
      "p3": "L'esperienza in Yam Lab ha consolidato la mia professionalità e adattabilità in ambienti creativi e dinamici. Le difficoltà non mi hanno frenata: mi hanno strutturata.",
      "p4": "Oggi cerco sfide che richiedano non solo competenza tecnica, ma una visione umana e strategica del business."
    }
  };
  fs.writeFileSync(SITE_CONTENT_FILE, JSON.stringify(initialSiteContent, null, 2));
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
  
  console.log("Login attempt received");
  
  if (password === adminPassword) {
    console.log("Login successful");
    res.json({ success: true });
  } else {
    console.log("Login failed: incorrect password");
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
