import React from "react";
import { useApp } from "../../context/AppContext";
import { Ic } from "../icons";

export default function RegionHeader({rd, curTab, onTabChange}) {
  const { S, region, setScreen } = useApp();
  return (
    <div style={{...S.topBar,paddingBottom:0}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
        <div style={{display:"flex",alignItems:"center",gap:4}}>
          <button onClick={()=>setScreen("region")} style={{background:"none",border:"none",cursor:"pointer",padding:"2px 6px 2px 0",display:"flex"}}><Ic.ChevL/></button>
          <span style={{fontSize:20,fontWeight:700,letterSpacing:"-0.3px"}}>{region}</span>
          <Ic.ChevR c="#111" s={16}/>
        </div>
        <Ic.Bookmark s={22}/>
      </div>
      {rd&&rd.tabs&&(
        <div style={{...S.blueBar,marginBottom:0}}>
          {rd.tabs.map(t=><button key={t} style={S.blueTab(curTab===t)} onClick={()=>onTabChange(t)}>{t}</button>)}
        </div>
      )}
    </div>
  );
}
