# 🤖 Smart Interviewer — AI-Powered Interview Practice Bot

An intelligent, full-stack AI Interview Bot built with **Next.js 16**, **Google Gemini AI**, and **Resemble AI Text-to-Speech**. Features a futuristic dark glassmorphism UI with real-time voice responses, resume parsing, and adaptive interview questions.

> 🏆 Built for hackathon-level impact — production-ready, deployed on Vercel.

**Live Demo:** [ai-interviewer-bot.vercel.app](https://ai-interviewer-bot.vercel.app)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧠 **Gemini AI Interviewer** | Uses Google's `gemini-2.5-flash` model to conduct realistic technical & behavioral interviews |
| 🎙️ **Voice TTS Responses** | AI speaks answers aloud using Resemble AI's streaming text-to-speech |
| 🎤 **Speech-to-Text Input** | Users can speak their answers via browser's Web Speech API |
| 📄 **Resume Upload & Parsing** | Upload PDF/DOCX resume — AI tailors questions to your experience |
| 🔐 **Authentication System** | Email/password signup & login with JWT tokens + bcrypt hashing |
| 🛡️ **Route Protection** | Middleware guards the interview route — login required |
| 📊 **Score Dashboard** | Real-time performance scoring with charts (Recharts) |
| 🎨 **Futuristic UI** | Dark glassmorphism design with particle background & Framer Motion animations |
| 📱 **Fully Responsive** | Works seamlessly on desktop, tablet, and mobile |
| 🌐 **Landing Page** | Beautiful homepage with Hero, Features, Tutorials, Reviews, and CTA sections |

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16.1.6 (App Router, TypeScript, Turbopack) |
| **AI Model** | Google Gemini 2.5 Flash (`@google/generative-ai`) |
| **Voice TTS** | Resemble AI (Streaming API, Voice: Lucy) |
| **Speech Input** | Web Speech API (Browser native) |
| **Auth** | JWT (jose) + bcrypt (bcryptjs) + httpOnly cookies |
| **Database** | JSON file-based storage (`/tmp` on Vercel, `data/` locally) |
| **UI/Styling** | Tailwind CSS 4, Framer Motion, Lucide Icons |
| **Charts** | Recharts |
| **Resume Parsing** | react-dropzone |
| **Markdown** | react-markdown (for AI response rendering) |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
AI-Interview/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Landing page (HomePage component)
│   │   ├── layout.tsx                  # Root layout with fonts & metadata
│   │   ├── globals.css                 # Tailwind + custom styles
│   │   ├── login/
│   │   │   └── page.tsx                # Login/Signup page (email + password)
│   │   ├── interview/
│   │   │   └── page.tsx                # Interview config → Interview screen
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── signup/route.ts     # POST — create account (bcrypt hash)
│   │       │   ├── login/route.ts      # POST — verify credentials, set JWT
│   │       │   ├── logout/route.ts     # POST — clear auth cookie
│   │       │   └── me/route.ts         # GET — current user from JWT
│   │       ├── interview/route.ts      # POST — Gemini AI conversation proxy
│   │       └── tts/route.ts            # POST — Resemble AI TTS proxy
│   ├── components/
│   │   ├── HomePage.tsx                # Full landing page (Hero, Features, etc.)
│   │   ├── Navbar.tsx                  # Navigation bar with auth links
│   │   ├── Footer.tsx                  # Footer with brand & social links
│   │   ├── InterviewScreen.tsx         # Main interview UI + voice + chat
│   │   ├── AIAvatar.tsx                # Animated AI avatar with pulse rings
│   │   ├── ChatArea.tsx                # Chat message display area
│   │   ├── MicButton.tsx               # Microphone button with speech-to-text
│   │   ├── ResumeUpload.tsx            # Drag & drop resume upload
│   │   ├── ScoreDashboard.tsx          # Performance charts & scores
│   │   ├── ParticleBackground.tsx      # Animated floating particles
│   │   └── LandingPage.tsx             # (Legacy) original landing component
│   ├── lib/
│   │   ├── auth.ts                     # JWT create/verify, cookie helpers
│   │   ├── db.ts                       # JSON file-based user database
│   │   ├── prompts.ts                  # System prompts for Gemini AI
│   │   └── types.ts                    # Shared TypeScript types
│   ├── types/                          # Additional type definitions
│   └── middleware.ts                   # Route protection (/interview → login)
├── public/                             # Static assets
├── data/                               # Local user DB (gitignored)
├── .env.local                          # API keys & secrets (gitignored)
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ installed
- **npm** or **yarn**
- **Google Gemini API Key** — [Get it here](https://aistudio.google.com/apikey)
- **Resemble AI API Key** — [Get it here](https://www.resemble.ai/)

### 1. Clone the Repository

```bash
git clone https://github.com/jiakash424/Ai-interviewer-bot.git
cd Ai-interviewer-bot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
RESEMBLE_API_KEY=your_resemble_api_key_here
RESEMBLE_VOICE_ID=fb2d2858
JWT_SECRET=your_random_secret_key_here
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

---

## 🔐 Authentication Flow

```
User visits /interview
        │
        ▼
  Middleware checks cookie
  "smart-interviewer-token"
        │
   ┌────┴────┐
   │ No Token │──────► Redirect to /login
   └─────────┘
        │
   ┌────┴────┐
   │ Has Token│──────► Allow access to /interview
   └─────────┘

Signup:  POST /api/auth/signup  → bcrypt hash → save to DB → JWT cookie
Login:   POST /api/auth/login   → verify password → JWT cookie
Logout:  POST /api/auth/logout  → clear cookie
Me:      GET  /api/auth/me      → decode JWT → return user
```

- Passwords are hashed with **bcrypt** (10 salt rounds)
- JWT tokens are signed with **HS256** using the `jose` library
- Cookies are **httpOnly**, **secure** (in production), **SameSite=Lax**, 7-day expiry
- User data stored in JSON file (`data/users.json` locally, `/tmp/data/users.json` on Vercel)

---

## 🧠 AI Interview Flow

```
1. User configures interview (role, type, difficulty)
2. System sends configuration + resume data to Gemini AI
3. Gemini generates first interview question
4. AI speaks the question via Resemble AI TTS
5. User responds via typing or voice (Web Speech API)
6. Gemini evaluates answer and asks follow-up
7. Loop continues for configured number of questions
8. Score dashboard shows performance breakdown
```

### Key Technical Details:
- **Model:** `gemini-2.5-flash` with custom `systemInstruction`
- **TTS:** Resemble AI streaming endpoint with voice "Lucy" (en-US)
- **Anti-double-fire:** `AbortController` cancels in-flight TTS requests; `interviewStartedRef` prevents React StrictMode double initialization
- **Proxy routes:** API keys never exposed to client — all AI/TTS calls go through Next.js API routes

---

## 🌐 Deployment (Vercel)

### Automatic (GitHub Integration)

1. Push code to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `GEMINI_API_KEY`
   - `RESEMBLE_API_KEY`
   - `RESEMBLE_VOICE_ID`
   - `JWT_SECRET`
4. Deploy — Vercel auto-detects Next.js

### Manual (Vercel CLI)

```bash
npx vercel --prod
```

### Important Notes for Vercel:
- Vercel has a **read-only filesystem** — the app automatically uses `/tmp` for the user database when the `VERCEL` env var is detected
- `/tmp` is **ephemeral** — data persists only within warm serverless function instances
- For production use, replace JSON file DB with a real database (Vercel Postgres, Supabase, etc.)

---

## 📸 Screenshots

### Landing Page
- Hero section with gradient text and CTA buttons
- Features grid with hover animations
- Video tutorials section
- User reviews with star ratings
- Glassmorphism cards with frosted glass effect

### Interview Screen
- AI avatar with animated pulse rings
- Real-time chat with markdown rendering
- Microphone button with speech-to-text
- TTS audio playback indicator
- Score dashboard with Recharts visualization

### Login Page
- Clean email/password form
- Sign Up / Sign In toggle with AnimatePresence
- Error/success toast messages
- Loading spinner on submit
- Particle background animation

---

## 🧩 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | Create new account |
| `POST` | `/api/auth/login` | Login with credentials |
| `POST` | `/api/auth/logout` | Clear auth cookie |
| `GET` | `/api/auth/me` | Get current logged-in user |
| `POST` | `/api/interview` | Send message to Gemini AI |
| `POST` | `/api/tts` | Convert text to speech (Resemble AI) |

---

## 📦 Dependencies

### Production
| Package | Purpose |
|---------|---------|
| `next` 16.1.6 | React framework (App Router) |
| `react` 19.2.3 | UI library |
| `@google/generative-ai` | Gemini AI SDK |
| `jose` | JWT token signing/verification |
| `bcryptjs` | Password hashing |
| `framer-motion` | Animations & transitions |
| `lucide-react` | Icon library |
| `recharts` | Charts for score dashboard |
| `react-dropzone` | File upload (resume) |
| `react-markdown` | Render AI markdown responses |

### Dev Dependencies
| Package | Purpose |
|---------|---------|
| `tailwindcss` 4 | Utility-first CSS |
| `typescript` 5 | Type safety |
| `@types/bcryptjs` | TypeScript types for bcrypt |
| `eslint` + `eslint-config-next` | Linting |

---

## 👤 Author

**Akash Ji**
- GitHub: [@jiakash424](https://github.com/jiakash424)
- Repository: [Ai-interviewer-bot](https://github.com/jiakash424/Ai-interviewer-bot)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built with ❤️ for hackathon excellence. Powered by Gemini AI + Resemble AI.
