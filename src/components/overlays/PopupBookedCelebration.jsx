import React from "react";
import { useApp } from "../../context/AppContext";

export default function PopupBookedCelebration() {
  const { popupBookedAnim, setNav, setPopupBookedAnim, setScreen } = useApp();
  const [tick, setTick] = React.useState(0);
  const anim = popupBookedAnim;
  React.useEffect(() => {
    if (!anim) return;
    const id = setInterval(() => setTick(t => Math.min(t + 1, 32)), 45);
    return () => clearInterval(id);
  }, [anim]);
  if (!anim) return null;
  const handleContinue = () => {
    setPopupBookedAnim(null);
    setScreen("reservations");
    setNav("reservations");
  };
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 920, background: "#fff",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      overflow: "hidden"
    }}>
      <div style={{position:"absolute",inset:0,pointerEvents:"none",background:"radial-gradient(ellipse 85% 58% at 50% 40%, #06B6D412 0%, transparent 62%)"}}/>
      <div style={{
        width: 78, height: 78, borderRadius: "50%", background: "#06B6D41a",
        border: "2px solid #06B6D440", display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 20, transform: tick<10 ? `scale(${0.9 + tick*0.01})` : "scale(1)", transition: "transform 0.2s ease"
      }}>
        <svg width="36" height="36" viewBox="0 0 32 32">
          <path d="M6 16 L13 23 L26 9" stroke="#06B6D4" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div style={{ color: "#888", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 6 }}>Pop-up booked</div>
      <div style={{ color: "#111", fontSize: 24, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 4, textAlign: "center", padding: "0 28px" }}>{anim.location}</div>
      <div style={{ color: "#666", fontSize: 13, marginBottom: 24 }}>{anim.date} · {anim.time} · {anim.dur}</div>
      <div style={{width: 300, maxWidth: "90%", background: "#fafafa", borderRadius: 20, border: "1px solid #06B6D430", padding: "18px 20px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div style={{fontSize:11,color:"#888",fontWeight:700,textTransform:"uppercase",letterSpacing:"1px"}}>Member total</div>
          <div style={{fontSize:22,fontWeight:800,color:"#06B6D4"}}>${anim.price}</div>
        </div>
        <div style={{fontSize:12,color:"#666",lineHeight:1.55}}>
          {anim.tables} table{anim.tables>1?"s":""} · {anim.address}
        </div>
      </div>
      <button onClick={handleContinue} style={{
        marginTop: 28, padding: "16px 32px", borderRadius: 14, border: "none",
        background: "linear-gradient(135deg,#06B6D4,#0EA5E9)", color: "#fff",
        fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 6px 24px rgba(6,182,212,0.35)",
        opacity: 1, transition: "none"
      }}>
        View reservations
      </button>
    </div>
  );
}
