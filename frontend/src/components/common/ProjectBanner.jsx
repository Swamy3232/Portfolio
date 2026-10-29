import React from 'react';

/**
 * ProjectBanner Component
 * Renders high-fidelity, theme-aware industrial SVG telemetry illustrations
 * with glowing gradients, frequency waveforms, radar sweeps, and digital instrument panels.
 * All headers and text utilize dominantBaseline="central" for pixel-perfect vertical centering.
 */
export default function ProjectBanner({ projectId, title }) {
  const renderVisual = () => {
    switch (projectId) {
      case 'vibration-monitoring':
        return (
          <svg className="w-full h-full" viewBox="0 0 440 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Vibration FFT Analysis & Real-time Telemetry">
            <defs>
              <linearGradient id="fftWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c5cff" />
                <stop offset="50%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#38ef7d" />
              </linearGradient>
              <linearGradient id="barGradCyan" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#7c5cff" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="barGradViolet" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#7c5cff" stopOpacity="0.95" />
              </linearGradient>
              <pattern id="vibGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" className="text-border" strokeWidth="0.75" strokeOpacity="0.5" />
              </pattern>
            </defs>

            {/* Background Grid */}
            <rect width="440" height="240" fill="currentColor" className="text-surface-muted" />
            <rect width="440" height="240" fill="url(#vibGrid)" />

            {/* Instrument Header Bar */}
            <g transform="translate(24, 18)">
              <rect width="392" height="30" rx="6" fill="currentColor" className="text-surface" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
              <circle cx="16" cy="15" r="4" fill="#22d3ee" className="animate-pulse" />
              <text x="28" y="15" dominantBaseline="central" fill="currentColor" className="text-primary font-mono text-[10.5px] font-bold tracking-wider">OROS DAQ • FFT SPECTRUM & RMS</text>
              <rect x="290" y="6" width="92" height="18" rx="4" fill="currentColor" className="text-surface-muted" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.2" />
              <text x="336" y="15" dominantBaseline="central" textAnchor="middle" fill="#22d3ee" className="font-mono text-[10px] font-bold">12.5 kHz / LIVE</text>
            </g>

            {/* FFT Frequency Spectrum Bars */}
            <g transform="translate(30, 80)">
              <rect x="10" y="60" width="8" height="60" rx="2" fill="url(#barGradCyan)" />
              <rect x="24" y="45" width="8" height="75" rx="2" fill="url(#barGradCyan)" />
              <rect x="38" y="20" width="8" height="100" rx="2" fill="url(#barGradCyan)" />
              <rect x="52" y="70" width="8" height="50" rx="2" fill="url(#barGradCyan)" />
              <rect x="66" y="85" width="8" height="35" rx="2" fill="url(#barGradCyan)" />
              <rect x="80" y="30" width="8" height="90" rx="2" fill="url(#barGradViolet)" />
              <rect x="94" y="10" width="8" height="110" rx="2" fill="url(#barGradViolet)" />
              <rect x="108" y="55" width="8" height="65" rx="2" fill="url(#barGradCyan)" />
              <rect x="122" y="75" width="8" height="45" rx="2" fill="url(#barGradCyan)" />
              <rect x="136" y="90" width="8" height="30" rx="2" fill="url(#barGradCyan)" />
              <text x="75" y="138" textAnchor="middle" fill="currentColor" className="text-muted font-mono text-[9px]">FREQUENCY (Hz)</text>
            </g>

            {/* Oscilloscope Waveform Panel */}
            <g transform="translate(195, 75)">
              <rect width="220" height="135" rx="8" fill="currentColor" className="text-surface" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" />
              {/* Waveform baseline */}
              <line x1="12" y1="67" x2="208" y2="67" stroke="currentColor" className="text-border" strokeDasharray="3 3" />
              {/* Complex harmonic waveform */}
              <path
                d="M 16 67 Q 35 15, 55 67 T 95 67 T 135 25 T 165 95 T 195 67 T 205 67"
                stroke="url(#fftWaveGrad)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
              {/* Second subtle harmonics trace */}
              <path
                d="M 16 67 Q 40 45, 65 67 T 115 67 T 155 50 T 185 80 T 205 67"
                stroke="#22d3ee"
                strokeWidth="1.2"
                strokeOpacity="0.4"
                fill="none"
              />
              {/* Digital Metrics Pills */}
              <g transform="translate(12, 105)">
                <text x="0" y="12" fill="currentColor" className="text-muted font-mono text-[10px]">RMS Peak</text>
                <text x="0" y="24" fill="#22d3ee" className="font-mono text-[12px] font-bold">0.142 g</text>
                <text x="80" y="12" fill="currentColor" className="text-muted font-mono text-[10px]">Velocity</text>
                <text x="80" y="24" fill="currentColor" className="text-primary font-mono text-[12px] font-bold">2.8 mm/s</text>
                <text x="145" y="12" fill="currentColor" className="text-muted font-mono text-[10px]">Status</text>
                <text x="145" y="24" fill="#10b981" className="font-mono text-[11px] font-bold">HEALTHY</text>
              </g>
            </g>
          </svg>
        );

      case 'smart-workshop-dashboard':
        return (
          <svg className="w-full h-full" viewBox="0 0 440 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Smart Manufacturing Telemetry Dashboard">
            <defs>
              <linearGradient id="gaugeGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#7c5cff" />
              </linearGradient>
              <linearGradient id="gaugeGradAmber" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>

            <rect width="440" height="240" fill="currentColor" className="text-surface-muted" />

            {/* Instrument Header Bar */}
            <g transform="translate(24, 18)">
              <rect width="392" height="30" rx="6" fill="currentColor" className="text-surface" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
              <circle cx="16" cy="15" r="4" fill="#10b981" className="animate-pulse" />
              <text x="28" y="15" dominantBaseline="central" fill="currentColor" className="text-primary font-mono text-[10.5px] font-bold tracking-wider">NIAMT TELEMETRY • WORKSHOP SENSORS</text>
              <rect x="300" y="6" width="82" height="18" rx="4" fill="currentColor" className="text-surface-muted" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.2" />
              <text x="341" y="15" dominantBaseline="central" textAnchor="middle" fill="#10b981" className="font-mono text-[10px] font-bold">4 MACHINES</text>
            </g>

            {/* Dial Gauge 1: Temperature */}
            <g transform="translate(24, 62)">
              <rect width="188" height="155" rx="10" fill="currentColor" className="text-surface" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
              {/* Arc track */}
              <circle cx="94" cy="72" r="48" stroke="currentColor" className="text-border" strokeWidth="8" strokeDasharray="210 110" strokeLinecap="round" fill="none" />
              {/* Active filled arc */}
              <circle cx="94" cy="72" r="48" stroke="url(#gaugeGradCyan)" strokeWidth="8" strokeDasharray="160 160" strokeLinecap="round" fill="none" />
              <text x="94" y="68" textAnchor="middle" fill="currentColor" className="text-primary font-mono font-bold text-xl">76.4°</text>
              <text x="94" y="85" textAnchor="middle" fill="currentColor" className="text-muted font-mono text-[10px]">CELSIUS</text>
              <text x="94" y="132" textAnchor="middle" fill="currentColor" className="text-secondary font-heading font-semibold text-xs">Spindle Temperature</text>
              <circle cx="94" cy="144" r="2.5" fill="#22d3ee" />
            </g>

            {/* Dial Gauge 2: Pneumatic Pressure & Sensor Streams */}
            <g transform="translate(228, 62)">
              <rect width="188" height="155" rx="10" fill="currentColor" className="text-surface" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
              {/* Arc track */}
              <circle cx="94" cy="72" r="48" stroke="currentColor" className="text-border" strokeWidth="8" strokeDasharray="210 110" strokeLinecap="round" fill="none" />
              {/* Active filled arc */}
              <circle cx="94" cy="72" r="48" stroke="url(#gaugeGradAmber)" strokeWidth="8" strokeDasharray="135 185" strokeLinecap="round" fill="none" />
              <text x="94" y="68" textAnchor="middle" fill="currentColor" className="text-primary font-mono font-bold text-xl">4.2</text>
              <text x="94" y="85" textAnchor="middle" fill="currentColor" className="text-muted font-mono text-[10px]">BAR PRESSURE</text>
              <text x="94" y="132" textAnchor="middle" fill="currentColor" className="text-secondary font-heading font-semibold text-xs">Hydraulic Feedline</text>
              <circle cx="94" cy="144" r="2.5" fill="#f59e0b" />
            </g>
          </svg>
        );

      case 'maintenance-tracking-system':
        return (
          <svg className="w-full h-full" viewBox="0 0 440 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Maintenance Audit System and Machine-Hour Ledger">
            <rect width="440" height="240" fill="currentColor" className="text-surface-muted" />

            {/* Instrument Header Bar */}
            <g transform="translate(24, 18)">
              <rect width="392" height="30" rx="6" fill="currentColor" className="text-surface" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
              <circle cx="16" cy="15" r="4" fill="#38ef7d" />
              <text x="28" y="15" dominantBaseline="central" fill="currentColor" className="text-primary font-mono text-[10.5px] font-bold tracking-wider">SMMDC • MACHINE-HOUR AUDIT LEDGER</text>
              <rect x="290" y="6" width="92" height="18" rx="4" fill="currentColor" className="text-surface-muted" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.2" />
              <text x="336" y="15" dominantBaseline="central" textAnchor="middle" fill="currentColor" className="text-primary font-mono text-[10px] font-semibold">PDF/CSV READY</text>
            </g>

            {/* Audit Table Matrix */}
            <g transform="translate(24, 60)">
              <rect width="392" height="158" rx="10" fill="currentColor" className="text-surface" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />

              {/* Table Column Headers */}
              <rect x="12" y="12" width="368" height="26" rx="6" fill="currentColor" className="text-surface-muted" />
              <text x="28" y="25" dominantBaseline="central" fill="currentColor" className="text-muted font-mono text-[10px] font-bold">EQUIPMENT UNIT</text>
              <text x="175" y="25" dominantBaseline="central" fill="currentColor" className="text-muted font-mono text-[10px] font-bold">LOGGED HRS</text>
              <text x="270" y="25" dominantBaseline="central" fill="currentColor" className="text-muted font-mono text-[10px] font-bold">AUDIT STATUS</text>

              {/* Row 1 */}
              <text x="28" y="65" dominantBaseline="central" fill="currentColor" className="text-primary font-heading font-semibold text-xs">CNC 5-Axis Milling #01</text>
              <text x="175" y="65" dominantBaseline="central" fill="currentColor" className="text-secondary font-mono text-xs">1,420 hrs</text>
              <rect x="270" y="54" width="85" height="20" rx="4" fill="rgba(16, 185, 129, 0.12)" stroke="#10b981" strokeWidth="1" />
              <text x="312" y="64" dominantBaseline="central" textAnchor="middle" fill="#10b981" className="font-mono text-[10px] font-bold">VERIFIED</text>

              {/* Row 2 */}
              <text x="28" y="102" dominantBaseline="central" fill="currentColor" className="text-primary font-heading font-semibold text-xs">High-Speed Lathe #04</text>
              <text x="175" y="102" dominantBaseline="central" fill="currentColor" className="text-secondary font-mono text-xs">980 hrs</text>
              <rect x="270" y="91" width="85" height="20" rx="4" fill="rgba(16, 185, 129, 0.12)" stroke="#10b981" strokeWidth="1" />
              <text x="312" y="101" dominantBaseline="central" textAnchor="middle" fill="#10b981" className="font-mono text-[10px] font-bold">VERIFIED</text>

              {/* Row 3 */}
              <text x="28" y="139" dominantBaseline="central" fill="currentColor" className="text-primary font-heading font-semibold text-xs">Direct Laser Sinter #02</text>
              <text x="175" y="139" dominantBaseline="central" fill="currentColor" className="text-secondary font-mono text-xs">512 hrs</text>
              <rect x="270" y="128" width="85" height="20" rx="4" fill="rgba(245, 158, 11, 0.12)" stroke="#f59e0b" strokeWidth="1" />
              <text x="312" y="138" dominantBaseline="central" textAnchor="middle" fill="#f59e0b" className="font-mono text-[10px] font-bold">SCHEDULED</text>
            </g>
          </svg>
        );

      case 'rfid-file-tracking':
        return (
          <svg className="w-full h-full" viewBox="0 0 440 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="RFID Spatial Tracking and Spatial Radar Graphic">
            <defs>
              <radialGradient id="radarSweep" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width="440" height="240" fill="currentColor" className="text-surface-muted" />

            {/* Instrument Header Bar */}
            <g transform="translate(24, 18)">
              <rect width="392" height="30" rx="6" fill="currentColor" className="text-surface" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
              <circle cx="16" cy="15" r="4" fill="#22d3ee" className="animate-pulse" />
              <text x="28" y="15" dominantBaseline="central" fill="currentColor" className="text-primary font-mono text-[10.5px] font-bold tracking-wider">RFID ENGINE • SPATIAL ASSET LOOKUP</text>
              <rect x="300" y="6" width="82" height="18" rx="4" fill="currentColor" className="text-surface-muted" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.2" />
              <text x="341" y="15" dominantBaseline="central" textAnchor="middle" fill="#22d3ee" className="font-mono text-[10px] font-bold">865-868 MHz</text>
            </g>

            {/* Radar Visual Area */}
            <g transform="translate(220, 140)">
              {/* Concentric distance rings */}
              <circle cx="0" cy="0" r="75" stroke="currentColor" className="text-border" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="0" cy="0" r="50" stroke="currentColor" className="text-border" strokeWidth="1" />
              <circle cx="0" cy="0" r="25" fill="url(#radarSweep)" stroke="currentColor" className="text-border" strokeWidth="1" />
              {/* Radar Axis */}
              <line x1="-80" y1="0" x2="80" y2="0" stroke="currentColor" className="text-border" strokeWidth="0.75" strokeOpacity="0.4" />
              <line x1="0" y1="-80" x2="0" y2="80" stroke="currentColor" className="text-border" strokeWidth="0.75" strokeOpacity="0.4" />
              {/* Center Receiver Node */}
              <circle cx="0" cy="0" r="6" fill="#22d3ee" />
              <circle cx="0" cy="0" r="10" stroke="#22d3ee" strokeWidth="1.5" strokeOpacity="0.6" />
            </g>

            {/* Detected Tag 1 Badge */}
            <g transform="translate(50, 75)">
              <rect width="115" height="38" rx="6" fill="currentColor" className="text-surface" stroke="#22d3ee" strokeWidth="1" />
              <text x="14" y="16" dominantBaseline="central" fill="currentColor" className="text-primary font-mono text-[11px] font-bold">TAG #4102-X</text>
              <text x="14" y="28" dominantBaseline="central" fill="currentColor" className="text-muted font-mono text-[9px]">ZONE B • ARCHIVE 02</text>
            </g>

            {/* Detected Tag 2 Badge */}
            <g transform="translate(275, 75)">
              <rect width="115" height="38" rx="6" fill="currentColor" className="text-surface" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" />
              <text x="14" y="16" dominantBaseline="central" fill="currentColor" className="text-primary font-mono text-[11px] font-bold">TAG #8819-A</text>
              <text x="14" y="28" dominantBaseline="central" fill="currentColor" className="text-muted font-mono text-[9px]">ZONE A • DISPATCH</text>
            </g>

            {/* Signal Strength Meter */}
            <g transform="translate(50, 175)">
              <text x="0" y="8" dominantBaseline="central" fill="currentColor" className="text-muted font-mono text-[10px]">RSSI Gain: -42 dBm</text>
              <rect x="0" y="16" width="110" height="6" rx="3" fill="currentColor" className="text-surface" />
              <rect x="0" y="16" width="85" height="6" rx="3" fill="#22d3ee" />
            </g>
          </svg>
        );

      case 'kls-mart':
        return (
          <svg className="w-full h-full" viewBox="0 0 440 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="KLS Mart Gold Collection and Chit Fund Platform">
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>

            <rect width="440" height="240" fill="currentColor" className="text-surface-muted" />

            {/* Instrument Header Bar */}
            <g transform="translate(24, 18)">
              <rect width="392" height="30" rx="6" fill="currentColor" className="text-surface" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
              <circle cx="16" cy="15" r="4" fill="#fbbf24" />
              <text x="28" y="15" dominantBaseline="central" fill="currentColor" className="text-primary font-mono text-[10.5px] font-bold tracking-wider">KLS MART • GOLD CHIT PLATFORM</text>
              <rect x="300" y="6" width="82" height="18" rx="4" fill="currentColor" className="text-surface-muted" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.2" />
              <text x="341" y="15" dominantBaseline="central" textAnchor="middle" fill="#fbbf24" className="font-mono text-[10px] font-bold">SUPABASE + AI</text>
            </g>

            {/* Ledger Card Container */}
            <g transform="translate(24, 60)">
              <rect width="392" height="158" rx="10" fill="currentColor" className="text-surface" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />

              {/* Gold Chit Summary Row */}
              <g transform="translate(18, 18)">
                <rect width="42" height="42" rx="8" fill="url(#goldGrad)" />
                <text x="21" y="21" dominantBaseline="central" textAnchor="middle" fill="#000000" className="font-mono font-bold text-lg">Au</text>
                <text x="56" y="14" dominantBaseline="central" fill="currentColor" className="text-primary font-heading font-bold text-sm">24K Gold Installment Scheme</text>
                <text x="56" y="32" dominantBaseline="central" fill="currentColor" className="text-muted text-xs">Customer Account: #KLS-99410</text>
              </g>

              {/* Installment Progress */}
              <g transform="translate(18, 78)">
                <text x="0" y="0" dominantBaseline="central" fill="currentColor" className="text-secondary font-mono text-xs">Tenure: 10 of 12 Installments Completed</text>
                <text x="354" y="0" dominantBaseline="central" textAnchor="end" fill="#f59e0b" className="font-mono text-xs font-bold">83.3% Complete</text>
                {/* Progress bar */}
                <rect x="0" y="10" width="354" height="8" rx="4" fill="currentColor" className="text-surface-muted" />
                <rect x="0" y="10" width="295" height="8" rx="4" fill="url(#goldGrad)" />
              </g>

              {/* Live Webhook / OneSignal Notification Pill */}
              <g transform="translate(18, 118)">
                <rect width="210" height="24" rx="6" fill="rgba(245, 158, 11, 0.12)" stroke="#f59e0b" strokeWidth="1" />
                <circle cx="12" cy="12" r="3" fill="#f59e0b" />
                <text x="22" y="12" dominantBaseline="central" fill="currentColor" className="text-primary font-mono text-[10px]">OneSignal Push: Receipt Dispatched</text>
                <rect x="238" y="0" width="134" height="24" rx="6" fill="currentColor" className="text-surface-muted" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
                <text x="305" y="12" dominantBaseline="central" textAnchor="middle" fill="currentColor" className="text-muted font-mono text-[10px]">Cloudinary KYC Sync</text>
              </g>
            </g>
          </svg>
        );

      default:
        return (
          <div className="w-full h-full flex items-center justify-center bg-surface-muted text-secondary">
            <span className="font-heading font-semibold text-sm">{title}</span>
          </div>
        );
    }
  };

  return (
    <div className="w-full aspect-[16/9] relative overflow-hidden rounded-t-2xl border-b border-border bg-surface-muted transition-all duration-300">
      {renderVisual()}
    </div>
  );
}
