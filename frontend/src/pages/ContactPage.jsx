import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowUpRight, Copy, Check, FileDown, MessageSquare, CheckCircle2, Clock, Globe } from 'lucide-react';
import FullPageSlider from '../components/slider/FullPageSlider';
import Section, { SectionItem } from '../components/slider/Section';
import SectionHeading from '../components/common/SectionHeading';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { personalInfo } from '../data/portfolioData';

const CONTACT_SECTIONS = [
  { id: 'channels', title: 'Direct Channels' },
  { id: 'availability', title: 'Availability & Engagement' }
];

const CURRENT_YEAR = new Date().getFullYear();

function LinkedinIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function GithubIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <FullPageSlider sections={CONTACT_SECTIONS}>
      {/* ===================================================================
          SLIDE 1: DIRECT CONTACT CHANNELS & PROVENANCE
          =================================================================== */}
      <Section id="channels" title="Direct Channels" ariaLabel="Direct Contact Channels">
        <div className="space-y-6 my-auto max-w-5xl mx-auto w-full">
          <SectionItem>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <SectionHeading
                as="h1"
                badge="Get in Touch"
                title="Direct Channels & Engineering Inquiries"
                description="Actively open for Software Developer roles, full-stack architecture discussions, and technical opportunities."
              />
              <Button
                href={personalInfo.resumePath}
                variant="primary"
                size="md"
                icon={FileDown}
                magnetic={true}
                className="shrink-0 self-start md:self-auto"
              >
                Download Resume (PDF)
              </Button>
            </div>
          </SectionItem>

          {/* Quick Metrics Bar */}
          <SectionItem className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-xl bg-surface border border-border">
            <div className="space-y-0.5">
              <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#10b981]">Immediate</div>
              <div className="text-xs text-secondary font-medium">Availability Status</div>
            </div>
            <div className="space-y-0.5 border-l border-border pl-3">
              <div className="text-xl sm:text-2xl font-extrabold font-mono text-primary">&lt; 24h</div>
              <div className="text-xs text-secondary font-medium">Direct Response</div>
            </div>
            <div className="space-y-0.5 border-l border-border pl-3">
              <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#22d3ee]">CMTI</div>
              <div className="text-xs text-secondary font-medium">Active Research Inst.</div>
            </div>
            <div className="space-y-0.5 border-l border-border pl-3">
              <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#7c5cff]">Bengaluru</div>
              <div className="text-xs text-secondary font-medium">Relocation / Remote</div>
            </div>
          </SectionItem>

          {/* 6 High-Impact Direct Contact Cards */}
          <SectionItem className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Email Card */}
            <div className="p-4 rounded-xl bg-surface border border-border flex items-center justify-between gap-3 hover:border-text/40 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-surface-muted border border-border flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-muted uppercase">Email</div>
                  <a href={`mailto:${personalInfo.email}`} className="text-xs sm:text-sm font-semibold text-primary truncate hover:underline block">
                    {personalInfo.email}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(personalInfo.email, 'email')}
                className="p-2 rounded-lg bg-surface-muted hover:bg-surface-elevated text-secondary hover:text-primary transition-colors cursor-pointer border border-border shrink-0"
                title="Copy email address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-[#10b981]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* 2. Phone Card */}
            <div className="p-4 rounded-xl bg-surface border border-border flex items-center justify-between gap-3 hover:border-text/40 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-surface-muted border border-border flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-muted uppercase">Phone</div>
                  <a href={`tel:${personalInfo.phone.replace(/[^0-9+]/g, '')}`} className="text-xs sm:text-sm font-semibold text-primary hover:underline block">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
                className="p-2 rounded-lg bg-surface-muted hover:bg-surface-elevated text-secondary hover:text-primary transition-colors cursor-pointer border border-border shrink-0"
                title="Copy phone number"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-[#10b981]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* 3. LinkedIn Card */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-surface border border-border flex items-center justify-between gap-3 hover:border-text/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-muted border border-border flex items-center justify-center shrink-0">
                  <LinkedinIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-muted uppercase">LinkedIn</div>
                  <div className="text-xs sm:text-sm font-semibold text-primary">Connect & Message</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-primary transition-colors shrink-0" />
            </a>

            {/* 4. GitHub Card */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-surface border border-border flex items-center justify-between gap-3 hover:border-text/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-muted border border-border flex items-center justify-center shrink-0">
                  <GithubIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-muted uppercase">GitHub</div>
                  <div className="text-xs sm:text-sm font-semibold text-primary">Code & Architectures</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-primary transition-colors shrink-0" />
            </a>

            {/* 5. Location Card */}
            <div className="p-4 rounded-xl bg-surface border border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-muted border border-border flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-muted" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-muted uppercase">Current Base</div>
                <div className="text-xs sm:text-sm font-semibold text-primary">{personalInfo.location}</div>
              </div>
            </div>

            {/* 6. Availability Status Card */}
            <div className="p-4 rounded-xl bg-surface border border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#10b981]/10 border border-[#10b981]/25 flex items-center justify-center shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#10b981] uppercase">Notice Period</div>
                <div className="text-xs sm:text-sm font-semibold text-primary">Immediate Joining</div>
              </div>
            </div>
          </SectionItem>
        </div>
      </Section>

      {/* ===================================================================
          SLIDE 2: AVAILABILITY, COLLABORATION PROCESS & FAQ
          =================================================================== */}
      <Section id="availability" title="Availability & Engagement" ariaLabel="Availability and Engagement" contentClassName="justify-between">
        <div className="space-y-6 max-w-5xl mx-auto w-full my-auto">
          <SectionItem>
            <SectionHeading
              badge="Collaboration Model"
              title="Work Availability & Technical Engagement"
              description="Overview of technical engagement models, location preferences, and interview readiness."
            />
          </SectionItem>

          <SectionItem className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card padding="normal" className="space-y-2 bg-surface border-border">
              <div className="flex items-center gap-2 text-primary font-heading font-semibold text-sm">
                <Clock className="w-4 h-4 text-[#22d3ee]" />
                <span>Immediate Availability</span>
              </div>
              <p className="text-xs text-secondary leading-relaxed">
                Available for full-time Software Developer roles in Bengaluru or remote teams across India and international timezones.
              </p>
            </Card>

            <Card padding="normal" className="space-y-2 bg-surface border-border">
              <div className="flex items-center gap-2 text-primary font-heading font-semibold text-sm">
                <MessageSquare className="w-4 h-4 text-[#7c5cff]" />
                <span>Technical Interview Ready</span>
              </div>
              <p className="text-xs text-secondary leading-relaxed">
                Prepared for deep-dive discussions on React architecture, FastAPI endpoints, WebSocket telemetry, and database schemas.
              </p>
            </Card>

            <Card padding="normal" className="space-y-2 bg-surface border-border">
              <div className="flex items-center gap-2 text-primary font-heading font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                <span>Verified Credentials</span>
              </div>
              <p className="text-xs text-secondary leading-relaxed">
                All production milestones at CMTI and prior systems are documented and backed by verified institutional references.
              </p>
            </Card>
          </SectionItem>

          <SectionItem>
            <div className="p-4 rounded-xl bg-surface border border-border flex items-center justify-between flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#22d3ee] shrink-0" />
                <span className="text-secondary">
                  Ready to onboard immediately for high-impact software engineering roles.
                </span>
              </div>
              <Button href={personalInfo.resumePath} variant="outline" size="sm" icon={ArrowUpRight} iconPosition="right">
                Download Resume (PDF)
              </Button>
            </div>
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
