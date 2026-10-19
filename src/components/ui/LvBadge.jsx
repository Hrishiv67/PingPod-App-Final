import React from "react";

export default function LvBadge({level,color}) {
  return (
    <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:30,height:30,borderRadius:8,background:color+"22",flexShrink:0}}>
      <span style={{fontSize:9,fontWeight:800,color,letterSpacing:"-0.2px"}}>LV{level}</span>
    </div>
  );
}
