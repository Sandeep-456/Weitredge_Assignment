# Futuristic AI Support Assistant

A professional full-stack, documentation-driven AI Chatbot. This assistant is engineered to provide high-speed product support using the **Gemini 2.5 Flash** model while strictly adhering to a specific knowledge base.

---

## Tech Stack

### Frontend

- **Framework:** React (Vite)
- **Styling:** Tailwind CSS v4 (CSS-first configuration)
- **UI Components:** PrimeReact (Toasts), React Icons
- **Animations:** Lottie Files & Framer Motion transitions
- **State Management:** React Hooks (useState, useEffect, useRef)

### Backend

- **Environment:** Node.js & Express.js
- **Database:** SQLite (via Turso/LibSQL) for persistent session history
- **AI Engine:** Google Gemini 2.5 Flash
- **Architecture:** Controller-Service Pattern

---

## Key Features

- **Futuristic UI/UX:** A sleek "glassmorphism" aesthetic with full Dark and Light mode support.
- **Strict Knowledge Filtering:** The AI is programmatically restricted to answer ONLY from the provided `docs.json`. General knowledge queries are gracefully declined.
- **Smart Session Persistence:**
  - Uses **UUID v4** to uniquely identify users.
  - Automatically recovers chat history from the database on page refresh.
  - Includes a "New Session" feature with a smooth loading transition.
- **Contextual Awareness:** The backend maintains the last **5 pairs (10 messages)** of conversation to ensure the AI understands follow-up questions.
- **Real-time Feedback:** **PrimeReact Toasts** notify users of rate limits, successful resets, or connection errors.

---

## Folder Structure

```text
├── Backend/
│   ├── src/
│   │   ├── controllers/   # Chat & History logic
│   │   ├── utils/         # Prompt Engineering & UUID logic
│   │   └── index.js       # Express Server & DB connection
│   └── docs.json          # Source of Truth for the AI
└── Frontend/
    ├── src/
    │   ├── api/           # Axios Service Layer
    │   ├── components/    # Sidebar, ChatWindow, ChatInput, ThemeToggle
    │   ├── utils/         # Session & LocalStorage helpers
    │   └── App.jsx        # Root Orchestrator


```

## Getting Started

1. Prerequisites:
   Node.js (v18+)

A Gemini API Key from Google AI Studio

A Turso Database account (or local SQLite file)

2. Backend Installation
   cd Backend
   npm install

# Create a .env file:

# PORT=5000

# GEMINI_API_KEY=your_key_here

# TURSO_DB_URL=your_url

# TURSO_DB_TOKEN=your_token

npm run dev

## Testing Constraints

The AI is configured with a System Instruction to prevent hallucinations. You can test it with:

Valid Query: "How do I reset my password?" - Result: Provides steps from the documentation.

Invalid Query: "Who won the 2022 World Cup?"

Result: "Sorry, I don't have information about that."

## Author

Sandeep Indugula Junior Full Stack Developer
