import React from 'react';
import { Layers, Terminal, Database, Cpu, BarChart3, Cloud, GitBranch, Settings, Code, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FullPageSlider from '../components/slider/FullPageSlider';
import Section, { SectionItem } from '../components/slider/Section';
import SectionHeading from '../components/common/SectionHeading';
import Card from '../components/common/Card';
import SkillTag from '../components/common/SkillTag';
import Button from '../components/common/Button';
import { coreSkills, personalInfo } from '../data/portfolioData';

const SKILLS_SECTIONS = [
  { id: 'core-stack', title: 'Core Stack & APIs' },
  { id: 'data-ai', title: 'Data, AI & Telemetry' },
  { id: 'devops-concepts', title: 'DevOps & Architecture' }
];

const CURRENT_YEAR = new Date().getFullYear();

export default function SkillsPage() {
  return (
    <FullPageSlider sections={SKILLS_SECTIONS}>
      {/* ===================================================================
          SLIDE 1: CORE PROGRAMMING, FRONTEND & BACKEND APIS
          =================================================================== */}
      <Section id="core-stack" title="Core Stack & APIs" ariaLabel="Core Programming Languages and Frameworks">
        <div className="space-y-6 my-auto max-w-6xl mx-auto w-full">
          <SectionItem>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <SectionHeading
                badge="Engineering Stack"
                title="Languages, Client UI & Asynchronous APIs"
                description="Core languages and modern web frameworks used for mission-critical client interfaces and high-throughput backend services."
              />
              <Link to="/#skills" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline shrink-0 self-start md:self-auto">
                <span>View Interactive 3D Sphere</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </SectionItem>

          <SectionItem className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. Programming Languages */}
            <Card padding="normal" className="space-y-3 bg-surface border-border flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary font-heading font-semibold text-sm">
                  <Code className="w-4 h-4 text-[#22d3ee]" />
                  <span>Programming Languages</span>
                </div>
                <p className="text-xs text-secondary mt-1.5 leading-relaxed">
                  Primary languages used for low-latency systems, scripting, algorithms, and application logic.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {coreSkills.languages.map((l) => (
                  <SkillTag key={l.name} name={`${l.name} (${l.level})`} />
                ))}
              </div>
            </Card>

            {/* 2. Frontend Frameworks & UI */}
            <Card padding="normal" className="space-y-3 bg-surface border-border flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary font-heading font-semibold text-sm">
                  <Layers className="w-4 h-4 text-[#7c5cff]" />
                  <span>Frontend Engineering</span>
                </div>
                <p className="text-xs text-secondary mt-1.5 leading-relaxed">
                  Component hierarchy, state management, GPU transforms, and responsive styling systems.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {coreSkills.frontend.map((s) => (
                  <SkillTag key={s} name={s} />
                ))}
              </div>
            </Card>

            {/* 3. Backend, APIs & Protocols */}
            <Card padding="normal" className="space-y-3 bg-surface border-border flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary font-heading font-semibold text-sm">
                  <Terminal className="w-4 h-4 text-primary" />
                  <span>Backend & Asynchronous APIs</span>
                </div>
                <p className="text-xs text-secondary mt-1.5 leading-relaxed">
                  High-throughput async APIs, WebSocket pipelines, and JWT authentication engines.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {coreSkills.backend.map((s) => (
                  <SkillTag key={s} name={s} />
                ))}
              </div>
            </Card>
          </SectionItem>
        </div>
      </Section>

      {/* ===================================================================
          SLIDE 2: DATABASES, AI/LLM & TELEMETRY REPORTING
          =================================================================== */}
      <Section id="data-ai" title="Data, AI & Telemetry" ariaLabel="Databases, AI Pipelines and Telemetry Reporting">
        <div className="space-y-6 my-auto max-w-6xl mx-auto w-full">
          <SectionItem>
            <SectionHeading
              badge="Data & Intelligence"
              title="Databases, Private LLM Pipelines & Telemetry"
              description="Relational database modeling, local LLM context engines with RAG, and industrial FFT signal charts."
            />
          </SectionItem>

          <SectionItem className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 4. Databases & Object Storage */}
            <Card padding="normal" className="space-y-3 bg-surface border-border flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary font-heading font-semibold text-sm">
                  <Database className="w-4 h-4 text-[#22d3ee]" />
                  <span>Databases & Storage</span>
                </div>
                <p className="text-xs text-secondary mt-1.5 leading-relaxed">
                  Normalized relational schemas, Alembic migrations, and S3-compatible MinIO object storage.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {coreSkills.databasesAndStorage.map((s) => (
                  <SkillTag key={s} name={s} />
                ))}
              </div>
            </Card>

            {/* 5. AI, LLM & Prompt Engineering */}
            <Card padding="normal" className="space-y-3 bg-surface border-border flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary font-heading font-semibold text-sm">
                  <Cpu className="w-4 h-4 text-[#7c5cff]" />
                  <span>AI, LLM & RAG Context</span>
                </div>
                <p className="text-xs text-secondary mt-1.5 leading-relaxed">
                  Local private LLM pipelines (Ollama Qwen/Llama) grounded with relational data context builders.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {coreSkills.aiAndLlm.map((s) => (
                  <SkillTag key={s} name={s} />
                ))}
              </div>
            </Card>

            {/* 6. Visualization & Telemetry */}
            <Card padding="normal" className="space-y-3 bg-surface border-border flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary font-heading font-semibold text-sm">
                  <BarChart3 className="w-4 h-4 text-[#10b981]" />
                  <span>Telemetry Visualization</span>
                </div>
                <p className="text-xs text-secondary mt-1.5 leading-relaxed">
                  Real-time vibration spectral FFT charting, responsive Plotly gauges, and automated PDF reporting.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {coreSkills.visualizationAndReporting.map((s) => (
                  <SkillTag key={s} name={s} />
                ))}
              </div>
            </Card>
          </SectionItem>
        </div>
      </Section>

      {/* ===================================================================
          SLIDE 3: CLOUD, DEVOPS & CORE CONCEPTS (with integrated footer)
          =================================================================== */}
      <Section id="devops-concepts" title="DevOps & Architecture" ariaLabel="Cloud, DevOps and Core Architectural Concepts" contentClassName="justify-between">
        <div className="space-y-6 max-w-6xl mx-auto w-full my-auto">
          <SectionItem>
            <SectionHeading
              badge="Systems & Rigor"
              title="Cloud Integrations, DevOps & Architectural Principles"
              description="Containerized deployments, hardware interfaces, and foundational software engineering paradigms."
            />
          </SectionItem>

          <SectionItem className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 7. Cloud Services & Integrations */}
            <Card padding="normal" className="space-y-3 bg-surface border-border flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary font-heading font-semibold text-sm">
                  <Cloud className="w-4 h-4 text-[#22d3ee]" />
                  <span>Cloud & Integrations</span>
                </div>
                <p className="text-xs text-secondary mt-1.5 leading-relaxed">
                  Managed cloud database layers, OneSignal real-time push webhooks, and RFID readers.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {coreSkills.cloudAndIntegrations.map((s) => (
                  <SkillTag key={s} name={s} />
                ))}
              </div>
            </Card>

            {/* 8. DevOps & CI/CD */}
            <Card padding="normal" className="space-y-3 bg-surface border-border flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary font-heading font-semibold text-sm">
                  <GitBranch className="w-4 h-4 text-[#7c5cff]" />
                  <span>DevOps & Containerization</span>
                </div>
                <p className="text-xs text-secondary mt-1.5 leading-relaxed">
                  Docker service containerization, automated Git CI/CD testing, and production Linux operations.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {coreSkills.devOpsAndTools.map((s) => (
                  <SkillTag key={s} name={s} />
                ))}
              </div>
            </Card>

            {/* 9. Core Concepts */}
            <Card padding="normal" className="space-y-3 bg-surface border-border flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary font-heading font-semibold text-sm">
                  <Settings className="w-4 h-4 text-primary" />
                  <span>Architectural Principles</span>
                </div>
                <p className="text-xs text-secondary mt-1.5 leading-relaxed">
                  Multi-tenant RBAC security, zero-downtime reliability, and predictive machine monitoring.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {coreSkills.coreConcepts.map((s) => (
                  <SkillTag key={s} name={s} />
                ))}
              </div>
            </Card>
          </SectionItem>
        </div>

        {/* Integrated Sub-bar Footer */}
        <SectionItem className="pt-6 border-t border-border mt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted max-w-6xl mx-auto w-full">
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
