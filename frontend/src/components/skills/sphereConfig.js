/**
 * ============================================================================
 * sphereConfig.js — Configuration & Mathematical Utilities for 3D Skills Sphere
 * ============================================================================
 */

/**
 * Verified Technical Skills List
 * Sourced directly from resume & production engineering stack.
 * Rendered as circular branded glass orbs orbiting in 3D.
 */
export const skills = [
  { id: 'react', name: 'React', category: 'Frontend UI', color: '#61dafb' },
  { id: 'typescript', name: 'TypeScript', category: 'Type Safety', color: '#3178C6' },
  { id: 'javascript', name: 'JavaScript', category: 'Core Web', color: '#F7DF1E' },
  { id: 'python', name: 'Python', category: 'Data & APIs', color: '#FFE873' },
  { id: 'fastapi', name: 'FastAPI', category: 'Backend Engine', color: '#05998B', miniLabel: 'FastAPI' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Relational DB', color: '#336791' },
  { id: 'docker', name: 'Docker', category: 'Containers', color: '#2496ED' },
  { id: 'nodejs', name: 'Node.js', category: 'Runtime', color: '#5FA04E' },
  { id: 'git', name: 'Git', category: 'Version Control', color: '#F05032' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Modern Styling', color: '#38BDF8' },
  { id: 'cicd', name: 'CI/CD', category: 'Automation', color: '#22d3ee', miniLabel: 'CI/CD' },
  { id: 'linux', name: 'Linux', category: 'OS & Servers', color: '#FFA500' },
  { id: 'websockets', name: 'WebSockets', category: 'Real-time Streams', color: '#22d3ee' },
  { id: 'restapi', name: 'REST APIs', category: 'HTTP Architecture', color: '#7c5cff', miniLabel: 'REST' }
];

/**
 * Centralized Sphere Configuration
 * All visual, physical, and behavioral parameters defined here.
 */
export const SPHERE_CONFIG = {
  radius: 175, // Desktop base radius in pixels (~350-400px sphere)
  rotationSpeed: 0.0022, // Base angular speed (radians per frame)
  dragInertia: 0.94, // Inertia decay factor upon drag release
  tiltStrength: 0.12, // Maximum cursor tilt angle in radians
  depthScaleRange: [0.72, 1.15], // Scale at furthest vs nearest depth
  hoverScale: 1.25, // Additional scale applied on hover/focus
  entranceDuration: 900, // Entrance animation duration in ms
  enableWireframe: true, // Display technical orbital rings & nodes
  enableCenterLabel: true, // Display glowing central </> emblem
  skills // List of skills
};

/**
 * Calculates uniform coordinates on a unit sphere using the Fibonacci sphere algorithm.
 * Guarantees balanced spacing without pole clustering or overlap.
 */
export function computeFibonacciPoints(count) {
  const points = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Golden angle ~2.39996323 rad

  for (let i = 0; i < count; i++) {
    // Evenly distributed y from +1 to -1
    const y = 1 - (i * 2 + 1) / count;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * goldenAngle;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    points.push({ x, y, z });
  }

  return points;
}
