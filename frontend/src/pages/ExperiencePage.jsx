import React, { useState } from 'react';
import { Download, CheckCircle2, ArrowRight, Building, Cpu, Database, Server, GitBranch, MapPin, Target, GraduationCap } from 'lucide-react';
import FullPageSlider from '../components/slider/FullPageSlider';
import Section, { SectionItem } from '../components/slider/Section';
import SectionHeading from '../components/common/SectionHeading';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { professionalExperience, education, personalInfo } from '../data/portfolioData';

const EXPERIENCE_SECTIONS = [
  { id: 'cmti-role', title: 'Current Role' },
  { id: 'milestones', title: 'Milestones & Impact' },
  { id: 'education', title: 'Education & Credentials' }
];

const CURRENT_YEAR = new Date().getFullYear();

export default function ExperiencePage() {
  const cmti = professionalExperience[0];
  const edu = education[0] || {};
  const [selectedMilestone, setSelectedMilestone] = useState(0);

  const milestoneIcons = [
    Cpu,        // Condition Monitoring
    Server,     // NIAMT Dashboard
    Database,   // Machine-Hour Maintenance
    Building,   // Manpower Scheduling
    Server,     // Enterprise PPM
    Cpu,        // Local Private LLM & RAG
    Cpu,        // CMF Vibration
    Server,     // Maintenance & Welding
    GitBranch   // DevOps & Docker
  ];

  return (
    <FullPageSlider sections={EXPERIENCE_SECTIONS}>
      {/* ===================================================================
          SLIDE 1: CURRENT ROLE AT CMTI
          =================================================================== */}
      <Section id="cmti-role" title="Current Role" ariaLabel="Current Role and Scope at CMTI">
        <div className="space-y-4 my-auto max-w-5xl mx-auto w-full">
          <SectionItem>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <SectionHeading
                badge="Current Engineering Scope"
                title="Software Developer at National Research Institute"
                description="Directly collaborating with senior scientists and engineers to architect, develop, and maintain industrial telemetry, private LLM pipelines, and enterprise systems."
              />
              <Button href={personalInfo.resumePath} variant="primary" size="md" icon={Download} magnetic={true} className="shrink-0 self-start md:self-auto">
                Download Resume (PDF)
              </Button>
            </div>
          </SectionItem>

          <SectionItem>
            <Card padding="normal" className="space-y-4 bg-surface border-border">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-border pb-3.5">
                <div>
                  <Badge variant="outline" size="sm" className="mb-1.5">Active Appointment</Badge>
                  <h2 className="text-xl sm:text-2xl font-bold text-primary font-heading">
                    {cmti.role}
                  </h2>
                  <p className="text-xs sm:text-sm text-secondary font-medium mt-0.5">
                    {cmti.organization} — {cmti.location}
                  </p>
                </div>
                <Badge variant="outline" size="md" className="self-start md:self-auto font-mono">
                  {cmti.period}
                </Badge>
              </div>

              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                {cmti.description}
              </p>

              {/* 3 Core Highlight Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-surface-muted/60 border border-border space-y-1">
                  <div className="text-[10px] font-mono text-muted uppercase">Scope 01</div>
                  <div className="text-xs sm:text-sm font-semibold text-primary font-heading">Industrial Telemetry</div>
                  <p className="text-xs text-secondary leading-relaxed">
                    OROS DAQ & NV Gate FFT vibration monitoring and threshold alerting.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-surface-muted/60 border border-border space-y-1">
                  <div className="text-[10px] font-mono text-muted uppercase">Scope 02</div>
                  <div className="text-xs sm:text-sm font-semibold text-primary font-heading">Enterprise Portals</div>
                  <p className="text-xs text-secondary leading-relaxed">
                    PPM system serving 40+ scientists, admins and directors with Docker deployment.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-surface-muted/60 border border-border space-y-1">
                  <div className="text-[10px] font-mono text-muted uppercase">Scope 03</div>
                  <div className="text-xs sm:text-sm font-semibold text-primary font-heading">Local AI & RAG</div>
                  <p className="text-xs text-secondary leading-relaxed">
                    Ollama Qwen/Llama context builder grounded on live relational data.
                  </p>
                </div>
              </div>
            </Card>
          </SectionItem>
        </div>
      </Section>

      {/* ===================================================================
          SLIDE 2: INTERACTIVE ENGINEERING MILESTONES
          =================================================================== */}
      <Section id="milestones" title="Milestones & Impact" ariaLabel="Institutional Engineering Milestones">
        <div className="space-y-6 my-auto max-w-6xl mx-auto w-full">
          <SectionItem>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <SectionHeading
                badge="Impact Track"
                title="Institutional Milestones & Technical Achievements"
                description="Select any milestone below to review the technical implementation details."
              />
              <div className="text-xs font-mono text-muted shrink-0 self-start md:self-auto">
                {cmti.highlights.length} Technical Milestones
              </div>
            </div>
          </SectionItem>

          <SectionItem className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Milestone List Selector */}
            <div className="lg:col-span-5 space-y-2 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
              {cmti.highlights.map((item, idx) => {
                const isSelected = selectedMilestone === idx;
                const IconComponent = milestoneIcons[idx] || Cpu;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedMilestone(idx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[var(--button-bg)] text-[var(--button-text)] border-[var(--button-bg)] font-semibold shadow-sm'
                        : 'bg-surface text-secondary hover:text-primary hover:bg-surface-muted border-border'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <IconComponent className="w-4 h-4 shrink-0" />
                      <span className="text-xs sm:text-sm font-heading truncate">{item.title}</span>
                    </div>
                    <span className="text-[10px] font-mono shrink-0 opacity-70">
                      #{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Detailed Milestone Inspection Card */}
            <div className="lg:col-span-7">
              <Card padding="spacious" className="space-y-4 bg-surface border-border min-h-[340px] flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 border-b border-border pb-3">
                    <span className="text-xs font-mono text-muted uppercase">
                      Milestone Detail #{selectedMilestone + 1} of {cmti.highlights.length}
                    </span>
                    <Badge variant="outline" size="sm">Production Verified</Badge>
                  </div>

                  <h3 className="text-xl font-bold font-heading text-primary">
                    {cmti.highlights[selectedMilestone]?.title}
                  </h3>

                  <p className="text-sm text-secondary leading-relaxed">
                    {cmti.highlights[selectedMilestone]?.detail}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted">
                  <span>CMTI Bengaluru Implementation</span>
                  <a
                    href={personalInfo.resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline font-semibold"
                  >
                    <span>View in Resume Record</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </Card>
            </div>
          </SectionItem>
        </div>
      </Section>

      {/* ===================================================================
          SLIDE 3: EDUCATION, CREDENTIALS & INTEGRATED FOOTER
          =================================================================== */}
      <Section id="education" title="Education & Credentials" ariaLabel="Education and Credentials" contentClassName="justify-between">
        <div className="space-y-6 max-w-5xl mx-auto w-full my-auto">
          <SectionItem>
            <SectionHeading
              badge="Academic Foundation"
              title="Education & Core Engineering Credentials"
              description="Engineering degree rooted in electronics, communication architectures, and hardware-software systems."
            />
          </SectionItem>

          <SectionItem className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Degree Card */}
            <Card padding="normal" className="space-y-4 bg-surface border-border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-border pb-3">
                <div className="flex items-center gap-2 font-heading font-semibold text-primary min-w-0">
                  <GraduationCap className="w-5 h-5 text-[#22d3ee] shrink-0" />
                  <span className="text-sm sm:text-base leading-snug">{edu.degree}</span>
                </div>
                <Badge variant="outline" size="sm" className="font-mono whitespace-nowrap shrink-0 self-start sm:self-auto">
                  {edu.period}
                </Badge>
              </div>

              <div>
                <h4 className="text-base font-semibold text-primary">{edu.institution}</h4>
                <p className="text-xs text-secondary mt-0.5">{edu.location}</p>
              </div>

              <div className="p-3 rounded-lg bg-surface-muted border border-border text-xs text-secondary">
                <div className="font-semibold text-primary mb-1">Academic Performance:</div>
                <div>CGPA: <strong className="text-primary font-mono">{edu.cgpa || '7.61'}</strong> / 10.0 ({edu.equivalent || 'First Class'})</div>
              </div>
            </Card>

            {/* Core Competencies & Rigor Card */}
            <Card padding="normal" className="space-y-4 bg-surface border-border">
              <div className="flex items-center justify-between gap-2 border-b border-border pb-3">
                <div className="flex items-center gap-2 font-heading font-semibold text-primary">
                  <Target className="w-5 h-5 text-[#7c5cff]" />
                  <span>Technical Rigor & Focus</span>
                </div>
                <Badge variant="outline" size="sm">Core Focus</Badge>
              </div>

              <ul className="space-y-2 text-xs text-secondary">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
                  <span>Digital signal processing, FFT and real-time instrumentation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
                  <span>Full-stack web architecture with asynchronous microservices</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
                  <span>Containerized CI/CD deployment on production Linux servers</span>
                </li>
              </ul>

              <div className="pt-2">
                <Button href={personalInfo.resumePath} variant="outline" size="md" icon={Download} magnetic={true} className="w-full justify-center">
                  Download Full CV Record
                </Button>
              </div>
            </Card>
          </SectionItem>
        </div>

        {/* Integrated Sub-bar Footer */}
        <SectionItem className="pt-6 border-t border-border mt-6">
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
