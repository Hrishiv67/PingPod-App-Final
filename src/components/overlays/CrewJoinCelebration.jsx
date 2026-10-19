import React from "react";
import { useApp } from "../../context/AppContext";

export default function CrewJoinCelebration() {
  const { crewJoinAnim, setBooked, setCrewJoinAnim, setNav, setScreen } = useApp();
  const [tick, setTick] = React.useState(0);
  const [gone, setGone] = React.useState(false);
  React.useEffect(() => {
    const id = setInterval(() => setTick(t => Math.min(t + 1, 30)), 50);
    return () => clearInterval(id);
  }, []);
  const anim = crewJoinAnim;
  if (!anim || gone) return null;
  const handleCrew = () => {
    setCrewJoinAnim(null);
    setGone(true);
    setBooked(false);
    setScreen("crews");
    setNav("crews");
  };
  const handleReservations = () => {
    setCrewJoinAnim(null);
    setGone(true);
    setBooked(false);
    setScreen("reservations");
    setNav("reservations");
  };
  const xpBarWidth = Math.min(100, ((anim.crew.xp % 1000) / 1000) * 100);
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 900, background: "#fff",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      opacity: 1,
      overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 80% 50% at 50% 40%, ${anim.crew.color}10 0%, transparent 60%)`
      }} />

      {/* Dual checkmarks: session + XP */}
      <div style={{display:"flex",alignItems:"center",gap:18,marginBottom:18}}>
        <div style={{
          width:60,height:60,borderRadius:"50%",background:"#f0fff4",
          border:"2px solid #bbf7d0",display:"flex",alignItems:"center",justifyContent:"center"
        }}>
          <svg width="30" height="30" viewBox="0 0 32 32">
            <path d="M6 16 L13 23 L26 9" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{
          width:60,height:60,borderRadius:"50%",background:anim.crew.color+"14",
          border:`2px solid ${anim.crew.color}40`,display:"flex",alignItems:"center",justifyContent:"center"
        }}>
          <svg width="30" height="30" viewBox="0 0 32 32">
            <path d="M6 16 L13 23 L26 9" stroke={anim.crew.color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div style={{ color: "#888", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 6 }}>
        Session booked & Crew XP added
      </div>
      <div style={{ color: "#111", fontSize: 24, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 4, textAlign: "center", padding: "0 28px" }}>
        {anim.crew.name}
      </div>
      <div style={{ color: "#666", fontSize: 13, marginBottom: 24 }}>
        +{anim.xp} XP · {anim.crew.members} members · {anim.crew.location}
      </div>

      <div style={{
        width: 280, maxWidth: "90%", background: "#fafafa", borderRadius: 20,
        border: `1px solid ${anim.crew.color}30`, padding: "20px 22px"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <div style={{ color: "#888", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>This booking</div>
            <div style={{ color: anim.crew.color, fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px" }}>+{anim.xp} XP</div>
          </div>
          <div style={{ width: 50, height: 50, borderRadius: 14, background: anim.crew.color + "22", border: `1.5px solid ${anim.crew.color}45`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 8, fontWeight: 900, color: anim.crew.color }}>LV</span>
            <span style={{ fontSize: 17, fontWeight: 900, color: anim.crew.color, lineHeight: 1.1 }}>{anim.crew.level}</span>
          </div>
        </div>
        <div style={{ height: 5, background: "#eee", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${xpBarWidth}%`, background: `linear-gradient(90deg,${anim.crew.color},${anim.crew.color}cc)`, borderRadius: 3, transition: "width 0.8s ease" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ color: "#666", fontSize: 11 }}>{(anim.crew.xp % 1000).toLocaleString()} / 1,000 this level</span>
          <span style={{ color: anim.crew.color, fontSize: 11, fontWeight: 600 }}>→ Level {anim.crew.level + 1}</span>
        </div>
      </div>

      {/* Primary: go to crew */}
      <button onClick={handleCrew} style={{
        marginTop: 28, padding: "15px 32px", borderRadius: 14, border: "none",
        background: `linear-gradient(135deg,${anim.crew.color},${anim.crew.color}dd)`, color: "#fff",
        fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: `0 6px 24px ${anim.crew.color}50`,
        opacity: tick < 15 ? 0 : 1, transition: "opacity 0.25s ease"
      }}>
        View your crew
      </button>

      {/* Secondary: go to reservations */}
      <button onClick={handleReservations} style={{
        marginTop: 10, padding: "10px 22px", borderRadius: 12, border: "none",
        background: "none", color: "#666", fontSize: 14, fontWeight: 500, cursor: "pointer"
      }}>
        Go to reservations
      </button>
    </div>
  );
}
