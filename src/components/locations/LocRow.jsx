import React from "react";
import { useApp } from "../../context/AppContext";
import { REG_IMG, THUMB } from "../../data/images";
import { DARK } from "../../theme";

export default function LocRow({loc, onPress}) {
  const { S, region } = useApp();
  return (
    <div
      onClick={()=>{
        onPress && onPress(loc);
      }}
      style={{display:"flex",gap:12,padding:"14px 16px",cursor:"pointer",alignItems:"flex-start"}}
    >
      <img
        src={THUMB[loc.img] || (region === "Durham" ? REG_IMG["Durham"] : THUMB.les)}
        alt={loc.name}
        loading={region==="Durham" ? "eager" : "lazy"}
        onError={(e)=>{
          // Keep Durham cards from showing broken image placeholders on low-resource devices.
          const fallback = region === "Durham" ? REG_IMG["Durham"] : THUMB.les;
          if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
        }}
        style={{width:100,height:76,objectFit:"cover",borderRadius:8,flexShrink:0,background:"#ebebeb"}}/>
      <div style={{flex:1}}>
        <div style={{fontWeight:700,fontSize:16,marginBottom:1,color:DARK}}>{loc.name}</div>
        <div style={{color:"#888",fontSize:13.5}}>{loc.address}</div>
        <div style={{color:"#888",fontSize:13.5,marginBottom:7}}>{loc.city}</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {loc.types.map(t=><span key={t} style={S.badge}>{t}</span>)}
        </div>
      </div>
    </div>
  );
}
