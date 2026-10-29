# Swamy R — Full Stack Developer Portfolio

A production-grade, strictly monochrome developer portfolio built with **React 19**, **Vite 8**, **Tailwind CSS v4**, and **Framer Motion**, inspired by the clean editorial aesthetics of Vercel, Linear, and Apple. Features an interactive 3D Fibonacci Skills Sphere, responsive canvas physics dot grid, View Transitions circular theme reveal, and comprehensive accessibility.

---

## 🚀 Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + Strict Monochrome CSS Design Tokens
- **3D Interface**: CSS 3D Transforms + Hardware-Accelerated `requestAnimationFrame`
- **Routing**: React Router DOM v7
- **Animations**: Framer Motion v14 + HTML5 Canvas 2D Spring Physics
- **Icons**: Lucide React
- **Code Quality**: Oxlint (0 warnings, 0 errors)

---

## 🌐 3D Interactive Skills Sphere (`SkillsSphere.jsx`)

The hero section features a fully functional, interactive 3D skills sphere built without external 3D libraries (no Three.js or WebGL), utilizing pure CSS 3D transforms, hardware-accelerated direct DOM mutations, and smooth spring physics.

### Architecture & Layout
- **Hero Placement**: Two-column layout with the **Interactive 3D Skills Sphere on the left** and **all portfolio information (badges, headline, subtitle, summary, CTAs) on the right**, naturally left-aligned (`text-left`).
- **Mathematical Uniformity**: Distributed evenly over a unit sphere using the **Fibonacci sphere algorithm**, guaranteeing balanced spacing with no clustering or overlapping labels.
- **Hardware Acceleration**: The 60/120fps RAF loop mutates only `transform`, `opacity`, and `zIndex` directly on DOM nodes via refs, eliminating React reconciliation re-renders during rotation.
- **Concentric Coordinate System**: SVG wireframe latitude/longitude rings, center branding monogram (`SR • Stack`), and Fibonacci skills pills share a unified center origin.

### Centralized Configuration (`src/components/skills/sphereConfig.js`)

All visual, physical, and behavioral parameters are centralized in `SPHERE_CONFIG`:

```javascript
export const SPHERE_CONFIG = {
  radius: 190,                   // Base desktop radius in px (~380-420px diameter)
  rotationSpeed: 0.002,          // Base angular velocity (radians per frame)
  dragInertia: 0.94,             // Momentum damping factor on release (0.0 - 1.0)
  skills: [
    'React', 'TypeScript', 'JavaScript', 'Python', 'FastAPI',
    'PostgreSQL', 'Docker', 'Git', 'REST APIs', 'WebSockets',
    'CI/CD', 'Tailwind CSS', 'Node.js', 'Linux'
  ],
  depthScaleRange: [0.72, 1.12], // Scale at furthest back vs nearest front
  hoverScale: 1.2,               // Additional scale multiplier on hover/focus
  tiltStrength: 0.12,            // Maximum pointer-driven tilt angle (radians)
  entranceDuration: 900,         // Staggered entrance animation duration (ms)
  enableWireframe: true,         // Display faint CAD latitude/longitude guides
  enableCenterLabel: true        // Display subtle center brand monogram badge
};
```

### Customization Instructions

- **Add or Remove Skills**: Edit the `skills` array in `src/components/skills/sphereConfig.js`. Fibonacci coordinates automatically adapt to any skill count.
- **Adjust Sphere Size**: Change `radius` in `SPHERE_CONFIG` (e.g., `180` for slightly smaller, `210` for larger). Mobile responsiveness is handled dynamically.
- **Adjust Rotation Speed**: Change `rotationSpeed` (e.g. `0.001` for slower, `0.0035` for faster).
- **Adjust Drag Inertia**: Modify `dragInertia` (higher values like `0.96` glide longer; lower values like `0.88` brake faster).
- **Toggle Wireframe / Center Badge**: Set `enableWireframe: false` or `enableCenterLabel: false`.

### Accessibility & Screen Readers
- The visual 3D sphere is marked `aria-hidden="true"` to prevent screen reader clutter during continuous rotation.
- An off-screen semantic list `<div className="sr-only"><ul>...</ul></div>` provides assistive technology with a clean, unrepeated catalog of all technical skills.
- Keyboard users can tab into individual skill pills (`tabIndex={0}`) to inspect each technology; focusing pauses rotation and elevates the skill to the front.

---

## 🎨 Strict Monochrome Design System

The portfolio enforces a strict black-and-white / grayscale design system with zero colored accents, colorful glows, or gradient shapes.

### Light Theme (`:root`)
- **Background**: `#FAFAFA`
- **Surface**: `#FFFFFF` / Surface Muted: `#F5F5F5`
- **Text**: `#0A0A0A`
- **Muted Text**: `#525252`
- **Border**: `#E5E5E5`
- **Buttons**: Black background (`#0A0A0A`) with White text (`#FFFFFF`)

### Dark Theme (`.dark`)
- **Background**: `#0A0A0A`
- **Surface**: `#111111` / Surface Muted: `#171717`
- **Text**: `#FAFAFA`
- **Muted Text**: `#A3A3A3`
- **Border**: `#262626`
- **Buttons**: White background (`#FAFAFA`) with Black text (`#0A0A0A`)

### Permitted Non-Monochrome Accents
The only permitted non-monochrome colors are:
1. **Status Indicator Dot**: Tiny pulsing green dot (`--success: #15803D` in light, `#4ADE80` in dark) on "Open for Roles".
2. **Form Validation Feedback**: Accessible green (`--success`) and red (`--error: #B91C1C` / `#F87171`) messages on the contact form.

### Editorial Noise Grain (`.grain-overlay`)
A 3.5% opacity pure SVG turbulence noise data-URI is rendered in a fixed pointer-events-none layer, adding tactile depth without extra image dependencies or layout shifts.

---

## 🕹️ Interactive Canvas Dotted Background (`InteractiveDotGrid`)

Custom 60fps HTML5 Canvas 2D spring physics background (`src/components/animations/InteractiveDotGrid.jsx`):
- Reacts to pointer movement within a 150px influence field.
- Uses theme tokens (`--dot-color`, `--dot-glow`).
- Features a radial mask to prevent text interference.
- Fully pauses when offscreen or tab is hidden.

---

## ♿ Accessibility & Reduced Motion

The portfolio fully respects `prefers-reduced-motion: reduce`:
- **3D Skills Sphere**: Auto-rotation, cursor tilt, inertia, and flying entrance animations are disabled; skills are displayed in a clean, stable 3D arrangement.
- **Canvas Dot Grid**: Renders once statically; disables all animation loops and ripple physics.
- **Custom Cursor & 3D Tilt**: Disabled automatically.
- **Theme Transitions**: Seamless immediate toggle without circular clip-path expansion.

---

## 🛠️ Development & Build Commands

```bash
# Install dependencies
npm install

# Start local development server (Vite)
npm run dev

# Run Oxlint (0 warnings, 0 errors)
npm run lint

# Compile production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🚀 Deployment Instructions

### Vercel Deployment
1. Install Vercel CLI: `npm i -g vercel` or link your GitHub repository on [vercel.com](https://vercel.com).
2. Set Root Directory to `frontend`.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Single Page Application (SPA) routing is supported automatically.

### Netlify Deployment
1. Link your repository on [netlify.com](https://netlify.com).
2. Base directory: `frontend`
3. Build command: `npm run build`
4. Publish directory: `frontend/dist`
5. Add a `_redirects` file in `public/` containing: `/* /index.html 200` for client-side routing.
