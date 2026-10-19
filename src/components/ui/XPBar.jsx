import React from "react";
import { PINK } from "../../theme";

export default function XPBar({xp,max,color=PINK,h=5}) {
  return (
    <div style={{width:"100%",height:h,background:"#eee",borderRadius:h/2,overflow:"hidden"}}>
      <div style={{width:`${Math.min(100,(xp/max)*100)}%`,height:"100%",background:color,borderRadius:h/2}}/>
    </div>
  );
}
