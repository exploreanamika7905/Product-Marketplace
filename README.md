# Responsive Product Listing App (Next.js & Bootstrap)

This project is a clean, server-side rendered marketplace UI built with Next.js and Bootstrap. It fetches live catalog variations utilizing SSR configuration.

## Features
- **Server-Side Rendering (SSR)**: Initial view rendered instantly on the server via `getServerSideProps`.
- **Responsive Layout**: Designed fluidly for Mobile, Tablet, and Desktop using Bootstrap grids.
- **Client-Side Filtering**: Real-time product queries matching search inputs with micro loading spinner delays.
- **Dynamic Routing**: Click-through details navigation structured via `/product/[id]`.

## Tech Stack
- **Framework**: Next.js (Pages Router)
- **Styling**: Bootstrap v5
- **Data Fetching**: Axios
- **API**: [Fake Store API](https://fakestoreapi.com)

## Installation & Local Run
1. Clone the repository or extract the ZIP file.
2. Open your terminal in the workspace directory.
3. Install dependencies:
   ```bash
   npm install