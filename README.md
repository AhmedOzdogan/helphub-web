# HelpHub

HelpHub is a full-stack online counseling marketplace project with a React Native / Expo frontend and Express.js / TypeScript backend.

## Repository Structure

```text
helphub-web/
├── helphub-webapp/      Frontend: Expo React Native app (web, iOS, Android)
└── helphub-backend/     Backend: Express.js + TypeScript API
```

## Project Status

Both frontend and backend are implemented and functional.

### Frontend Highlights

- **Expo Router** application with React Native and React Native Web support
- **TypeScript** for type safety
- **NativeWind / Tailwind** styling with responsive design
- **Web, iOS, and Android** support
- **Mobile hamburger** navigation and **desktop mega-menu** navigation
- **Hero slider** with autoplay and swipe behavior
- **Consultant carousel** sections
- **Login and sign-up** screens with form validation
- **Appointment selection** UI
- **Multi-language support** (i18n) - English, German, Spanish, French, Italian
- **Jest and React Native Testing Library** with component tests
- **Playwright** for end-to-end testing

### Backend Implementation

- **Express.js** with **TypeScript** for type-safe API development
- **PostgreSQL** database with **Prisma ORM**
- **Authentication endpoints**: `/auth/signup` and `/auth/login`
- **User model** with email, password, and profile fields
- **CORS** enabled for frontend integration
- **Health check** endpoint at `/health`
- **Docker Compose** setup for local PostgreSQL database
- **Dockerfile** for containerized deployment
- Zod validation integration (configured in dependencies)

## Getting Started

### Frontend

Navigate to the frontend directory:

```bash
cd helphub-webapp
npm install
```

Run in development mode:

```bash
npm run start          # Expo development server
npm run web           # Run on web
npm run ios           # Run on iOS
npm run android       # Run on Android
```

Run tests:

```bash
npm test              # Run Jest tests
npm test:watch        # Watch mode
npm run test:coverage # Coverage report
```

### Backend

Navigate to the backend directory:

```bash
cd helphub-backend
npm install
```

Set up environment variables (create a `.env` file):

```env
DATABASE_URL="postgresql://user:password@localhost:5432/helphub"
PORT=4000
```

Start the PostgreSQL database:

```bash
docker compose up -d
```

Run database migrations:

```bash
npx prisma migrate dev
```

Run the backend server:

```bash
npm run dev    # Development with hot reload
npm run build  # Build for production
npm run start  # Start production server
```

Seed the database (optional):

```bash
npm run seed
```

## Development Roadmap

### Completed

- ✅ Create `helphub-backend/` folder structure
- ✅ Set up Express.js with TypeScript
- ✅ Add PostgreSQL and Prisma ORM
- ✅ Implement authentication endpoints (signup/login)
- ✅ Create User model in database
- ✅ Docker Compose setup for local development
- ✅ Frontend UI with responsive design
- ✅ Multi-language support (i18n)
- ✅ Component-level tests with Jest and React Native Testing Library
- ✅ End-to-end tests with Playwright
- ✅ CI/CD pipeline with GitHub Actions

### CI/CD Pipeline

The project includes a **GitHub Actions workflow** (`.github/workflows/ci.yml`) that automatically:

The CI/CD pipeline runs on a **self-hosted macOS GitHub Actions runner** for improved Playwright stability, browser consistency, Docker caching, and faster end-to-end test execution.

1. **Installs dependencies** for both frontend and backend
2. **Sets up the environment** with PostgreSQL database via Docker
3. **Runs database migrations** using Prisma
4. **Seeds the database** with test data
5. **Starts the backend** server and verifies health check
6. **Runs Jest tests** for the frontend components
7. **Runs Playwright tests** across multiple browsers:
   - Chromium
   - Firefox
   - WebKit
8. **Uploads test reports** as artifacts for each browser
9. **Cleans up Docker resources** after completion

The CI pipeline runs on:
- **Push to main** branch
- **Pull requests** to main branch
- **Manual trigger** via workflow_dispatch

**Triggers:** The workflow uses a self-hosted runner with Node.js LTS and requires these GitHub secrets:
- `testUsername` and `testPassword` for E2E testing
- `PLAYWRIGHT_TEST_BASE_URL` for test environment URL
- `DATABASE_URL` for PostgreSQL connection
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` for database setup

### Next Steps

1. Extend authentication with JWT tokens or sessions
2. Implement Consultant profiles and search API
3. Create Appointment booking endpoints
4. Add availability and time-slot management
5. Implement user profile management endpoints
6. Add API tests with Jest and Supertest
7. Create Saved consultants / favorites functionality
8. Implement Contact/help messages system
9. Deploy to production (backend and database)
10. Add linting (ESLint) and type checks to CI pipeline
11. Add Redis caching for frequently accessed data
12. Implement rate limiting and API security middleware
13. Add email notifications and password reset flows
14. Introduce role-based access control (RBAC)
15. Add monitoring and logging infrastructure

## Testing

### Frontend Tests

The frontend includes Jest and React Native Testing Library tests covering:

- Navbar and mobile menu behavior
- Account menu interactions
- Login and sign-up navigation flows
- Desktop mega-menu hover behavior
- Slider rendering, autoplay, dots, and swipe behavior
- Footer links and platform-specific branches
- UI component rendering and interactions

### End-to-End Tests

Playwright tests validate critical user flows across web, Firefox, and WebKit browsers.

### Backend Tests

API endpoints can be tested using:

```bash
curl http://localhost:4000/health
curl -X POST http://localhost:4000/auth/signup -H "Content-Type: application/json" -d '{"email":"user@example.com","password":"password123","name":"User"}'
```

Tests with Jest and Supertest coming soon.

### Automated CI/CD Testing

The GitHub Actions workflow automatically:

- **Sets up the test environment** with PostgreSQL via Docker
- **Runs all Jest tests** for frontend components
- **Executes Playwright E2E tests** across three browsers (Chromium, Firefox, WebKit)
- **Generates test reports** with HTML artifacts for failed tests
- **Uploads results** for each browser separately for detailed analysis
- **Cleans up resources** after each run

All tests run automatically on every push and pull request to the main branch.

## Project Architecture

This is a full-stack application demonstrating:

```text
React Native / Expo Frontend (web, iOS, Android)
        ↓ (HTTP/REST)
Express.js / TypeScript Backend API
        ↓ (Prisma ORM)
PostgreSQL Database
        ↓
Automated Testing (Jest, Playwright, Supertest)
```

The project showcases:

- **Cross-platform frontend development** with React Native and Expo
- **Type-safe backend development** with Express.js and TypeScript  
- **Database modeling** with Prisma
- **Authentication flows** with security best practices
- **Testing strategies** for frontend, backend, and E2E scenarios
- **Docker containerization** for reproducible environments
- **Production-ready structure** for scaling

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | Expo, React Native, TypeScript, NativeWind, TailwindCSS, i18next |
| Backend | Express.js, TypeScript, Node.js |
| Database | PostgreSQL, Prisma ORM |
| Testing | Jest, React Native Testing Library, Playwright, Supertest |
| DevOps | Docker, Docker Compose |
| Language | TypeScript, JavaScript |

## Contributing

When contributing, ensure:

1. Both frontend and backend tests pass
2. TypeScript types are properly defined
3. Code follows the existing project structure
4. New features include test coverage

## License

ISC