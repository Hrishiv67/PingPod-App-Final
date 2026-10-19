import React from "react";
import { useApp } from "../../context/AppContext";
import { DARK } from "../../theme";

export default function Toast() {
  const { isIpadLayout, toast } = useApp();
  return (
    <>
      <div style={{position:"absolute",top:isIpadLayout?12:10,left:isIpadLayout?18:14,zIndex:2,pointerEvents:"none",opacity:0.88,mixBlendMode:"multiply"}}>
        <img
          src="/pingpod-logo.png"
          alt="PingPod"
          loading="eager"
          decoding="async"
          onError={(e)=>{ if(e.currentTarget.src!=="/pingpod-logo.webp") e.currentTarget.src="/pingpod-logo.webp"; }}
          style={{height:isIpadLayout?30:26,width:"auto",display:"block",objectFit:"contain",userSelect:"none"}}
        />
      </div>
      {toast ? (
        <div style={{position:"absolute",top:62,left:"50%",transform:"translateX(-50%)",background:DARK,color:"#fff",padding:"10px 20px",borderRadius:22,fontSize:13,fontWeight:600,zIndex:900,whiteSpace:"nowrap",boxShadow:"0 4px 20px rgba(0,0,0,.3)",pointerEvents:"none"}}>
          {toast}
        </div>
      ) : null}
    </>
  );
}
