<div align="center">

# Swamy R — Full Stack Developer Portfolio

[![Live Site](https://img.shields.io/badge/Live_Demo-swamyr.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://swamyr.vercel.app/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)](https://tailwindcss.com/)
[![Oxlint](https://img.shields.io/badge/Oxlint-Configured-blue?style=for-the-badge&logo=oxc&logoColor=white)](https://oxc.rs/)

<p align="center">
  A high-performance, strictly monochrome developer portfolio inspired by the clean editorial aesthetics of Linear and Vercel. Engineered with pure CSS 3D transforms, HTML5 Canvas spring physics, and zero heavy 3D library dependencies.
</p>

[**Explore Live Demo »**](https://swamyr.vercel.app/)

</div>

---

## ⚡ Engineering Highlights

- **Interactive 3D Fibonacci Skills Sphere**: Built without Three.js or WebGL using pure CSS 3D transforms and a 60/120 FPS `requestAnimationFrame` loop that mutates DOM nodes directly via refs, eliminating React reconciliation re-renders.
- **Interactive Canvas Physics Grid**: Custom 2D spring physics dot grid that reacts to cursor proximity with dampening and dynamic masking.
- **Strict Monochrome Design System**: Minimalist high-contrast light/dark modes with zero colored glows or distractions, backed by CSS design tokens.
- **Accessible & Motion-Aware**: Fully honors `prefers-reduced-motion` by gracefully disabling continuous rotations and physics simulations while maintaining full accessibility.
- **Blazing Fast**: Powered by React 19 + Vite 8 with Oxlint configured for automated code quality and linting.

---

## 🛠️ Tech Stack

### Portfolio Application (This Repository)
- **Core:** React 19, JavaScript, React Router DOM v7
- **Styling:** Tailwind CSS v4, Custom CSS Tokens (Light/Dark mode)
- **Animations & Physics:** Framer Motion v14, HTML5 Canvas 2D Spring Physics, CSS 3D Transforms
- **Icons:** Lucide React
- **Build Tooling:** Vite 8, Oxlint

### Professional Core Capabilities
- **Languages:** Python, JavaScript, TypeScript, SQL
- **Backend & APIs:** FastAPI, Flask, REST APIs, WebSockets, JWT, SQLAlchemy
- **Databases:** PostgreSQL, MongoDB, MinIO
- **AI & Industrial Tech:** Local LLM pipelines (Ollama, Qwen 2.5, Llama 3), RAG Context Engine, DAQ telemetry, RFID systems
- **DevOps:** Docker, Git, CI/CD, Linux

---

## 📂 Repository Structure

```text
Portfolio/
├── frontend/
│   ├── public/                # Static assets (Favicons, Resume PDF)
│   ├── src/
│   │   ├── assets/            # Project graphics and logos
│   │   ├── components/
│   │   │   ├── animations/    # Canvas physics, typewriter, cursor, counters
│   │   │   ├── common/        # Buttons, cards, badges, headings
│   │   │   ├── layout/        # Navbar, Footer, App Layout
│   │   │   ├── skills/        # 3D Fibonacci Skills Sphere & config
│   │   │   └── slider/        # Full page slider navigation
│   │   ├── context/           # Theme context (Light/Dark)
│   │   ├── data/              # Fact-checked resume & project data
│   │   ├── hooks/             # Custom hooks (motion, theme, scroll direction)
│   │   ├── pages/             # Home, About, Projects, Experience, Skills, Contact
│   │   └── routes/            # Application routing configuration
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** (or pnpm / yarn)

### Installation & Local Run

```bash
# 1. Clone repository
git clone https://github.com/Swamy3232/Portfolio.git
cd Portfolio/frontend

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

### Other Scripts

```bash
# Run Oxlint for static analysis
npm run lint

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📬 Connect With Me

- **Live Portfolio:** [swamyr.vercel.app](https://swamyr.vercel.app/)
- **GitHub:** [github.com/Swamy3232](https://github.com/Swamy3232)
- **LinkedIn:** [linkedin.com/in/swamy-r](https://linkedin.com/in/swamy-r)
- **Email:** [swamiaws85@gmail.com](mailto:swamiaws85@gmail.com)
- **Resume:** [Download Resume (PDF)](https://swamyr.vercel.app/SWAMY.pdf)

---

<div align="center">
  <sub>Designed and engineered by <b>Swamy R</b>. Built with React 19 & Tailwind CSS.</sub>
</div>
