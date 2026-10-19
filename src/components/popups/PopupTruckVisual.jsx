import React from "react";

// TODO: placeholder. The original PopupTruckVisual.jsx was never committed to this repo;
// replace this file with it (it lives in src/components/ of the local Netlify project).
export default function PopupTruckVisual({ pink, fontFamily }) {
  return (
    <div style={{margin:"12px 16px 4px",padding:"18px 16px",borderRadius:16,background:"#111",color:"#fff",fontFamily}}>
      <div style={{fontSize:11,fontWeight:800,letterSpacing:"1px",color:pink}}>HOW POP-UPS WORK</div>
      <div style={{fontSize:15,fontWeight:700,marginTop:6}}>We bring the tables to you.</div>
      <div style={{fontSize:12.5,color:"#bbb",marginTop:4}}>Pick a zone and venue, choose a date, and the PingPod truck sets up on site.</div>
    </div>
  );
}
