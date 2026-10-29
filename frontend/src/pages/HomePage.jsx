import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Download,
  Mail,
  Terminal,
  Layers,
  Cpu,
  CheckCircle2,
  MapPin,
  Phone,
  ArrowUpRight,
  ChevronDown
} from 'lucide-react';
import FullPageSlider from '../components/slider/FullPageSlider';
import Section, { SectionItem } from '../components/slider/Section';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import SectionHeading from '../components/common/SectionHeading';
import ProjectCard from '../components/common/ProjectCard';
import SkillTag from '../components/common/SkillTag';
import AnimatedCounter from '../components/animations/AnimatedCounter';
import TypewriterRole from '../components/animations/TypewriterRole';
import TechMarquee from '../components/animations/TechMarquee';
import SkillsSphere from '../components/skills/SkillsSphere';
import { personalInfo, coreSkills, projects, professionalExperience } from '../data/portfolioData';

function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

const CURRENT_YEAR = new Date().getFullYear();

const HOME_SECTIONS = [
  { id: 'hero', title: 'Hero' },
  { id: 'about', title: 'About' },
  { id: 'skills', title: 'Tech Stack' },
  { id: 'projects', title: 'Projects' },
  { id: 'experience', title: 'Experience' },
  { id: 'contact', title: 'Contact' }
];

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const primaryExperience = professionalExperience[0];

  return (
    <FullPageSlider sections={HOME_SECTIONS}>
      {/* ===================================================================
          1. HERO SECTION
          =================================================================== */}
      <Section id="hero" title="Hero" ariaLabel="Hero Introduction">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 my-auto">
          {/* Top Badges */}
          <SectionItem className="flex flex-wrap items-center justify-center gap-2.5">
            <Badge variant="outline" size="md">
              <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
              <span className="text-primary font-medium">Open for Software Developer Roles</span>
            </Badge>
            <Badge variant="outline" size="md">
              <span className="font-mono">Bengaluru, India</span>
            </Badge>
            <Badge variant="outline" size="md">
              <span className="font-mono">{personalInfo.yearsOfExperience} Hands-on</span>
            </Badge>
          </SectionItem>

          {/* Main Headline */}
          <SectionItem className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-heading text-primary tracking-tighter leading-[1.05]">
              Building reliable full-stack applications with{' '}
              <span className="bg-gradient-to-r from-[var(--sphere-accent-violet,#7c5cff)] to-[var(--sphere-accent-cyan,#22d3ee)] bg-clip-text text-transparent">
                React & Python.
              </span>
            </h1>

            {/* Typewriter Subtitle */}
            <div className="text-lg sm:text-2xl text-secondary font-medium font-heading flex flex-wrap items-center justify-center gap-2 pt-1">
              <span>{personalInfo.name} — Full Stack</span>
              <TypewriterRole />
              <span className="text-muted font-normal text-sm sm:text-base hidden sm:inline">
                • Industrial & Enterprise Systems
              </span>
            </div>
          </SectionItem>

          {/* Summary Paragraph */}
          <SectionItem>
            <p className="text-base sm:text-lg text-secondary leading-relaxed max-w-2xl mx-auto">
              {personalInfo.summary}
            </p>
          </SectionItem>

          {/* Action Buttons */}
          <SectionItem className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button to="/projects" variant="primary" size="lg" icon={ArrowRight} iconPosition="right" magnetic={true}>
              View Projects
            </Button>
            <Button to="/contact" variant="secondary" size="lg" icon={Mail} iconPosition="left" magnetic={true}>
              Contact Me
            </Button>
            <Button href={personalInfo.resumePath} variant="outline" size="lg" icon={Download} iconPosition="left" magnetic={true}>
              Download Resume
            </Button>
          </SectionItem>
        </div>
      </Section>

      {/* ===================================================================
          2. ABOUT & HIGHLIGHTS SECTION
          =================================================================== */}
      <Section id="about" title="About" ariaLabel="About and Engineering Philosophy">
        <div className="space-y-8 my-auto max-w-6xl mx-auto w-full">
          <SectionItem>
            <SectionHeading
              badge="Engineering Philosophy"
              title="Architecting Systems Built for Reliability"
              description="Focusing on performant React frontends, low-latency FastAPI backends, and robust real-time communication patterns for mission-critical operations."
            />
          </SectionItem>

          <SectionItem>
            <p className="text-base sm:text-lg text-secondary leading-relaxed max-w-3xl">
              I am a Software Developer at the Central Manufacturing Technology Institute (CMTI),
              specializing in building full-stack industrial telemetry suites, multi-tenant portal systems,
              and local LLM inference engines with RAG database grounding.
            </p>
          </SectionItem>

          {/* Highlight Cards Grid with Animated Counters */}
          <SectionItem className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-2">
            <Card padding="normal" className="flex flex-col justify-between h-full bg-surface border-border">
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-primary tracking-tight">
                  <AnimatedCounter target={2} suffix="+ Years" />
                </div>
                <h3 className="mt-2 text-base font-semibold text-primary font-heading">
                  Hands-on Experience
                </h3>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-secondary">
                Production-grade React & FastAPI architectures
              </p>
            </Card>

            <Card padding="normal" className="flex flex-col justify-between h-full bg-surface border-border">
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-primary tracking-tight">
                  <AnimatedCounter target={40} suffix="+ Users" />
                </div>
                <h3 className="mt-2 text-base font-semibold text-primary font-heading">
                  Enterprise Scale
                </h3>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-secondary">
                Scientists, admins & directors on live PPM system
              </p>
            </Card>

            <Card padding="normal" className="flex flex-col justify-between h-full bg-surface border-border">
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-primary tracking-tight">
                  Real-time
                </div>
                <h3 className="mt-2 text-base font-semibold text-primary font-heading">
                  Telemetry & WebSockets
                </h3>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-secondary">
                Vibration FFT/RMS analysis & hardware sensor feeds
              </p>
            </Card>

            <Card padding="normal" className="flex flex-col justify-between h-full bg-surface border-border">
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-primary tracking-tight">
                  Local AI & RAG
                </div>
                <h3 className="mt-2 text-base font-semibold text-primary font-heading">
                  LLM Engineering
                </h3>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-secondary">
                Ollama Qwen/Llama with ContextBuilder database grounding
              </p>
            </Card>
          </SectionItem>

          <SectionItem className="pt-2 flex items-center justify-between flex-wrap gap-4">
            <Link to="/about" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1.5 link-draw-underline">
              <span>Read complete biography & education</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </SectionItem>
        </div>
      </Section>

      {/* ===================================================================
          3. TECH STACK SECTION
          =================================================================== */}
      <Section id="skills" title="Tech Stack" ariaLabel="Core Technologies and Engineering Stack">
        {({ isActive }) => (
          <div className="space-y-6 sm:space-y-8 my-auto max-w-6xl mx-auto w-full">
            <SectionItem>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <SectionHeading
                  badge="Technical Ecosystem"
                  title="Core Technologies & Engineering Stack"
                  description="Production-tested languages, asynchronous APIs, and real-time frameworks leveraged to engineer high-throughput telemetry and enterprise platforms."
                />
                <Button to="/skills" variant="outline" size="md" icon={ArrowRight} iconPosition="right" className="shrink-0 self-start md:self-auto">
                  Full Skill Breakdown
                </Button>
              </div>
            </SectionItem>

            {/* Side-by-Side: 3D Skills Sphere and Skill Categories */}
            <SectionItem className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Interactive 3D Sphere (isActive pauses rendering when section is not in focus) */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <SkillsSphere isActive={isActive} />
                <span className="text-[11px] font-mono text-muted tracking-wider uppercase mt-1 select-none opacity-60">
                  Drag to rotate • Hover to inspect
                </span>
              </div>

              {/* Competency Snapshot Cards */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Frontend */}
                <Card padding="normal" className="space-y-3 bg-surface border-border">
                  <div className="flex items-center gap-2 text-primary font-heading font-semibold text-sm">
                    <Layers className="w-4 h-4 text-[var(--sphere-accent-cyan,#22d3ee)]" />
                    <span>Frontend Engineering</span>
                  </div>
                  <p className="text-xs text-secondary leading-relaxed">
                    React 19, TypeScript, Vite, Tailwind CSS, hardware-accelerated 3D transforms.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {coreSkills.frontend.slice(0, 5).map((skill) => (
                      <SkillTag key={skill} name={skill} />
                    ))}
                  </div>
                </Card>

                {/* Backend */}
                <Card padding="normal" className="space-y-3 bg-surface border-border">
                  <div className="flex items-center gap-2 text-primary font-heading font-semibold text-sm">
                    <Terminal className="w-4 h-4 text-[var(--sphere-accent-violet,#7c5cff)]" />
                    <span>Backend & Databases</span>
                  </div>
                  <p className="text-xs text-secondary leading-relaxed">
                    FastAPI, Python, PostgreSQL, WebSockets, SQLAlchemy, Docker, REST APIs.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {coreSkills.backend.slice(0, 5).map((skill) => (
                      <SkillTag key={skill} name={skill} />
                    ))}
                  </div>
                </Card>

                {/* AI & Telemetry */}
                <Card padding="normal" className="space-y-3 bg-surface border-border sm:col-span-2">
                  <div className="flex items-center gap-2 text-primary font-heading font-semibold text-sm">
                    <Cpu className="w-4 h-4 text-primary" />
                    <span>AI Engineering & Industrial Telemetry</span>
                  </div>
                  <p className="text-xs text-secondary leading-relaxed">
                    Private LLMs (Ollama Qwen/Llama), RAG context engines, real-time industrial FFT vibration monitoring, role-based workflows.
                  </p>
                </Card>
              </div>
            </SectionItem>

            {/* Infinite Tech Ticker */}
            <SectionItem className="pt-2">
              <TechMarquee />
            </SectionItem>
          </div>
        )}
      </Section>

      {/* ===================================================================
          4. FEATURED PROJECTS SECTION
          =================================================================== */}
      <Section id="projects" title="Projects" ariaLabel="Selected Engineering Projects">
        <div className="space-y-8 my-auto max-w-6xl mx-auto w-full">
          <SectionItem>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <SectionHeading
                badge="Selected Projects"
                title="Real-World Systems & Architectures"
                description="High-frequency telemetry, role-based enterprise workflows, and full-stack solutions built for industrial monitoring and production environments."
              />
              <Button to="/projects" variant="outline" size="md" icon={ArrowRight} iconPosition="right" className="shrink-0 self-start md:self-auto">
                All 5 Projects
              </Button>
            </div>
          </SectionItem>

          {/* Project Cards Grid */}
          <SectionItem className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </SectionItem>
        </div>
      </Section>

      {/* ===================================================================
          5. EXPERIENCE SECTION
          =================================================================== */}
      <Section id="experience" title="Experience" ariaLabel="Professional Milestones & Industry Impact">
        <div className="space-y-8 my-auto max-w-5xl mx-auto w-full">
          <SectionItem>
            <SectionHeading
              badge="Career Track"
              title="Professional Milestones & Industry Impact"
              description="Engineering production-grade telemetry applications and enterprise scientific workflows at national manufacturing institutes."
            />
          </SectionItem>

          <SectionItem>
            <Card padding="spacious" className="space-y-6 bg-surface border-border">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
                <div>
                  <Badge variant="outline" size="sm" className="mb-2">Current Role</Badge>
                  <h3 className="text-2xl sm:text-3xl font-bold text-primary font-heading">
                    {primaryExperience.role}
                  </h3>
                  <p className="text-sm sm:text-base text-secondary font-medium mt-1">
                    {primaryExperience.organization} — {primaryExperience.location}
                  </p>
                </div>
                <Badge variant="outline" size="md" className="self-start md:self-auto font-mono">
                  {primaryExperience.period}
                </Badge>
              </div>

              <p className="text-sm sm:text-base text-secondary leading-relaxed">
                {primaryExperience.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {primaryExperience.highlights.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-surface-muted/60 border border-border space-y-2">
                    <div className="flex items-center gap-2 text-primary font-heading font-semibold text-sm">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-muted" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-xs text-secondary leading-relaxed line-clamp-3">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between flex-wrap gap-4">
                <Link to="/experience" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1.5 link-draw-underline">
                  <span>View all experience milestones</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/about" className="text-sm font-medium text-secondary hover:text-primary transition-colors">
                  Read full background & education →
                </Link>
              </div>
            </Card>
          </SectionItem>
        </div>
      </Section>

      {/* ===================================================================
          6. CONTACT & CONNECT SECTION (with integrated footer)
          =================================================================== */}
      <Section id="contact" title="Contact" ariaLabel="Contact and Collaboration" contentClassName="justify-between">
        <div className="space-y-8 max-w-4xl mx-auto w-full my-auto">
          <SectionItem className="text-center space-y-3">
            <h2 className="text-3xl sm:text-5xl font-bold font-heading text-primary tracking-tight">
              Ready to collaborate on your next system?
            </h2>
            <p className="text-base sm:text-lg text-secondary max-w-xl mx-auto">
              Available for full-time Software Developer roles and engineering opportunities in Bengaluru and remote setups.
            </p>
          </SectionItem>

          {/* Quick Contact Info Cards */}
          <SectionItem className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-4 rounded-xl bg-surface border border-border hover:border-primary transition-all text-center space-y-2 group"
            >
              <Mail className="w-5 h-5 mx-auto text-muted group-hover:text-primary transition-colors" />
              <div className="text-xs font-mono text-muted uppercase">Email</div>
              <div className="text-sm font-semibold text-primary truncate">{personalInfo.email}</div>
            </a>

            <a
              href={`tel:${personalInfo.phone.replace(/[^0-9+]/g, '')}`}
              className="p-4 rounded-xl bg-surface border border-border hover:border-primary transition-all text-center space-y-2 group"
            >
              <Phone className="w-5 h-5 mx-auto text-muted group-hover:text-primary transition-colors" />
              <div className="text-xs font-mono text-muted uppercase">Phone</div>
              <div className="text-sm font-semibold text-primary">{personalInfo.phone}</div>
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-surface border border-border hover:border-primary transition-all text-center space-y-2 group"
            >
              <LinkedinIcon className="w-5 h-5 mx-auto text-muted group-hover:text-primary transition-colors" />
              <div className="text-xs font-mono text-muted uppercase">LinkedIn</div>
              <div className="text-sm font-semibold text-primary inline-flex items-center gap-1">
                <span>Connect</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </a>
          </SectionItem>

          {/* Direct CTA Buttons */}
          <SectionItem className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button to="/contact" variant="primary" size="lg" icon={Mail} iconPosition="left" magnetic={true}>
              Open Contact Form
            </Button>
            <Button href={personalInfo.resumePath} variant="outline" size="lg" icon={Download} iconPosition="left" magnetic={true}>
              Download Resume (PDF)
            </Button>
          </SectionItem>
        </div>

        {/* Integrated Sub-bar Footer */}
        <SectionItem className="pt-8 border-t border-border mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted max-w-5xl mx-auto w-full">
            <div className="flex items-center gap-2">
              <span className="font-bold text-primary">{personalInfo.name}</span>
              <span>• Full-Stack Engineer</span>
            </div>
            <p>© {CURRENT_YEAR} All rights reserved.</p>
            <div className="flex items-center gap-4">
              <MapPin className="w-3.5 h-3.5 text-muted" />
              <span>{personalInfo.location}</span>
            </div>
          </div>
        </SectionItem>
      </Section>
    </FullPageSlider>
  );
}
