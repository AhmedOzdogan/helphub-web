# helphub-web
# HelpHub

HelpHub is a cross-platform online counseling marketplace project. The repository currently contains a polished Expo React Native application that runs on web, iOS, and Android. A separate backend service will be added next.

## Repository Structure

```text
helphub-web/
├── helphub-webapp/      Expo React Native app for web, iOS, and Android
└── helphub-backend/     Planned Express.js + TypeScript backend
```

## Current Status

The frontend application is already implemented inside `helphub-webapp/`.

Current frontend highlights:

- Expo Router application
- React Native and React Native Web support
- TypeScript
- NativeWind / Tailwind styling
- Responsive web, iOS, and Android UI
- Mobile hamburger navigation
- Desktop mega-menu navigation
- Hero slider with autoplay and swipe behavior
- Consultant carousel sections
- Login and sign-up screens
- Appointment selection UI
- Footer, company, numbers, details, advantages, and category sections
- Jest and React Native Testing Library setup
- Component-level UI test coverage

The project is currently a strong frontend prototype. Authentication, consultant data, appointment booking, and persistence are still mock/local and will be connected to a real backend later.

## Planned Backend

A backend folder will be added as:

```text
helphub-backend/
```

Planned backend stack:

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma
- Zod validation
- JWT or session-based authentication
- Jest and Supertest for API tests
- Docker / Docker Compose for local development

Planned backend features:

- User registration and login
- Consultant profiles
- Consultant search and filtering
- Appointment creation
- Availability and time-slot management
- User profile management
- Saved consultants or favorites
- Contact/help messages
- Admin-ready data structure for future expansion

## Frontend App

Frontend location:

```bash
cd helphub-webapp
```

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npm run start
```

Run on web:

```bash
npm run web
```

Run on iOS:

```bash
npm run ios
```

Run on Android:

```bash
npm run android
```

Run tests:

```bash
npm test
```

Run test coverage:

```bash
npm run test:coverage
```

## Testing

The frontend includes Jest and React Native Testing Library tests for core UI components and user interactions, including:

- Navbar mobile menu behavior
- Account menu behavior
- Login and sign-up navigation
- Desktop mega-menu hover behavior
- Slider rendering, autoplay, dots, and swipe behavior
- Footer links and platform-specific branches
- Numbers, companies, details, categories, advantages, and reusable UI cards

## Development Roadmap

Current next steps:

1. Create `helphub-backend/`
2. Set up Express.js with TypeScript
3. Add PostgreSQL and Prisma
4. Implement authentication endpoints
5. Replace frontend mock consultant data with API data
6. Connect appointment selection to backend booking endpoints
7. Add API tests with Jest and Supertest
8. Add Docker Compose for backend and database
9. Add CI for linting, type checks, and tests
10. Add end-to-end tests for important mobile/web flows

## Project Goal

The goal is to build a realistic full-stack counseling marketplace project:

```text
React Native / Expo frontend
+
Express.js / TypeScript backend
+
PostgreSQL database
+
automated frontend and backend tests
```

This structure is intended to demonstrate practical cross-platform frontend development, backend API development, database modeling, testing, and deployment readiness.
# HelpHub

HelpHub is a full-stack online counseling marketplace project.

The repository will contain two main folders:

```text
helphub-web/
├── helphub-webapp/      Frontend: React Native / Expo app for web, iOS, and Android
└── helphub-backend/     Backend: Express.js / TypeScript API
```

## Frontend

The frontend is built with React Native, Expo, TypeScript, NativeWind, and React Native Web.

It includes:

- Web, iOS, and Android support
- Responsive homepage UI
- Mobile hamburger menu
- Desktop navigation and mega menu
- Consultant cards and carousel sections
- Login and sign-up screens
- Appointment selection UI
- Jest and React Native Testing Library tests

Frontend folder:

```bash
cd helphub-webapp
```

Run the frontend:

```bash
npm install
npm run start
```

## Backend

The backend will be created in a separate folder:

```bash
helphub-backend/
```

Planned backend stack:

- Express.js
- TypeScript
- PostgreSQL
- Prisma
- Authentication for login and sign-up
- Consultant and appointment APIs
- Backend tests with Jest and Supertest

Planned backend features:

- User registration
- User login
- Consultant profiles
- Consultant search/filtering
- Appointment booking
- User profile management

## Goal

The goal is to build a realistic full-stack project with:

```text
React Native / Expo frontend
+
Express.js / TypeScript backend
+
PostgreSQL database
+
automated tests
```