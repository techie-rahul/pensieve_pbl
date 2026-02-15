# 🧠 Pensieve — Privacy-First Reflective Journaling MVP

Pensieve is a **privacy-first reflective journaling web application** designed to help users notice emotional and thematic patterns in their writing over time.

Unlike basic diary apps that only store entries, Pensieve provides **grounded reflections**, **transparent pattern detection**, and **academic concept citations** — without acting as therapy or diagnosis.

> “Pensieve doesn’t diagnose — it illuminates patterns through reflection.”

---

## ✨ Key Features

### 📝 Distraction-Free Journaling
- Minimal writing space for free reflection  
- Autosave every 3 seconds  
- Calm Apple-inspired UI  

### 🧠 Brain Companion Orb
- Ambient animated orb presence  
- Pulses while typing  
- Represents reflective companionship, not advice-giving  

### 📅 Timeline + Search
- View all journal entries chronologically  
- Live keyword search across entries  
- Expandable entry previews  

### 📊 Emotional Trends Dashboard
- Dynamic emotion signal tracking based on recurring language  
- Detects patterns such as:
  - Anxiety-related language  
  - Growth-oriented vocabulary  
  - Gratitude signals  
  - Sadness/fatigue indicators  

### 💡 Explainable Reflection Engine
- Reflections generated only when patterns repeat across multiple entries  
- Includes:
  - Probabilistic language (“may suggest…”)  
  - Confidence score capped at 80%  
  - Psychological concept citation  
  - Transparent keyword evidence  

### 📚 Concept Library
- Dedicated page documenting all cited concepts  
- Shows:
  - Author + year reference  
  - Description  
  - Trigger keywords  
  - Expandable “Learn More” section  

### 🔒 Privacy-First Architecture
- Entries remain on the user side through a local-first persistence layer  
- No external storage or third-party access  
- Designed for future upgrade to encrypted zero-knowledge sync  

---

## 🛠 Tech Stack

- **React + Vite** — Modern frontend framework  
- **Tailwind CSS** — Minimal Apple-style UI design  
- **Framer Motion** — Smooth animations for orb + transitions  
- **Client-side persistence layer** — Privacy-preserving journaling storage  
- **Transparent NLP pattern logic** — Keyword-based emotional + thematic analysis  
- **Concept citation database** — Research-grounded reflections  

---

## 📂 Project Structure

```bash
src/
 ├── components/
 │   ├── BrainOrb.jsx            # Animated reflective companion orb
 │   ├── EntryList.jsx           # Expandable journal entry timeline
 │   └── ReflectionCard.jsx      # Evidence-based reflection UI card
 │
 ├── data/
 │   └── concepts.json           # Psychology/philosophy concept library + citations
 │
 ├── pages/
 │   ├── Write.jsx               # Distraction-free journaling editor + autosave
 │   ├── Timeline.jsx            # Entry history + Emotional Trends dashboard + search
 │   ├── Reflection.jsx          # Pattern-based reflection generation page
 │   └── Concepts.jsx            # Concept Library (research grounding)
 │
 ├── utils/
 │   ├── storage.js              # Local-first persistence + CRUD for entries
 │   ├── reflectionEngine.js     # Transparent keyword-based insight engine
 │   └── emotionTrends.js        # Emotion trend detection + dashboard logic
 │
 ├── App.jsx                     # Routing + navigation shell
 ├── main.jsx                    # React entry point
 └── index.css                   # Global styling + theme

## 🚀 Running the Project Locally

### 📌 Prerequisites
- Node.js (v18 or higher recommended)
- npm

---

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/techie-rahul/pensieve_pbl.git
cd pensieve_pbl
```

---

### 2️⃣ Install Dependencies
```bash
npm install
```

---

### 3️⃣ Start Development Server
```bash
npm run dev
```

The application will run at:  
👉 http://localhost:5173

---

### 4️⃣ Build for Production (Optional)
```bash
npm run build
```

---

### 5️⃣ Preview Production Build (Optional)
```bash
npm run preview
```

---