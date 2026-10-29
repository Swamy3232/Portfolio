import React, { useState, useRef } from 'react';
import { Activity, Layers, Cpu, ShieldCheck, ChevronDown, ChevronUp, CheckCircle2, FileText, ArrowUpRight, Radio, Server, Database, GitBranch } from 'lucide-react';
import Card from './Card';
import Badge from './Badge';
import ProjectBanner from './ProjectBanner';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // 3D Tilt calculation without causing React state updates/re-renders
  const handlePointerMove = (e) => {
    if (
      prefersReducedMotion ||
      !cardRef.current ||
      window.matchMedia('(pointer: coarse)').matches
    )
      return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Max 6 degrees tilt, subtle GPU-friendly transform
    cardRef.current.style.transform = `perspective(1000px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
  };

  const handlePointerEnter = () => {
    if (!cardRef.current || prefersReducedMotion) return;
    cardRef.current.style.transition = 'transform 0.12s ease-out, border-color 0.25s ease, box-shadow 0.25s ease';
  };

  const handlePointerLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.25s ease, box-shadow 0.25s ease';
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  const getCategoryIcon = (category) => {
    if (category.includes('IoT') || category.includes('Vibration') || category.includes('Hardware')) {
      return <Activity className="w-3.5 h-3.5 text-[#22d3ee]" />;
    }
    if (category.includes('Dashboard')) {
      return <Layers className="w-3.5 h-3.5 text-[#7c5cff]" />;
    }
    if (category.includes('Hardware') || category.includes('RFID')) {
      return <Cpu className="w-3.5 h-3.5 text-[#22d3ee]" />;
    }
    return <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />;
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className="will-change-transform h-full project-card group"
    >
      <Card
        padding="none"
        className="flex flex-col justify-between h-full border border-border transition-all duration-300 hover:border-text/40 hover:shadow-lg overflow-hidden bg-surface rounded-2xl"
      >
        <div>
          {/* Visual Header with Real Telemetry Graphic */}
          <div className="relative overflow-hidden bg-surface-muted border-b border-border w-full aspect-[440/220] max-h-[175px] flex items-center justify-center">
            <div className="transition-transform duration-500 ease-out group-hover:scale-[1.02] w-full h-full flex items-center justify-center">
              <ProjectBanner projectId={project.id} title={project.title} />
            </div>
          </div>

          <div className="p-3.5 sm:p-4 space-y-2">
            {/* Category & Status Badges */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted font-heading">
                {getCategoryIcon(project.category)}
                <span>{project.category}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                  Active
                </span>
                {project.featured && (
                  <Badge variant="accent" size="sm">
                    Featured
                  </Badge>
                )}
                <Badge variant="outline" size="sm">
                  Verified
                </Badge>
              </div>
            </div>

            {/* Project Title */}
            <h3 className="text-base sm:text-lg font-bold text-primary font-heading tracking-tight transition-colors flex items-center justify-between gap-2">
              <span className="group-hover:text-primary transition-colors">{project.title}</span>
              <ArrowUpRight className="w-4 h-4 opacity-40 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-primary shrink-0" />
            </h3>

            {/* Description */}
            <p className="text-xs text-secondary leading-relaxed line-clamp-2">
              {project.description}
            </p>

            {/* Technical Highlights Accordion / Toggle */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="pt-0.5">
                <button
                  type="button"
                  onClick={() => setExpanded(!expanded)}
                  aria-expanded={expanded}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-surface-muted/70 hover:bg-surface-muted text-[11px] font-semibold text-primary transition-colors cursor-pointer border border-border/80"
                >
                  <span className="flex items-center gap-2">
                    <Radio className="w-3 h-3 text-muted" />
                    <span>{expanded ? 'Hide Implementation' : 'View Architecture & Highlights'}</span>
                  </span>
                  {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {expanded && (
                  <ul className="mt-2 space-y-1.5 p-2.5 rounded-lg bg-surface-muted/90 border border-border text-[11px] text-secondary leading-relaxed animate-in fade-in duration-200 font-sans">
                    {project.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-[#10b981] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tech Stack Tags & Footer */}
        <div className="p-3.5 sm:p-4 pt-0 space-y-2.5">
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-surface-muted text-secondary border border-border hover:border-text/30 hover:text-primary transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-secondary pt-1">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-muted/60" />
              <span>CMTI / Production Deployed</span>
            </span>
            <a
              href="/SWAMY.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline font-semibold text-[11px] link-draw-underline"
              title="Read detailed implementation in verified resume"
            >
              <FileText className="w-3.5 h-3.5 text-primary" />
              <span>Resume Record</span>
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
