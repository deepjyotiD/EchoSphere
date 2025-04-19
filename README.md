# 🎧 EchoSphere — Interactive Podcast Experience

**EchoSphere** is a next-generation podcast web app that transforms listening into an immersive, intelligent, and social experience. From interactive story choices and synced visuals to AI-powered learning tools — EchoSphere is where podcasts come alive.

---

## 🚀 Features


### 🎧 Advanced Media Player
- Sleek, customizable audio player
- Synced visuals/slides with timestamp markers
- Variable playback speed
- Timestamped user comments
- Smooth animations (Framer Motion)

### 🔗 Real Podcast Support
- Import podcasts using public **RSS feed URLs**
- Parses metadata and episodes from real podcasts

### 🗣️ Social + Interactive
- **Live Chat** on episodes
- **Commenting system** tied to timestamps
- **Interactive stories** with branching choices (choose-your-own-path style)

### 🔒 Auth & Personalization
- Supabase-powered authentication
- Personalized Library: Continue Listening, Saved Episodes, History
- Listening stats, badges, and gamified engagement

---

## 🛠️ Tech Stack

| Layer      | Tool / Service         |
|------------|------------------------|
| Frontend   | Vite + React + TypeScript |
| UI         | Tailwind CSS + shadcn-ui |
| Backend    | Supabase (Auth, DB, Storage, Realtime) |
| State & Animations | Framer Motion |
| AI Layer   | Placeholder / Mock (ready for OpenAI, etc.) |

---

## 📂 Project Structure

src/
├── components/      
├── pages/            
├── lib/              
├── styles/           
└── supabase/         

---

## 📦 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/deepjyotiD/echosphere.git
cd echosphere