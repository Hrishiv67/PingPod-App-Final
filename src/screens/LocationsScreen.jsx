import React from "react";
import NavBar from "../components/layout/NavBar";
import Toast from "../components/layout/Toast";
import LocRow from "../components/locations/LocRow";
import RegionHeader from "../components/locations/RegionHeader";
import Divider from "../components/ui/Divider";
import { useApp } from "../context/AppContext";
import { DURHAM_CRITICAL_LOCATION, LOCS } from "../data/locations";
import { DARK, PINK } from "../theme";

export default function LocationsScreen() {
  const { S, locTab, openBooking, region, setLocTab } = useApp();
  const rd = LOCS[region];
  const rawLocs = rd.tabs ? (rd[locTab]||[]) : (rd.default||[]);
  const locs = (() => {
    if (region !== "Durham") return rawLocs;
    const hasCorcoran = rawLocs.some((loc) => {
      const nm = (loc?.name || "").toLowerCase();
      const addr = (loc?.address || "").toLowerCase();
      return nm.includes("downtown durham") || addr.includes("110 corcoran");
    });
    return hasCorcoran ? rawLocs : [DURHAM_CRITICAL_LOCATION, ...rawLocs];
  })();
  return (
    <div style={S.root}>
      <Toast/>
      <div style={{...S.contentMax,flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
        <RegionHeader rd={rd} curTab={locTab} onTabChange={t=>setLocTab(t)}/>
        <div style={S.scroll}>
          {locs.map((loc,i)=>(
            <div key={loc.id}><LocRow loc={loc} onPress={openBooking}/>{i<locs.length-1&&<Divider/>}</div>
          ))}
          {rd.membersOnly&&(
            <div style={{padding:"20px 16px 8px"}}>
              <div style={{fontSize:18,fontWeight:700,color:DARK,marginBottom:12}}>Members Only Events</div>
              <div style={{display:"flex",alignItems:"center",gap:14,padding:"4px 0"}}>
                <div style={{width:58,height:40,background:"#111",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",flexShrink:0}}>
                  <div style={{width:32,height:7,background:"#fff",borderRadius:1}}/>
                  <div style={{position:"absolute",right:0,top:0,bottom:0,width:12,background:PINK,clipPath:"polygon(40% 0,100% 0,100% 100%,0 100%)"}}/>
                  <div style={{position:"absolute",left:7,top:"50%",transform:"translateY(-50%)",width:5,height:5,borderRadius:"50%",background:PINK}}/>
                </div>
                <span style={{color:PINK,fontSize:15,fontWeight:600}}>Coming soon!</span>
              </div>
            </div>
          )}
          <div style={{height:20}}/>
        </div>
        <NavBar/>
      </div>
    </div>
  );
}
