// SVG icon set.
import React from "react";

export const Ic = {
  Book: ({c="#999",s=22}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/><circle cx="19.5" cy="19.5" r="2.2" fill={c} stroke="none"/></svg>,

  // Coaching: clean outlined calendar + dot
  Coaching: ({c="#999",s=22}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="4.5" width="17" height="15.5" rx="2.4"/>
      <line x1="8" y1="2.8" x2="8" y2="6.1"/>
      <line x1="16" y1="2.8" x2="16" y2="6.1"/>
      <line x1="3.5" y1="9.2" x2="20.5" y2="9.2"/>
      <circle cx="12" cy="14.1" r="2.3" fill={c} stroke="none"/>
    </svg>
  ),

  Reservations: ({c="#999",s=22}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round"><circle cx="10.5" cy="10.5" r="6.8"/><line x1="15.6" y1="15.6" x2="20" y2="20"/><path d="M8 10.7l1.7 1.8 3.5-3.6"/></svg>,

  // Programs: outlined group icon
  Programs: ({c="#999",s=22}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="2.8"/>
      <circle cx="16.2" cy="10.2" r="2.3"/>
      <path d="M4.8 18c.8-2.6 2.9-4.1 5.2-4.1 2.4 0 4.4 1.5 5.2 4.1"/>
      <path d="M13.8 17.9c.5-1.9 1.9-3.1 3.8-3.1 1.2 0 2.3.5 3.1 1.5"/>
    </svg>
  ),

  Truck: ({c="#999",s=22}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="12.5" height="9.5" rx="1.8"/>
      <path d="M14.5 8.3h3.6l2.2 2.8v3.4h-5.8z"/>
      <circle cx="7" cy="17.2" r="1.8"/>
      <circle cx="17.8" cy="17.2" r="1.8"/>
    </svg>
  ),
  More: ({c="#999",s=22}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><circle cx="6" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="18" cy="12" r="1.8"/></svg>,
  ChevR: ({c="#111",s=16}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  ChevL: ({c="#111",s=22}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  Cart:  ({c="#111",s=24}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  Bookmark: ({c="#FF0080",s=22}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>,
  Sliders: ({c="#333",s=20}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>,
  Pin:  ({c="#999",s=13}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Bars: ({c="#999",s=13}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><line x1="2" y1="20" x2="2" y2="16"/><line x1="7" y1="20" x2="7" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/></svg>,
  Star: ({c="#F5A623",s=14}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Trophy: ({c="#C9A227",s=14}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="11"/><path d="M7 4H4a2 2 0 0 0-2 2v1a5 5 0 0 0 10 0V6a2 2 0 0 0-2-2H7z"/><path d="M17 4h3a2 2 0 0 1 2 2v1a5 5 0 0 1-10 0V6a2 2 0 0 1 2-2h3z"/><line x1="7" y1="4" x2="17" y2="4"/></svg>,
  Check: ({c="#22c55e",s=22}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Lightning: ({c="#FF0080",s=16}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Shield: ({c="#0EA5E9",s=16}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Crown:  ({c="#FFD700",s=16}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke="none"><path d="M2 20h20v2H2zM3 9l4 4 5-8 5 8 4-4 1 9H2z"/></svg>,
  Award: ({c="#C9A227",s=14}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
  Plus:  ({c="#fff",s=16}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Clock: ({c="#999",s=14}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg>,
};

export const CrewsIcon = ({c="#999", s=22}) => (
  <svg width={s} height={s} viewBox="0 0 28 24" fill="none">
    <g transform="rotate(-24,10.2,12)">
      <ellipse cx="10.2" cy="8.5" rx="4.2" ry="5.3" fill={c}/>
      <ellipse cx="10.2" cy="8.1" rx="2.8" ry="3.5" fill="white" opacity="0.18"/>
      <rect x="8.8" y="13.2" width="2.8" height="6" rx="1.4" fill={c}/>
    </g>
    <g transform="rotate(24,17.8,12)">
      <ellipse cx="17.8" cy="8.5" rx="4.2" ry="5.3" fill={c}/>
      <ellipse cx="17.8" cy="8.1" rx="2.8" ry="3.5" fill="white" opacity="0.18"/>
      <rect x="16.4" y="13.2" width="2.8" height="6" rx="1.4" fill={c}/>
    </g>
    <circle cx="14" cy="2.8" r="2.15" fill={c}/>
  </svg>
);
