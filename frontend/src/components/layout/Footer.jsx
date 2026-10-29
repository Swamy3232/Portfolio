import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight, ArrowUp } from 'lucide-react';
import Container from '../common/Container';
import { personalInfo } from '../../data/portfolioData';

function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border bg-surface transition-colors duration-200 mt-24">
      <Container size="wide">
        <div className="py-12 sm:py-16 grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded border border-border bg-surface-muted flex items-center justify-center font-mono font-bold text-xs text-primary">
                SR
              </div>
              <span className="text-base font-bold font-heading text-primary tracking-tight">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-secondary max-w-md leading-relaxed">
              Full Stack Developer specializing in real-time industrial monitoring, reactive dashboards, and FastAPI/PostgreSQL backend architectures.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted pt-1">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>{personalInfo.location}</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold tracking-wider uppercase text-primary font-mono">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/" className="text-secondary hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-secondary hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/experience" className="text-secondary hover:text-primary transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link to="/skills" className="text-secondary hover:text-primary transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Links */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold tracking-wider uppercase text-primary font-mono">
              Connect
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-2 text-secondary hover:text-primary transition-colors group"
                >
                  <Mail className="w-3.5 h-3.5 text-muted group-hover:text-primary" />
                  <span className="truncate">{personalInfo.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${personalInfo.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-2 text-secondary hover:text-primary transition-colors group"
                >
                  <Phone className="w-3.5 h-3.5 text-muted group-hover:text-primary" />
                  <span>{personalInfo.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-secondary hover:text-primary transition-colors group"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-muted group-hover:text-primary" />
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight className="w-3 h-3 text-muted" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-bar with Back to Top */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {CURRENT_YEAR} {personalInfo.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px]">Strict Monochrome System</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-border bg-surface-muted text-xs text-primary hover:border-text transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-text cursor-pointer"
              aria-label="Back to top of page"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
