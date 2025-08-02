#  My Reading List

A small full-stack web app built with **Nuxt 3** and **Nuxt UI**, designed to help users record and manage their reading list.  
This project was created as a hands-on exercise to practice modern full-stack development with Nuxt and SQL.

---

##  Features

-  View all books with title, author, and reading status (Read / Unread)
-  Add new books to the reading list
-  Toggle book reading status
-  Delete books from the list
-  Full stack: Nuxt 3 + Server API routes + SQL database (Supabase)

---

##  Tech Stack

| Layer       | Technology         |
|-------------|--------------------|
| Frontend    | Nuxt 3 + Nuxt UI   |
| Backend     | Nuxt Server Routes |
| Database    | Supabase           |
| Styling     | Nuxt UI default components |
| State       | Local state with `useFetch` (no Pinia/Vuex) |

---

##  Getting Started (Development)

### 1. Clone the repository

git clone https://github.com/NancySun75/Nuxt-MyReadingList.git
cd Nuxt-MyReadingList

### 2. Install dependencies
# Using pnpm
pnpm install

### 3. Start the development server
pnpm dev
Go to http://localhost:3000 to view the app.


##  Database Setup

This project uses Supabase as a backend SQL database (PostgreSQL).

Supabase client is initialized in plugins/supabase.ts

API routes use server/utils/supabaseClient.ts to read/write data

You can modify or extend the database schema directly in your Supabase project dashboard.

##  Project Structure

pages/           # UI pages: index, books list, add book
components/      # Reusable UI: NavBar, Footer
layouts/         # Default layout with shared UI
server/api/      # Nuxt Server Routes for CRUD
plugins/         # Supabase plugin

##  Production Build (optional)

To build and preview production output locally:
pnpm build
pnpm preview
