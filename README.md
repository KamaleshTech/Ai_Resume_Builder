# Ai_Resume_Builder

A modern AI-powered resume builder web app built with React, Vite, TypeScript, and Tailwind CSS.

## Features

- Enter personal details, experience, education, projects, and skills
- Live resume preview with formatting
- AI-powered suggestions for stronger wording and job-specific keywords
- Export options placeholder for PDF/Word export

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create an `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. Add your OpenAI API key in `.env`:
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

## Run locally

```bash
npm run dev -- --host
```

Open `http://localhost:5173` in your browser.

## Build

```bash
npm run build
```

## Notes

- AI suggestions work only after configuring the OpenAI API key.
- The app is already set up and builds successfully.

