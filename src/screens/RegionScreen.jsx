import React from "react";
import NavBar from "../components/layout/NavBar";
import Toast from "../components/layout/Toast";
import AppLoadingOverlay from "../components/overlays/AppLoadingOverlay";
import RegionEnterOverlay from "../components/overlays/RegionEnterOverlay";
import { useApp } from "../context/AppContext";
import { REG_IMG } from "../data/images";
import { REGIONS } from "../data/locations";
import { DARK } from "../theme";

export default function RegionScreen() {
  const { S, pickRegion, regionTransition } = useApp();
  return (
    <div style={{...S.root,position:"relative"}}>
      <Toast/>
      <AppLoadingOverlay/>
      <div style={{...S.contentMax,flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
        <div style={{...S.topBar,paddingBottom:14}}>
          <div style={{fontSize:22,fontWeight:700,color:DARK,letterSpacing:"-0.3px"}}>Choose a region</div>
        </div>
        <div style={S.scroll}>
          <div style={{padding:"12px 14px 32px"}}>
            {REGIONS.map(r=>(
              <div key={r} onClick={()=>pickRegion(r)}
                style={{borderRadius:18,overflow:"hidden",cursor:"pointer",marginBottom:10,position:"relative",height:175,maxHeight:220,background:"#1a1a1a"}}>
                <img src={REG_IMG[r]} alt={r} loading={r==="Durham" ? "eager" : "lazy"} style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",inset:0}}/>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.72) 0%,rgba(0,0,0,.05) 55%,transparent 100%)"}}/>
                <div style={{position:"absolute",bottom:14,left:14,color:"#fff",fontSize:20,fontWeight:700,letterSpacing:"-0.3px",textShadow:"0 1px 6px rgba(0,0,0,.5)"}}>{r}</div>
              </div>
            ))}
          </div>
        </div>
        <NavBar/>
      </div>
      {regionTransition && <RegionEnterOverlay regionName={regionTransition} />}
    </div>
  );
}
