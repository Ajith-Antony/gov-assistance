# React Multi-Step Form with AI Assistance

A multi-step form application built with **React**, **MUI**, and **React Hook Form**, featuring **OpenAI GPT integration** for AI-assisted text areas, **multi-language support**, and **accessibility**.

---

## Features

- Multi-step form with validation
- AI-assisted text generation for text areas
- Persistent form data via `localStorage`
- English & Arabic support with RTL layout
- Accessible inputs with ARIA attributes
- Responsive design using Material UI
- Success/Error submission pages
- 404 page
-

---

## Folder Structure

src/
├─ components/ # Reusable UI components
├─ hooks/ # Custom hooks
├─ pages/ # Page components (Home, FormOne, SubmissionStatus, PageNotFound)
├─ services/ # AI generation service
├─ theme/ # MUI theme and RTL support
├─ i18n # Internationalization setup
├─ App.js
└─ main.jsx
└─ routes.jsx

---

## Setup & Running

### 1. Clone and install dependencies

```bash
git clone https://github.com/Ajith-Antony/gov-assistance
cd gov-assistance
npm install
2. Add OpenAI API key
Create .env file in root:

VITE_OPENAI_API_KEY=your_openai_api_key_here
Must use VITE_ prefix to access in Vite.

3. Start development server

npm run dev
```
