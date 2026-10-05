# 🧠 Muhammad Mohsin Zafar - AI Engineer Portfolio

A cutting-edge, high-performance personal portfolio website for **Muhammad Mohsin Zafar**, Full Stack AI Engineer, Computer Vision Researcher, and Python Developer.

Designed according to 2026 industry standards for AI Engineers: featuring **interactive medical CAD simulators**, **deep-dive case study modals**, **a digital twin AI assistant**, and **zero-config Vercel deployment readiness**.

---

## 🌟 Key Features

1. **Production-Ready Visual Design**:
   - Modern Glassmorphism on obsidian-slate dark theme with electric cyan and purple neon highlights.
   - Dynamic interactive **Neural Network Canvas** responding to mouse movements and connections.
   - 100% responsive across desktop, tablet, and mobile devices.
   - Dark Mode / Light Mode theme toggle with `localStorage` persistence.

2. **Interactive Live AI Sandbox (WOW Factor)**:
   - **GastroCAD Medical CAD Simulator**: Select diagnostic cases (Gastric Neoplasm, Erosive Gastritis, Normal Mucosa) and run live simulated Transformer CAD inference with latency analysis (42ms) and confidence scoring.
   - **NeuralVision CV Multi-Stream**: Real-time telemetry showcase for ALPR (License Plate OCR), 68-point facial landmark mesh, bone fracture X-ray, and eye gaze tracking.
   - **Mohsin's Digital Twin (AI Chatbot)**: Interactive chat assistant trained on Mohsin's verified CV to answer recruiter questions about skills, thesis, degree, and work history.
   - **Interactive CLI Terminal**: Terminal simulator with commands like `skills`, `projects`, `exp`, `edu`, `contact`, `hire`, and `whoami`.

3. **In-Depth Project Case Studies**:
   - Every project features a "One-Page Case Study" breakdown (The Problem, Deliverable Scope, Architecture & Pipeline, Hurdles Overcome, and Quantifiable Evaluation).
   - Filter projects seamlessly: `All`, `AI & Computer Vision`, `Full-Stack & Web`, `Systems & Hardware`.

4. **Direct Recruitment CTAs**:
   - One-click CV download button pointing directly to `Mohsin_Zafar_Resume.pdf`.
   - Instant copy-to-clipboard for Email (`mohsinz35425@gmail.com`) and Phone (`+92 331 9981044`) with toast notifications.
   - Direct WhatsApp message button with pre-filled greeting.
   - Working contact message form.

---

## 🚀 How to Deploy to Vercel (How to make it Live)

Aap is portfolio ko **Vercel** par 2 aasan tareeqon se live kar sakte hain:

### Tareeqa 1: GitHub ke zariye (Recommended & Automatic)

1. **Git Repository Banayein**:
   Apne computer par is folder mein terminal open karein aur ye commands chalayein:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Muhammad Mohsin Zafar Portfolio"
   ```
2. **GitHub par Push karein**:
   - [github.com](https://github.com) par ja kar aik new repository banayein (e.g. `mohsin-portfolio`).
   - Terminal mein commands run karein:
     ```bash
     git remote add origin https://github.com/<YOUR_USERNAME>/mohsin-portfolio.git
     git branch -M main
     git push -u origin main
     ```
3. **Vercel par Import karein**:
   - [vercel.com](https://vercel.com) par login/signup karein.
   - **"Add New Project"** par click karein.
   - Apni GitHub repository `mohsin-portfolio` select karein.
   - Framework preset ko **"Other"** rehne dein (yeh static website hai).
   - **Deploy** button daba dein!
   - 10 seconds mein aapki website live ho jayegi (e.g., `mohsin-portfolio.vercel.app`).

---

### Tareeqa 2: Vercel CLI ke zariye (Direct from Terminal)

Aap direct terminal se bhi baghair GitHub ke deploy kar sakte hain:

1. Terminal mein ye command run karein:
   ```bash
   npx vercel
   ```
2. Terminal aapse login poochega (GitHub/Email).
3. Set up and deploy? -> `Y` press karein.
4. Scope select karein aur enter press karte jayein.
5. Sirf 1 minute mein aapka live link generation ho jayega! Production deployment ke liye run karein:
   ```bash
   npx vercel --prod
   ```

---

## 📁 File Structure

```
Portfolio/
├── index.html                   # Core semantic HTML5 structure & SEO tags
├── style.css                    # Modern CSS design system (Dark/Light + Glassmorphism)
├── app.js                       # Neural canvas, AI simulator, Chatbot, Terminal & logic
├── vercel.json                  # Performance caching & security headers for Vercel
├── Mohsin_Zafar_Resume.pdf      # Clean downloadable CV for recruiters
├── assets/
│   └── images/
│       ├── mohsin_avatar.jpg    # 3D Tech Avatar
│       ├── gastrocad.jpg        # GastroCAD medical diagnostic UI mockup
│       ├── cv_suite.jpg         # Computer vision multi-stream UI mockup
│       ├── fullstack_app.jpg    # Full-stack Flask SaaS dashboard mockup
│       └── smarthome.jpg        # Voice-controlled smart home IoT interface
└── README.md                    # Documentation & deployment guide
```

---

## 👤 Profile Details & Contact

- **Full Name**: Muhammad Mohsin Zafar
- **Role**: Full Stack AI Engineer & Computer Vision Specialist
- **Education**: BS in Artificial Intelligence (CGPA 3.74 / 4.0), University of Haripur
- **Email**: [mohsinz35425@gmail.com](mailto:mohsinz35425@gmail.com)
- **WhatsApp / Phone**: [+92 331 9981044](https://wa.me/923319981044)
- **Location**: Jinnah Gardens Phase 1, Islamabad, Pakistan
