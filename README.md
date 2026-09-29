# 🎬 Projecte Movies

A movie exploration app built with React and TypeScript. Search for movies, browse their details and save your favorites, using data from [The Movie Database (TMDB)](https://www.themoviedb.org/).

Built as a school project for **IT Academy**.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Git Workflow](#git-workflow)
- [Roadmap](#roadmap)
- [Author](#author)
- [Acknowledgements](#acknowledgements)

## Features

- **Movie search**: find movies by title with a controlled search bar.
- **Genre filter**: narrow down the movie list by genre.
- **Movie cards**: poster, title, release year and rating at a glance.
- **Movie details**: dedicated page for each movie.
- **Actor and director pages**: explore the people behind the movies.
- **Authentication**: register and log in with Firebase Auth.
- **Protected routes**: restricted pages only available to logged-in users.
- **Custom backend**: own API layer on top of TMDB. *(planned)*
- **Dark theme**: custom design tokens defined with Tailwind.
- **Tested components**: unit tests written with Vitest and React Testing Library.

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | [React](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Build tool | [Vite](https://vite.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Routing | [React Router](https://reactrouter.com/) |
| Authentication | [Firebase Auth](https://firebase.google.com/docs/auth) |
| Data source | [TMDB API](https://developer.themoviedb.org/) |
| Testing | [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) |
| Version control | Git, following Git Flow |

## Project Structure

The project is organized by **feature**, with shared code kept in its own folder.

```
projecte-movies/
├── public/                         # Static assets
├── src/
│   ├── assets/                     # Images and other static resources
│   ├── features/
│   │   ├── auth/
│   │   │   ├── context/            # AuthContext (Firebase session state)
│   │   │   ├── pages/              # LoginPage, RegisterPage
│   │   │   └── types/              # auth.ts
│   │   ├── homeMovie/
│   │   │   ├── components/         # GenreFilter, MovieCard, SearchBar (+ tests)
│   │   │   ├── pages/              # HomePage
│   │   │   ├── service/            # exploreService
│   │   │   └── types/              # MovieList.ts
│   │   └── movie-detail/
│   │       ├── pages/              # MovieDetailPage, ActorDetailPage, DirectorDetailPage
│   │       └── types/              # movieDetail.ts, personal.ts
│   ├── layouts/
│   │   └── Layout.tsx              # Common page layout (header, content, footer)
│   ├── router/
│   │   └── AppRouter.tsx           # Application routes
│   ├── shared/
│   │   ├── components/             # Header, Footer, ProtectedRoute
│   │   ├── service/                # firebase.ts, tmdbClient.ts
│   │   └── types/                  # movie.ts
│   ├── test/
│   │   └── setup.ts                # Test setup (jest-dom matchers)
│   ├── App.tsx                     # Root component
│   ├── main.tsx                    # Application entry point
│   └── index.css                   # Tailwind import and theme tokens
├── .env                            # Environment variables (not committed)
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts                  # Vite and Vitest configuration
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or higher
- npm
- A free [TMDB API key](https://developer.themoviedb.org/docs/getting-started)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/oriolcalicab/Project-Movies_itAcademy.git

# 2. Move into the project folder
cd Project-Movies_itAcademy

# 3. Install dependencies
npm install

# 4. Set up your environment variables (see below)
cp .env.example .env

# 5. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key

# Firebase
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id
```

> Never commit your `.env` file. Make sure it is listed in `.gitignore`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the development server |
| `npm run build` | Type-checks and builds the app for production |
| `npm run preview` | Previews the production build locally |
| `npm run test` | Runs the tests in watch mode |
| `npm run test:run` | Runs the tests once |

## Testing

Components are tested with **Vitest** and **React Testing Library**. Each test describes its behavior with a Gherkin scenario (`Given / When / Then`) placed right above it.

```bash
npm run test
```

## Git Workflow

This project follows **Git Flow**:

- `main`: stable, production-ready code
- `develop`: integration branch for ongoing work
- `feature/*`: one branch per feature, created from `develop`

Commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) convention (`feat:`, `fix:`, `test:`, `chore:`...).

## Roadmap

- [x] Project setup (Vite, React, TypeScript, Tailwind)
- [x] Search bar component with tests
- [x] Movie list, movie cards and genre filter
- [x] Movie, actor and director detail pages
- [x] User authentication and protected routes
- [ ] Favorites
- [ ] Custom backend

## Author

**Oriol Calí**

## Acknowledgements

This product uses the TMDB API but is not endorsed or certified by TMDB.