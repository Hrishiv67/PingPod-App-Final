import React, { useState } from "react";

export default function CrewTutorial({ onClose }) {
  const PINK = "#FF0080";
  const DARK = "#111";
  const BORDER = "#ececf1";

  const slides = [
    {
      id: "book",
      tag: "01",
      title: "Book any table",
      subtitle: "Choose pod, time, and duration in a few taps.",
      bullets: ["Live availability", "Transparent pricing", "Instant confirmation"],
      accent: "#fdf2f8",
      icon: "BOOK",
    },
    {
      id: "crew",
      tag: "02",
      title: "Join or create a crew",
      subtitle: "Play with your people and track progress together.",
      bullets: ["Open or invite-only crews", "Shared crew profile", "Easy member invites"],
      accent: "#f5f3ff",
      icon: "CREW",
    },
    {
      id: "xp",
      tag: "03",
      title: "Earn Crew XP",
      subtitle: "Bookings and events add XP to the whole team.",
      bullets: ["Automatic XP tracking", "Weekly activity summary", "Team-based progression"],
      accent: "#eff6ff",
      icon: "XP",
    },
    {
      id: "tiers",
      tag: "04",
      title: "Unlock reward tiers",
      subtitle: "Level up from Rookie to Legend for real perks.",
      bullets: ["Discounts and free hours", "Special event access", "Crew-only benefits"],
      accent: "#f0fdf4",
      icon: "TIER",
    },
    {
      id: "challenge",
      tag: "05",
      title: "Challenge other crews",
      subtitle: "Set matches, compete, and win bonus XP.",
      bullets: ["Crew-vs-crew matchups", "XP stakes", "Track rival records"],
      accent: "#fff7ed",
      icon: "VS",
    },
  ];

  const [idx, setIdx] = useState(0);
  const slide = slides[idx];
  const isLast = idx === slides.length - 1;

  const next = () => setIdx((p) => (p + 1) % slides.length);
  const prev = () => setIdx((p) => (p === 0 ? slides.length - 1 : p - 1));

  const MiniVisual = ({ icon, accent }) => {
    if (icon === "BOOK") {
      return (
        <div style={{background:accent,border:"1px solid #f0d3e5",borderRadius:14,padding:12}}>
          <div style={{fontSize:12,fontWeight:700,color:"#7d245d",marginBottom:8}}>Tonight</div>
          <div style={{background:"#fff",border:`1px solid ${BORDER}`,borderRadius:10,padding:"8px 10px",fontSize:12,fontWeight:600,marginBottom:6}}>Open Pod - 7:00 PM</div>
          <div style={{background:"#fff",border:`1px solid ${BORDER}`,borderRadius:10,padding:"8px 10px",fontSize:12,fontWeight:600}}>Private Pod - 8:00 PM</div>
        </div>
      );
    }
    if (icon === "CREW") {
      return (
        <div style={{background:accent,border:"1px solid #ddd6fe",borderRadius:14,padding:12}}>
          {["East Side Syndicate","Bull City Spin","Queens Uprising"].map((n)=> (
            <div key={n} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"#fff",border:`1px solid ${BORDER}`,borderRadius:10,padding:"7px 9px",fontSize:11,fontWeight:600,marginBottom:6}}>
              <span>{n}</span><span style={{color:PINK}}>Join</span>
            </div>
          ))}
        </div>
      );
    }
    if (icon === "XP") {
      return (
        <div style={{background:accent,border:"1px solid #dbeafe",borderRadius:14,padding:12,textAlign:"center"}}>
          <div style={{fontSize:30,fontWeight:800,color:PINK,lineHeight:1}}>+260</div>
          <div style={{fontSize:11,color:"#667",fontWeight:700,marginBottom:10}}>Crew XP this week</div>
          <div style={{height:6,background:"#e5e7eb",borderRadius:5,overflow:"hidden"}}><div style={{height:"100%",width:"78%",background:`linear-gradient(90deg, ${PINK}, #7c3aed)`}}/></div>
        </div>
      );
    }
    if (icon === "TIER") {
      return (
        <div style={{background:accent,border:"1px solid #bbf7d0",borderRadius:14,padding:12}}>
          {["Rookie","Core Crew","Elite Crew","Legend"].map((t,i)=>(
            <div key={t} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"#fff",border:`1px solid ${BORDER}`,borderRadius:10,padding:"7px 9px",fontSize:11,fontWeight:700,marginBottom:6,color:i===3?PINK:DARK}}>
              <span>{t}</span><span>{["0","5K","10K","20K"][i]} XP</span>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div style={{background:accent,border:"1px solid #fed7aa",borderRadius:14,padding:12,textAlign:"center"}}>
        <div style={{fontSize:12,fontWeight:800,color:"#9a3412",marginBottom:6}}>Crew Match</div>
        <div style={{background:"#fff",border:`1px solid ${BORDER}`,borderRadius:10,padding:"8px 10px",fontSize:12,fontWeight:700}}>East Side vs Bull City</div>
        <div style={{marginTop:8,fontSize:11,fontWeight:700,color:PINK}}>Winner: +500 XP</div>
      </div>
    );
  };

  return (
    <div style={{position:"fixed",inset:0,zIndex:800,background:"rgba(8,8,14,0.72)",display:"flex",alignItems:"center",justifyContent:"center",padding:12}}>
      <div style={{width:"min(860px, 96vw)",maxHeight:"92vh",overflow:"auto",background:"#fff",borderRadius:18,border:`1px solid ${BORDER}`,boxShadow:"0 24px 60px rgba(0,0,0,0.22)"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 14px 10px",borderBottom:`1px solid ${BORDER}`}}>
          <div>
            <div style={{fontSize:16,fontWeight:800,color:DARK}}>CrewPass - How it works</div>
            <div style={{fontSize:12,color:"#7a7a88"}}>Simple 5-step overview</div>
          </div>
          <button onClick={onClose} style={{width:32,height:32,borderRadius:16,border:`1px solid ${BORDER}`,background:"#fff",fontSize:18,cursor:"pointer"}}>x</button>
        </div>

        <div style={{padding:"12px 14px 14px"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5, minmax(0,1fr))",gap:6,marginBottom:12}}>
            {slides.map((s,i)=>(
              <button key={s.id} onClick={()=>setIdx(i)} style={{border:`1px solid ${i===idx?PINK:BORDER}`,background:i===idx?"#fff0f7":"#fff",color:i===idx?PINK:"#666",borderRadius:9,padding:"6px 4px",fontSize:10,fontWeight:800,cursor:"pointer"}}>{s.tag}</button>
            ))}
          </div>

          <div style={{display:"grid",gridTemplateColumns:"minmax(0, 1fr)",gap:12}}>
            <MiniVisual icon={slide.icon} accent={slide.accent} />
            <div>
              <div style={{fontSize:11,fontWeight:800,color:PINK,letterSpacing:"1px",textTransform:"uppercase",marginBottom:6}}>Step {slide.tag}</div>
              <div style={{fontSize:24,fontWeight:800,color:DARK,letterSpacing:"-0.4px",lineHeight:1.15,marginBottom:6}}>{slide.title}</div>
              <div style={{fontSize:14,color:"#555",lineHeight:1.6,marginBottom:10}}>{slide.subtitle}</div>
              <div style={{display:"grid",gap:6}}>
                {slide.bullets.map((b)=>(
                  <div key={b} style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:"#555"}}>
                    <div style={{width:6,height:6,borderRadius:99,background:PINK,flexShrink:0}} />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{display:"flex",gap:8,marginTop:14}}>
            <button onClick={prev} style={{flex:1,height:46,borderRadius:12,border:`1px solid ${BORDER}`,background:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}}>Back</button>
            <button onClick={next} style={{flex:2,height:46,borderRadius:12,border:"none",background:PINK,color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer"}}>{isLast?"Watch again":"Next"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
