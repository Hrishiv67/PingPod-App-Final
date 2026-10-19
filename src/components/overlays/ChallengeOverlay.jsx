import React from "react";
import { useApp } from "../../context/AppContext";
import { DARK, PINK } from "../../theme";

export default function ChallengeOverlay() {
  const { challengeAnim, setChallengeAnim, setNav, setScreen } = useApp();
  const [step, setStep] = React.useState(0);
  const ch = challengeAnim;
  React.useEffect(() => {
    if (!ch) return;
    const t1 = setTimeout(() => setStep(1), 100);
    const t2 = setTimeout(() => setStep(2), 800);
    const t3 = setTimeout(() => setStep(3), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [ch]);
  if (!ch) return null;
  const dismiss = () => { setChallengeAnim(null); setScreen("crews"); setNav("crews"); };
  return (
    <div onClick={dismiss} style={{
      position:"absolute",inset:0,zIndex:900,background:"#fff",
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      cursor:"pointer",overflow:"hidden"
    }}>
      <div style={{position:"absolute",inset:0,pointerEvents:"none",background:`radial-gradient(ellipse 90% 60% at 50% 40%, ${PINK}10 0%, transparent 60%)`}}/>
      <div style={{display:"flex",alignItems:"center",gap:24,marginBottom:28}}>
        <div style={{
          transform:step>=1?"translateX(0) scale(1)":"translateX(-40px) scale(0.8)",opacity:step>=1?1:0,
          transition:"all 0.5s cubic-bezier(0.34,1.56,0.64,1)",textAlign:"center"
        }}>
          <div style={{width:56,height:56,borderRadius:16,background:ch.myCrew.color+"18",border:`2px solid ${ch.myCrew.color}40`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",margin:"0 auto 8px"}}>
            <span style={{fontSize:7,fontWeight:900,color:ch.myCrew.color}}>LV</span>
            <span style={{fontSize:18,fontWeight:900,color:ch.myCrew.color,lineHeight:1}}>{ch.myCrew.level}</span>
          </div>
          <div style={{fontSize:13,fontWeight:700,color:DARK,maxWidth:80,lineHeight:1.2}}>{ch.myCrew.name}</div>
        </div>
        <div style={{
          opacity:step>=2?1:0,transform:step>=2?"scale(1)":"scale(0.3)",
          transition:"all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          fontSize:28,fontWeight:900,color:PINK,letterSpacing:"-1px"
        }}>VS</div>
        <div style={{
          transform:step>=1?"translateX(0) scale(1)":"translateX(40px) scale(0.8)",opacity:step>=1?1:0,
          transition:"all 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.15s",textAlign:"center"
        }}>
          <div style={{width:56,height:56,borderRadius:16,background:ch.opponent.color+"18",border:`2px solid ${ch.opponent.color}40`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",margin:"0 auto 8px"}}>
            <span style={{fontSize:7,fontWeight:900,color:ch.opponent.color}}>LV</span>
            <span style={{fontSize:18,fontWeight:900,color:ch.opponent.color,lineHeight:1}}>{ch.opponent.level}</span>
          </div>
          <div style={{fontSize:13,fontWeight:700,color:DARK,maxWidth:80,lineHeight:1.2}}>{ch.opponent.name}</div>
        </div>
      </div>
      <div style={{
        opacity:step>=3?1:0,transform:step>=3?"translateY(0)":"translateY(12px)",
        transition:"all 0.4s ease",textAlign:"center"
      }}>
        <div style={{fontSize:12,fontWeight:700,color:"#888",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:6}}>Challenge Sent</div>
        <div style={{fontSize:20,fontWeight:800,color:DARK,letterSpacing:"-0.5px",marginBottom:4}}>Winner gets +1,000 XP</div>
        <div style={{fontSize:13,color:"#888",marginBottom:24}}>Your crew will be notified</div>
        <div style={{padding:"14px 28px",borderRadius:14,background:DARK,color:"#fff",fontSize:15,fontWeight:700,display:"inline-block"}}>
          Back to Crews
        </div>
      </div>
    </div>
  );
}
