# Game Explorer

A React application for browsing and searching video games using the [RAWG API](https://rawg.io/apidocs).

## Live Demo

[game-explorer-git-main-xtekkis-dev.vercel.app](https://game-explorer-git-main-xtekkis-dev.vercel.app)

## Features

- Browse top rated games
- Search games by name
- Filter games by genre
- Skeleton loading cards while data is fetched
- Click any game to view details such as rating, release date, genres, platforms and description
- Dynamic browser tab titles per page
- Search and genre state persist in the URL

## Tech Stack

- React 19
- Vite
- React Router DOM
- RAWG Video Games Database API
- Deployed on Vercel

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file in the root with your RAWG API key: VITE_RAWG_API_KEY=your_api_key_here
4. Run the development server with `npm run dev`