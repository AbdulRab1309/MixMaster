# 🍹 MixMaster - Cocktail Recipe Finder

A modern, premium web application for discovering and exploring cocktail recipes. Built with **Next.js**, **shadcn/ui**, **Tailwind CSS**, **Framer Motion**, and **Spline 3D**.

Powered by [TheCocktailDB API](https://www.thecocktaildb.com/api.php).

---

## ✨ Features

- **🎲 Random Cocktail** — Get a surprise cocktail recommendation on the homepage
- **🔍 Search** — Find cocktails by name with instant results
- **📋 Browse Categories** — Explore cocktails by type (Ordinary Drink, Cocktail, Beer, etc.)
- **📖 Detailed Recipes** — View complete ingredients, measurements, and instructions
- **🌐 Multi-language** — View instructions in Spanish, German, and French (when available)
- **🎥 Video Tutorials** — Watch video tutorials for select cocktails
- **🎨 Premium Dark UI** — Stunning dark theme with animated gradients, glassmorphism, and 3D effects
- **⚡ Smooth Animations** — Framer Motion powered transitions and micro-interactions

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Tailwind CSS 4** | Utility-first styling |
| **shadcn/ui** | Premium UI components |
| **Framer Motion** | Animations and transitions |
| **Spline 3D** | Interactive 3D scene on homepage |
| **Lucide React** | Icon library |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd "CAPSTONE PROJECT- Public API Lists"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the dev server**

   ```bash
   npm run dev
   ```

4. **Open your browser**

   Navigate to **`http://localhost:3000`**

---

## 📁 Project Structure

```
mixmaster/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with metadata
│   │   ├── page.tsx                # Homepage (hero, search, featured cocktail)
│   │   ├── globals.css             # Global styles and theme
│   │   ├── categories/
│   │   │   ├── page.tsx            # Browse all categories
│   │   │   └── [name]/
│   │   │       └── page.tsx        # Cocktails in a category
│   │   ├── cocktail/
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Cocktail detail page
│   │   └── search/
│   │       └── page.tsx            # Search cocktails
│   ├── components/
│   │   ├── navbar.tsx              # Navigation bar
│   │   ├── background.tsx          # Animated gradient background
│   │   ├── footer.tsx              # Footer
│   │   └── ui/                     # shadcn/ui components
│   └── lib/
│       └── utils.ts                # Utility functions
├── public/                         # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## 🔌 Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, 3D scene, search, and random cocktail |
| `/categories` | Browse all cocktail categories |
| `/categories/[name]` | View cocktails in a specific category |
| `/cocktail/[id]` | Detailed cocktail recipe page |
| `/search?q=...` | Search cocktails by name |

---

## 🍸 API

This project uses **TheCocktailDB API** — free, open, no authentication required.

| Endpoint | Description |
|----------|-------------|
| `/random.php` | Get a random cocktail |
| `/search.php?s={name}` | Search by cocktail name |
| `/lookup.php?i={id}` | Get cocktail by ID |
| `/list.php?c=list` | List all categories |
| `/filter.php?c={category}` | Filter by category |

---

## 📝 License

Built for educational purposes as part of a Full Stack Development Capstone Project.

---

**Happy Mixing! 🍹**
