import React from 'react';
import { GraduationCap, CheckCircle2, FileDown, Layers, Terminal, Cpu, Database, Mail, MapPin, ArrowRight } from 'lucide-react';
import FullPageSlider from '../components/slider/FullPageSlider';
import Section, { SectionItem } from '../components/slider/Section';
import SectionHeading from '../components/common/SectionHeading';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { personalInfo, education, additionalStrengths } from '../data/portfolioData';

const ABOUT_SECTIONS = [
  { id: 'bio', title: 'Biography & Scope' },
  { id: 'philosophy', title: 'Engineering Ethos' },
  { id: 'credentials', title: 'Credentials & Connect' }
];

const CURRENT_YEAR = new Date().getFullYear();

export default function AboutPage() {
  const edu = education[0] || {};

  return (
    <FullPageSlider sections={ABOUT_SECTIONS}>
      {/* ===================================================================
          SLIDE 1: BIOGRAPHY & ENGINEERING SCOPE
          =================================================================== */}
      <Section id="bio" title="Biography & Scope" ariaLabel="Biography and Professional Scope">
        <div className="space-y-4 my-auto max-w-5xl mx-auto w-full">
          <SectionItem>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <SectionHeading
                as="h1"
                badge="About Me"
                title="Engineering Background & Professional Scope"
                description="Software developer specializing in full-stack architecture, industrial telemetry suites, and private local LLM context engines."
              />
              <Button href={personalInfo.resumePath} variant="primary" size="md" icon={FileDown} magnetic={true} className="shrink-0 self-start md:self-auto">
                Download Resume (PDF)
              </Button>
            </div>
          </SectionItem>

          <SectionItem>
            <Card padding="normal" className="space-y-4 bg-surface border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold font-heading text-primary">
                    Hi, I'm {personalInfo.name} — Full Stack Developer based in {personalInfo.location}.
                  </h2>
                  <p className="text-sm sm:text-base text-secondary leading-relaxed">
                    At the Central Manufacturing Technology Institute (CMTI), I build full-stack telemetry dashboards, condition monitoring suites, and enterprise management tools used daily by senior engineers and scientists.
                  </p>
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                    My work spans high-throughput data processing from hardware DAQ systems, sub-second WebSocket telemetry, multi-tenant portal systems, and local LLM context pipelines with relational grounding.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface-muted/60 border border-border space-y-3 text-xs">
                  <div className="font-semibold text-primary font-heading border-b border-border pb-2">Quick Facts</div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-muted block">Experience:</span>
                      <span className="font-semibold text-primary font-mono">{personalInfo.yearsOfExperience} Hands-on</span>
                    </div>
                    <div>
                      <span className="text-muted block">Current Role:</span>
                      <span className="font-semibold text-primary">Software Developer @ CMTI</span>
                    </div>
                    <div>
                      <span className="text-muted block">Status:</span>
                      <span className="text-[#10b981] font-semibold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                        Available for Developer Roles
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </SectionItem>
        </div>
      </Section>

      {/* ===================================================================
          SLIDE 2: ENGINEERING PHILOSOPHY & PILLARS
          =================================================================== */}
      <Section id="philosophy" title="Engineering Ethos" ariaLabel="Engineering Philosophy and Core Pillars">
        <div className="space-y-6 my-auto max-w-5xl mx-auto w-full">
          <SectionItem>
            <SectionHeading
              badge="Engineering Philosophy"
              title="Architectural Rigor Built for Mission-Critical Systems"
              description="Three core principles guiding every software architecture, database schema, and client interface."
            />
          </SectionItem>

          <SectionItem className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card padding="normal" className="space-y-3 bg-surface border-border">
              <div className="flex items-center gap-2 text-primary font-heading font-semibold text-sm">
                <Layers className="w-4 h-4 text-[#22d3ee]" />
                <span>Responsive Precision</span>
              </div>
              <p className="text-xs text-secondary leading-relaxed">
                Interfaces must feel instantaneous. Using lightweight React 19 component trees, Vite builds, and hardware-accelerated CSS transforms guarantees 60/120fps fluid responsiveness.
              </p>
            </Card>

            <Card padding="normal" className="space-y-3 bg-surface border-border">
              <div className="flex items-center gap-2 text-primary font-heading font-semibold text-sm">
                <Terminal className="w-4 h-4 text-[#7c5cff]" />
                <span>Low-Latency Asynchrony</span>
              </div>
              <p className="text-xs text-secondary leading-relaxed">
                Industrial telemetry cannot afford blocking I/O. Leveraging FastAPI's async event loop and WebSocket pipelines ensures real-time sensor streams without queue lag.
              </p>
            </Card>

            <Card padding="normal" className="space-y-3 bg-surface border-border">
              <div className="flex items-center gap-2 text-primary font-heading font-semibold text-sm">
                <Database className="w-4 h-4 text-[#10b981]" />
                <span>Zero-Hallucination Grounding</span>
              </div>
              <p className="text-xs text-secondary leading-relaxed">
                AI must be truthful. Building RAG context builders directly connected to relational PostgreSQL databases guarantees that LLMs answer with verified ground truth.
              </p>
            </Card>
          </SectionItem>

          <SectionItem>
            <div className="p-4 rounded-xl bg-surface border border-border flex items-center justify-between flex-wrap gap-4 text-xs">
              <span className="text-secondary">
                Interested in how these principles translate into production code?
              </span>
              <Button to="/projects" variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                Explore Project Architectures
              </Button>
            </div>
          </SectionItem>
        </div>
      </Section>

      {/* ===================================================================
          SLIDE 3: ACADEMIC CREDENTIALS & CONNECT (with integrated footer)
          =================================================================== */}
      <Section id="credentials" title="Credentials & Connect" ariaLabel="Academic Credentials and Collaboration" contentClassName="justify-between">
        <div className="space-y-6 max-w-5xl mx-auto w-full my-auto">
          <SectionItem>
            <SectionHeading
              badge="Academic Foundation"
              title="Education, Core Strengths & Collaboration"
              description="Electronics and communication background providing strong foundational knowledge in digital signal processing, instrumentation, and protocols."
            />
          </SectionItem>

          <SectionItem className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card padding="normal" className="space-y-3 bg-surface border-border">
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
                <div className="font-semibold text-primary text-sm">{edu.institution}</div>
                <div className="text-xs text-secondary">{edu.location}</div>
              </div>

              <div className="p-3 rounded-lg bg-surface-muted text-xs text-secondary">
                Cumulative Performance: <strong className="text-primary font-mono font-bold">{edu.cgpa || '7.61'} CGPA</strong> / 10.0 ({edu.equivalent || 'First Class'})
              </div>
            </Card>

            <Card padding="normal" className="space-y-3 bg-surface border-border">
              <div className="flex items-center justify-between gap-2 border-b border-border pb-3">
                <div className="flex items-center gap-2 font-heading font-semibold text-primary">
                  <Cpu className="w-5 h-5 text-[#7c5cff]" />
                  <span>Additional Strengths</span>
                </div>
                <Badge variant="outline" size="sm">Attributes</Badge>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {additionalStrengths.map((str) => (
                  <span key={str} className="px-2.5 py-1 rounded-md text-xs font-medium bg-surface-muted border border-border text-primary">
                    {str}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Button to="/contact" variant="primary" size="sm" icon={Mail} iconPosition="left">
                  Get in Touch
                </Button>
                <Button href={personalInfo.resumePath} variant="outline" size="sm" icon={FileDown} iconPosition="left">
                  Download CV
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
