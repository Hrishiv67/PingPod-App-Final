import React from "react";
import { useApp } from "../../context/AppContext";
import { PINK } from "../../theme";

export default function AppLoadingOverlay() {
  const { appLoading } = useApp();
  if (!appLoading) return null;
  return (
    <div style={{
      position:"absolute", inset:0, zIndex:980,
      background:"#fff",
      display:"flex", alignItems:"center", justifyContent:"center",
      overflow:"hidden"
    }}>
      <style>{`
        @keyframes ppBall {
          0%   { transform: translate(-50%, 0); }
          35%  { transform: translate(-50%, -18px); }
          70%  { transform: translate(-50%, 0); }
          85%  { transform: translate(-50%, -6px); }
          100% { transform: translate(-50%, 0); }
        }
        @keyframes ppShadow {
          0%   { transform: translateX(-50%) scale(1); opacity: 0.20; }
          35%  { transform: translateX(-50%) scale(0.7); opacity: 0.10; }
          70%  { transform: translateX(-50%) scale(1); opacity: 0.20; }
          85%  { transform: translateX(-50%) scale(0.86); opacity: 0.14; }
          100% { transform: translateX(-50%) scale(1); opacity: 0.20; }
        }
        @keyframes ppSheen {
          0% { transform: translateX(-140%); opacity: 0; }
          20% { opacity: 1; }
          55% { opacity: 1; }
          100% { transform: translateX(140%); opacity: 0; }
        }
      `}</style>
      <div style={{textAlign:"center"}}>
        <div style={{width:120,height:70,position:"relative",margin:"0 auto 18px"}}>
          <div style={{
            position:"absolute", left:0, right:0, bottom:0, height:34,
            clipPath:"polygon(8% 0, 82% 0, 100% 100%, 0 100%)",
            background:"linear-gradient(90deg,#111 0 44%, #FF0080 44% 100%)",
            borderRadius:8
          }}/>
          <div style={{
            position:"absolute", left:24, right:28, bottom:15, height:14,
            background:"#fff",
            borderRadius:2
          }}/>
          <div style={{
            position:"absolute", left:0, right:0, bottom:0, top:8,
            overflow:"hidden", pointerEvents:"none", borderRadius:10
          }}>
            <div style={{
              position:"absolute", top:8, left:"50%", width:90, height:36,
              background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
              transform:"translateX(-140%)", animation:"ppSheen 1.1s ease-in-out infinite"
            }}/>
          </div>
          <div style={{
            position:"absolute", left:"50%", top:0,
            width:18, height:18, borderRadius:"50%",
            background:PINK,
            animation:"ppBall 0.9s ease-in-out infinite"
          }}/>
          <div style={{
            position:"absolute", left:"50%", top:22,
            width:22, height:8, borderRadius:"50%",
            background:"#000",
            filter:"blur(3px)",
            opacity:0.18,
            animation:"ppShadow 0.9s ease-in-out infinite"
          }}/>
        </div>
        <div style={{fontSize:12,fontWeight:700,color:"#999",letterSpacing:"1.5px",textTransform:"uppercase"}}>{appLoading.label || "Loading"}</div>
      </div>
    </div>
  );
}
