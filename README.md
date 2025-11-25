# mike-at-redspace — Dev Blog & Portfolio

This is my personal dev blog and portfolio, focused on CodePen experiments and UI work inspired by Star Trek. Built in LCARS style, it reflects my love for the Star Trek franchise and for my current role with Paramount.

---

## 📝 What You'll Find Here

- **CodePen Experiments** — Interactive demos and creative UI experiments, straight from my CodePen.
- **Star Trek-Inspired UI** — LCARS-themed components and layouts, for fellow fans and the curious.
- **Project Showcases** — Write-ups and demos of things I’ve built or contributed to (often with a sci-fi twist).
- **Personal Notes** — Reflections, lessons learned, and stories from my journey (including my work at Paramount).

---

## ✨ Features

- **Personalized LCARS UI** — A Star Trek-inspired interface for a unique reading experience
- **React 19 + Astro** — Modern, fast, and fun to hack on
- **Blog & Portfolio** — Posts, project pages, and interactive demos
- **Atomic Design** — Clean, scalable component structure
- **Custom Hooks & Context** — For state, audio, navigation, and more
- **Design Tokens** — Consistent theming and easy customization

## 📁 Project Structure

```
me/
├── src/
│   ├── components/    # React UI (atomic design)
│   ├── hooks/         # Custom React hooks
│   ├── context/       # Global state providers
│   ├── tokens/        # Design tokens (colors, spacing, typography)
│   ├── utils/         # Utility functions
│   ├── data/          # Blog posts, project data, etc.
│   ├── styles/        # Global styles
│   ├── layouts/       # Astro layouts
│   └── pages/         # Astro routes (blog, projects, etc.)
├── public/            # Static assets
├── astro.config.mjs   # Astro config
├── package.json
└── README.md
```

## 🚀 Getting Started

Want to run this blog locally or hack on it?

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:4321
```

### Production

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 🧩 Tech Stack

- **Astro** — Build pipeline with SSR
- **React 19** — UI components
- **Tailwind CSS v4** — Styling with CSS Modules
- **Lucide React** — Icon components
- **Simple Icons** — Brand icons for project tags

## 🏗️ Architecture & Patterns

### Components

Built with atomic design principles:

- **Atoms**: `Button`, `Block`, `Badge`, `ProgressBar`, `Input`, `Textarea`, `Icon`
- **Molecules**: `Card`, `FormField`, `StatCard`, `SkillCard`, `ProjectCard`, `CodePenCard`
- **Organisms**: `Navigation`, `Header`, `Sidebar`, `Timeline`, `ExperienceCard`
- **Pages**: `Dashboard`, `ServiceRecord`, `TechSpecs`, `ProjectDatabase`, `VisualLogs`, `Communication`

### State Management

React Context providers:

- **AudioContext** — Audio state and playback controls
- **NavigationContext** — Navigation state and route transitions
- **ThemeContext** — Theme tokens and color variants

### Custom Hooks

- `useAudio` — Audio playback and controls
- `useStardate` — Stardate calculation
- `useNavigation` — Navigation helpers
- `useScrambleEffect` — Text scrambling animations

### Design Tokens

Located in `src/tokens/`: Colors, Spacing, Typography

## 🤝 Follow & Contribute

Want to follow updates or contribute?

- **RSS/Atom**: Coming soon!
- **Issues/PRs**: Suggestions, corrections, and contributions are welcome—open an issue or PR.
- **Contact**: Find me on [GitHub](https://github.com/mike-at-redspace) or reach out via the site.

---

## 📄 Credits

### Dependencies

- **React** — UI library ([react.dev](https://react.dev/))
- **React DOM** — React renderer ([react.dev](https://react.dev/))
- **Lucide React** — Icon components ([lucide.dev](https://lucide.dev/))
- **Simple Icons** — Brand icons for project tags ([simpleicons.org](https://simpleicons.org/))

### Development Dependencies

- **Astro** — Build system with SSR ([astro.build](https://astro.build/))
- **Tailwind CSS** — Utility-first CSS framework ([tailwindcss.com](https://tailwindcss.com/))
- **ESLint** — JavaScript linter ([eslint.org](https://eslint.org/))
- **Prettier** — Code formatter ([prettier.io](https://prettier.io/))

## 📄 License

See `LICENSE.txt` for details.
