import React from 'react';
import { FileText, ArrowUpRight, Activity, ShieldCheck, Cpu, Terminal, MapPin, ChevronDown } from 'lucide-react';
import FullPageSlider from '../components/slider/FullPageSlider';
import Section, { SectionItem } from '../components/slider/Section';
import SectionHeading from '../components/common/SectionHeading';
import ProjectCard from '../components/common/ProjectCard';
import Badge from '../components/common/Badge';
import { projects, personalInfo } from '../data/portfolioData';

const PROJECTS_SECTIONS = [
  { id: 'flagship', title: 'Flagship Systems' },
  { id: 'enterprise', title: 'Enterprise & IoT' },
  { id: 'architecture', title: 'Architecture Standards' }
];

const CURRENT_YEAR = new Date().getFullYear();

export default function ProjectsPage() {
  const flagshipProjects = projects.slice(0, 2);
  const enterpriseProjects = projects.slice(2, 5);

  return (
    <FullPageSlider sections={PROJECTS_SECTIONS}>
      {/* ===================================================================
          SLIDE 1: FLAGSHIP INDUSTRIAL TELEMETRY SYSTEMS
          =================================================================== */}
      <Section id="flagship" title="Flagship Systems" ariaLabel="Flagship Production Systems">
        <div className="space-y-3 my-auto max-w-5xl mx-auto w-full">
          <SectionItem>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-2.5">
              <SectionHeading
                as="h1"
                badge="Production Telemetry"
                title="Industrial Systems & Real-Time Analytics"
                description="High-frequency telemetry pipelines, vibration FFT analysis, and smart factory dashboards built for national manufacturing institutes."
                titleClassName="text-2xl sm:text-3xl font-bold font-heading text-primary tracking-tight leading-snug"
                descriptionClassName="text-xs sm:text-sm text-secondary max-w-2xl leading-normal"
              />
              <div className="flex items-center gap-1.5 shrink-0 self-start md:self-auto font-mono text-xs text-muted">
                <span>Slide 1 / 3</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              </div>
            </div>
          </SectionItem>

          {/* Architectural KPI Bar */}
          <SectionItem className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-2 sm:p-2.5 rounded-xl bg-surface border border-border">
            <div className="space-y-0.5">
              <div className="text-base sm:text-lg font-extrabold font-mono text-primary">5 Systems</div>
              <div className="text-[11px] sm:text-xs text-secondary font-medium">Production Deployed</div>
            </div>
            <div className="space-y-0.5 border-l border-border pl-3">
              <div className="text-base sm:text-lg font-extrabold font-mono text-primary">40+ Users</div>
              <div className="text-[11px] sm:text-xs text-secondary font-medium">Scientists & Admins</div>
            </div>
            <div className="space-y-0.5 border-l border-border pl-3">
              <div className="text-base sm:text-lg font-extrabold font-mono text-[#22d3ee]">&lt;15ms</div>
              <div className="text-[11px] sm:text-xs text-secondary font-medium">Telemetry Latency</div>
            </div>
            <div className="space-y-0.5 border-l border-border pl-3">
              <div className="text-base sm:text-lg font-extrabold font-mono text-[#10b981]">100%</div>
              <div className="text-[11px] sm:text-xs text-secondary font-medium">Grounded Schemas</div>
            </div>
          </SectionItem>

          {/* 2 Flagship Projects Grid */}
          <SectionItem className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {flagshipProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </SectionItem>
        </div>
      </Section>

      {/* ===================================================================
          SLIDE 2: ENTERPRISE OPERATIONS & SPATIAL HARDWARE TRACKING
          =================================================================== */}
      <Section id="enterprise" title="Enterprise & IoT" ariaLabel="Enterprise Operations and IoT Systems">
        <div className="space-y-3 my-auto max-w-6xl mx-auto w-full">
          <SectionItem>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-2.5">
              <SectionHeading
                badge="Operations & Hardware"
                title="Enterprise Workflows & Spatial RFID Tracking"
                description="Machine-hour audit ledgers, high-frequency RFID asset tracking, and full-stack commercial financial platforms."
                titleClassName="text-2xl sm:text-3xl font-bold font-heading text-primary tracking-tight leading-snug"
                descriptionClassName="text-xs sm:text-sm text-secondary max-w-2xl leading-normal"
              />
              <div className="text-xs font-mono text-muted shrink-0 self-start md:self-auto">
                Slide 2 / 3
              </div>
            </div>
          </SectionItem>

          {/* 3 Enterprise Projects Grid */}
          <SectionItem className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {enterpriseProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </SectionItem>
        </div>
      </Section>

      {/* ===================================================================
          SLIDE 3: ARCHITECTURAL BLUEPRINT & PROVENANCE (with integrated footer)
          =================================================================== */}
      <Section id="architecture" title="Architecture Standards" ariaLabel="Architecture Standards and Verification" contentClassName="justify-between">
        <div className="space-y-3 max-w-5xl mx-auto w-full my-auto">
          <SectionItem>
            <SectionHeading
              badge="Architecture Blueprint"
              title="Engineering Standards Across All Systems"
              description="Core technical standards engineered across all institutional and enterprise deployments."
              titleClassName="text-2xl sm:text-3xl font-bold font-heading text-primary tracking-tight leading-snug"
              descriptionClassName="text-xs sm:text-sm text-secondary max-w-2xl leading-normal"
            />
          </SectionItem>

          {/* 4 Architecture Pillars */}
          <SectionItem className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3 sm:p-3.5 rounded-xl bg-surface border border-border space-y-1.5">
              <div className="flex items-center gap-2 text-primary font-heading font-semibold text-xs sm:text-sm">
                <Activity className="w-4 h-4 text-[#22d3ee]" />
                <span>Real-Time Telemetry</span>
              </div>
              <p className="text-[11px] sm:text-xs text-secondary leading-relaxed">
                Persistent WebSockets with automatic reconnection, buffered streams, and sub-second FFT/RMS vibration analysis.
              </p>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl bg-surface border border-border space-y-1.5">
              <div className="flex items-center gap-2 text-primary font-heading font-semibold text-xs sm:text-sm">
                <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                <span>Role-Based Security</span>
              </div>
              <p className="text-[11px] sm:text-xs text-secondary leading-relaxed">
                Granular JWT authentication securing multi-tenant operations across Directors, Scientists, Admins, and Operators.
              </p>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl bg-surface border border-border space-y-1.5">
              <div className="flex items-center gap-2 text-primary font-heading font-semibold text-xs sm:text-sm">
                <Terminal className="w-4 h-4 text-[#7c5cff]" />
                <span>Async Backend</span>
              </div>
              <p className="text-[11px] sm:text-xs text-secondary leading-relaxed">
                Non-blocking FastAPI and PostgreSQL relational engines with Alembic migrations and MinIO unstructured storage.
              </p>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl bg-surface border border-border space-y-1.5">
              <div className="flex items-center gap-2 text-primary font-heading font-semibold text-xs sm:text-sm">
                <Cpu className="w-4 h-4 text-primary" />
                <span>Hardware Protocols</span>
              </div>
              <p className="text-[11px] sm:text-xs text-secondary leading-relaxed">
                Hardware protocol binding with OROS DAQ, NV Gate systems, and high-frequency RFID transceivers for spatial audit.
              </p>
            </div>
          </SectionItem>

          {/* Provenance Notice */}
          <SectionItem>
            <div className="p-3.5 sm:p-4 rounded-xl bg-surface border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-secondary">
              <div className="flex items-start sm:items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#22d3ee] shrink-0 mt-0.5 sm:mt-0" />
                <span className="leading-relaxed text-[11px] sm:text-xs">
                  All systems listed above were engineered for production institutions (CMTI, NIAMT, SMMDC) and independent commercial clients (KLS Mart). In accordance with institutional confidentiality, proprietary code is not published to public repositories.
                </span>
              </div>
              <a
                href={personalInfo.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline shrink-0 link-draw-underline text-xs"
              >
                <FileText className="w-3.5 h-3.5 text-primary" />
                <span>Verify in Resume (PDF)</span>
                <ArrowUpRight className="w-3 h-3 text-muted" />
              </a>
            </div>
          </SectionItem>
        </div>

        {/* Integrated Sub-bar Footer */}
        <SectionItem className="pt-4 border-t border-border mt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted max-w-5xl mx-auto w-full">
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
