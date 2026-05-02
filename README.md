# MediCore - Healthcare Management Platform

B2B Healthcare SaaS application built with Next.js, TypeScript, Tailwind CSS, and Zustand.

## Features

- **Authentication** - Firebase
- **Dashboard** - Stats cards, recent patients, status/condition/blood type breakdowns
- **Patient Management** - Grid/List toggle, search, status filtering, vital signs display
- **Analytics** - Age distribution, status pie chart, visits trend, gender distribution, conditions by status
- **Notifications** - Service Worker with push/local notifications, in-app notification panel
- **Responsive** - Sidebar + mobile drawer, adaptive layouts

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Zustand (state management)
- Recharts (charts)
- Lucide React (icons)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Demo Login

- **Email:** `demo@healthcare.com`
- **Password:** `demo123`

## Connecting Real Patient API

Replace `mockPatients` in `src/data/patients.ts` with an API call, and update `src/stores/patientStore.ts` to fetch from your backend instead of importing the static data.

## Build for Production

```bash
npm run build
```

Static files will be generated in the `dist/` directory.
