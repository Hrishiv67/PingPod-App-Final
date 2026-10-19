import React, { useState } from "react";

export default function CoachAvatar({coach, size=56}) {
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(false);
  const initials = coach.name.split(" ").map(w=>w[0]).join("").slice(0,2);
  return (
    <div style={{width:size,height:size,borderRadius:"50%",background:"linear-gradient(135deg,#FF0080,#FF6B6B)",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
      <span style={{color:"#fff",fontWeight:800,fontSize:size*0.3}}>{initials}</span>
      {!err && (
        <img src={coach.photo} alt={coach.name}
          onLoad={()=>setLoaded(true)} onError={()=>setErr(true)}
          style={{position:"absolute",inset:0,width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover",opacity:loaded?1:0,transition:"opacity 0.2s ease"}}/>
      )}
    </div>
  );
}
