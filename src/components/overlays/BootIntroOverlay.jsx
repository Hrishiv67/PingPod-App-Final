import React from "react";
import { DARK, PINK } from "../../theme";

export default function BootIntroOverlay() {
  return (
    <div style={{
    position: "fixed",
    inset: 0,
    zIndex: 1200,
    background: "radial-gradient(1200px 500px at 50% 0%, rgba(255,0,128,0.08), #fff 55%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  }}>
    <style>{`
      @keyframes bootHalo {
        0% { transform: scale(0.8); opacity: 0.28; }
        60% { transform: scale(1.2); opacity: 0; }
        100% { transform: scale(1.2); opacity: 0; }
      }
      @keyframes bootFloat {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
        100% { transform: translateY(0px); }
      }
      @keyframes bootBall {
        0%   { transform: translate(-50%, 0); }
        34%  { transform: translate(-50%, -18px); }
        68%  { transform: translate(-50%, 0); }
        100% { transform: translate(-50%, 0); }
      }
      @keyframes bootShadow {
        0% { transform: translateX(-50%) scale(1); opacity: 0.22; }
        34% { transform: translateX(-50%) scale(0.72); opacity: 0.10; }
        68% { transform: translateX(-50%) scale(1); opacity: 0.22; }
        100% { transform: translateX(-50%) scale(1); opacity: 0.22; }
      }
      @keyframes bootSheen {
        0% { transform: translateX(-160%); opacity: 0; }
        20% { opacity: 1; }
        58% { opacity: 1; }
        100% { transform: translateX(160%); opacity: 0; }
      }
      @keyframes bootText {
        0% { opacity: 0.2; letter-spacing: 1.2px; }
        50% { opacity: 1; letter-spacing: 1.8px; }
        100% { opacity: 0.2; letter-spacing: 1.2px; }
      }
    `}</style>

    <div style={{textAlign:"center",position:"relative",animation:"bootFloat 1.8s ease-in-out infinite"}}>
      <div style={{position:"absolute",left:"50%",top:6,width:136,height:136,transform:"translateX(-50%)",borderRadius:"50%",border:`2px solid ${PINK}1f`,animation:"bootHalo 1.5s ease-out infinite"}}/>
      <div style={{position:"absolute",left:"50%",top:6,width:136,height:136,transform:"translateX(-50%)",borderRadius:"50%",border:`2px solid ${PINK}19`,animation:"bootHalo 1.5s ease-out infinite 0.5s"}}/>

      <div style={{width:142,height:84,position:"relative",margin:"0 auto 18px"}}>
        <div style={{
          position:"absolute", left:4, right:4, bottom:0, height:42,
          clipPath:"polygon(8% 0, 82% 0, 100% 100%, 0 100%)",
          background:"linear-gradient(90deg,#121212 0 42%, #FF0080 42% 100%)",
          borderRadius:10,
          boxShadow:"0 8px 20px rgba(0,0,0,0.12)"
        }}/>
        <div style={{position:"absolute", left:34, right:36, bottom:19, height:15, background:"#fff", borderRadius:3}}/>
        <div style={{position:"absolute",left:4,right:4,bottom:0,top:9,overflow:"hidden",pointerEvents:"none",borderRadius:10}}>
          <div style={{
            position:"absolute", top:10, left:"50%", width:100, height:36,
            background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
            transform:"translateX(-160%)",
            animation:"bootSheen 1.25s ease-in-out infinite"
          }}/>
        </div>
        <div style={{position:"absolute", left:"50%", top:0, width:18, height:18, borderRadius:"50%", background:PINK, animation:"bootBall 0.95s ease-in-out infinite"}}/>
        <div style={{position:"absolute", left:"50%", top:23, width:24, height:8, borderRadius:"50%", background:"#000", filter:"blur(3px)", opacity:0.18, animation:"bootShadow 0.95s ease-in-out infinite"}}/>
      </div>

      <div style={{fontSize:24,fontWeight:800,letterSpacing:"-0.4px",color:DARK}}>PingPod</div>
      <div style={{fontSize:11,fontWeight:800,textTransform:"uppercase",color:"#8f8f8f",marginTop:6,animation:"bootText 1.25s ease-in-out infinite"}}>Loading your city experience</div>
    </div>
  </div>
  );
}
