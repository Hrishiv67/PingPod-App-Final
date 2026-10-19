import React from "react";
import { PINK } from "../../theme";

export default function RegionEnterOverlay({ regionName }) {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 700,
      background: "#fff",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      animation: "regionOverlayFade 0.3s ease-out",
      boxShadow: "inset 0 0 0 1px #f0f0f0",
    }}>
      <style>{`@keyframes regionOverlayFade { from { opacity: 0; } to { opacity: 1; } }`}</style>
      <div style={{
        width: 48, height: 48, borderRadius: "50%", background: PINK + "18",
        border: `2px solid ${PINK}40`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={PINK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      </div>
      <div style={{ marginTop: 14, color: "#888", fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }}>Entering</div>
      <div style={{ marginTop: 4, color: "#111", fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", textAlign: "center", padding: "0 24px" }}>{regionName}</div>
      <div style={{ marginTop: 14, width: 100, height: 3, borderRadius: 2, background: "#eee", overflow: "hidden" }}>
        <div style={{ width: "100%", height: "100%", background: PINK, borderRadius: 2, transformOrigin: "left", animation: "regionProgress 0.6s ease-out forwards" }}/>
      </div>
      <style>{`@keyframes regionProgress { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
    </div>
  );
}
