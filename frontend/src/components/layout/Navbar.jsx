import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';
import Container from '../common/Container';
import { personalInfo } from '../../data/portfolioData';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING_OUT } from '../../constants/motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocusedInside, setIsFocusedInside] = useState(false);
  const { scrollDirection, scrollY } = useScrollDirection({ threshold: 14 });
  const prefersReducedMotion = useReducedMotion();
  const location = useLocation();
  const menuRef = useRef(null);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Skills', path: '/skills' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Intelligent hide-on-scroll down, show-on-scroll up
  // Never hide if menu is open, near the top, or keyboard focus is inside
  const shouldHideNavbar =
    !prefersReducedMotion &&
    scrollY > 90 &&
    scrollDirection === 'down' &&
    !isOpen &&
    !isFocusedInside;

  const isScrolled = scrollY > 20;

  return (
    <header
      onFocus={() => setIsFocusedInside(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsFocusedInside(false);
        }
      }}
      className="w-full shrink-0 z-40 bg-surface/85 backdrop-blur-md border-b border-border shadow-subtle py-2 sm:py-2.5"
    >
      <Container size="wide">
        <div className="flex items-center justify-between h-14">
          {/* Brand Logo */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 text-base font-bold font-heading tracking-tight text-primary transition-colors focus-visible:ring-2 focus-visible:ring-text rounded-lg"
            aria-label={`${personalInfo.name} - Home`}
          >
            <div className="w-8 h-8 rounded-md bg-surface border border-border flex items-center justify-center text-primary font-mono text-xs font-bold group-hover:border-text transition-colors">
              SR
            </div>
            <div className="flex flex-col">
              <span className="leading-tight text-primary font-heading font-semibold">
                {personalInfo.name}
              </span>
              <span className="text-[11px] font-normal text-muted leading-none">
                Full Stack Developer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with Minimal Active Pill / Underline */}
          <nav className="hidden md:flex items-center gap-1 relative" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-text ${isActive
                      ? 'text-primary font-semibold'
                      : 'text-secondary hover:text-primary'
                    }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && !prefersReducedMotion && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-md bg-surface-muted border border-border z-0"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  {isActive && prefersReducedMotion && (
                    <div className="absolute inset-0 rounded-md bg-surface-muted border border-border z-0" />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Items: Resume + Theme Toggle */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={personalInfo.resumePath}
              download="SWAMY_R_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md bg-[var(--button-bg)] text-[var(--button-text)] hover:opacity-90 transition-opacity border border-transparent focus-visible:ring-2 focus-visible:ring-text group"
            >
              <FileDown className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Resume</span>
            </a>

            <ThemeToggle />
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex items-center gap-2 sm:hidden">
            <ThemeToggle />

            {/* Morphing Hamburger Button (3 lines morphing to X) */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-xl border border-border bg-surface text-primary flex flex-col items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-nav-panel"
            >
              <span
                className={`w-5 h-[2px] bg-primary rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[8px]' : ''
                  }`}
              />
              <span
                className={`w-5 h-[2px] bg-primary rounded-full transition-all duration-200 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100'
                  }`}
              />
              <span
                className={`w-5 h-[2px] bg-primary rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[8px]' : ''
                  }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Slide-in Navigation Panel with Framer Motion AnimatePresence */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 top-[60px] bg-black/50 backdrop-blur-sm z-40 md:hidden"
                aria-hidden="true"
              />

              {/* Slide-in Menu Container */}
              <motion.div
                id="mobile-nav-panel"
                ref={menuRef}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25, ease: EASING_OUT }}
                className="md:hidden mt-2 py-5 px-4 border border-border bg-surface/98 backdrop-blur-xl rounded-2xl shadow-xl relative z-50 overflow-hidden"
              >
                <nav className="flex flex-col gap-1.5">
                  {navLinks.map((link, idx) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <motion.div
                        key={link.path}
                        initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04, duration: 0.2 }}
                      >
                        <NavLink
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                              ? 'text-primary bg-surface-muted font-bold border border-border'
                              : 'text-secondary hover:text-primary hover:bg-surface-muted'
                            }`}
                        >
                          <span>{link.name}</span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          )}
                        </NavLink>
                      </motion.div>
                    );
                  })}

                  <div className="pt-3 mt-2 border-t border-border">
                    <a
                      href={personalInfo.resumePath}
                      download="SWAMY_R_Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg bg-[var(--button-bg)] text-[var(--button-text)] hover:opacity-90 transition-opacity"
                    >
                      <FileDown className="w-4 h-4" />
                      <span>Download Resume (PDF)</span>
                    </a>
                  </div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}
