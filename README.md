# mike-at-redspace in LCARS UI

A React 19 + Astro single-page application inspired by the LCARS design language. Built with atomic design patterns, Tailwind CSS, and modern tooling.

## ✨ Features

- **React 19** + **Astro** — Modern build system with SSR
- **Tailwind CSS v4** — Utility-first styling with CSS Modules
- **Atomic Design** — Organized component hierarchy (atoms → molecules → organisms)
- **Context Providers** — Global state management
- **Custom Hooks** — Reusable logic and effects
- **Design Tokens** — Consistent theming system
- **Path Aliases** — Clean imports (`@/components`, `@/hooks`, etc.)

## 📁 Project Structure

```
me/
├── src/
│   ├── components/          # React components (atomic structure)
│   │   ├── atoms/           # Basic building blocks
│   │   ├── molecules/       # Composite components
│   │   ├── organisms/       # Complex UI sections
│   │   └── pages/           # Page-level components
│   ├── hooks/               # Custom React hooks
│   ├── context/             # Global state providers
│   ├── tokens/              # Design tokens: spacing, colors, typography
│   ├── utils/               # Utility functions
│   ├── data/                # Static data sources
│   ├── styles/              # Global styles and resets
│   ├── layouts/             # Astro layouts
│   └── pages/               # Astro pages / routes
├── public/                  # Static assets
├── astro.config.mjs         # Astro configuration with path aliases
├── package.json
└── README.md
```

## 🚀 Getting Started

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

## 🏗️ Architecture

### Components

Organized using atomic design principles:

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

## 📄 Credits

- **Simple Icons** — Brand icons for project tags ([simple-icons.org](https://simpleicons.org/))

## 📄 License

See `LICENSE.txt` for details.
