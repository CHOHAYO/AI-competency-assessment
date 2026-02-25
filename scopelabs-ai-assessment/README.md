# Scopelabs AI Assessment Platform

This is a client-side Single Page Application (SPA) for AI Competency Assessment, built with React, Tailwind CSS, and Recharts.

## Features

- **Assessment**: 30 questions across 5 categories (AI Understanding, Data Literacy, AI Utilization, AI Ethics, AI Collaboration).
- **Interactive UI**: Keyboard shortcuts (1-5), auto-advance, progress tracking.
- **Results**: Detailed analysis with Radar Chart and Bar Chart.
- **PDF Download**: Generate a PDF report of the results.
- **Persistence**: Auto-save progress to local storage.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Animations**: Framer Motion
- **PDF Generation**: html2canvas, jspdf

## How to Run

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Build for production: `npm run build`

## Project Structure

- `src/components`: UI components and page sections.
- `src/context`: State management for the assessment flow.
- `src/data`: Question data.
- `src/lib`: Utility functions.
