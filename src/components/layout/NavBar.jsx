import React from "react";
import { useApp } from "../../context/AppContext";
import { PINK } from "../../theme";
import { CrewsIcon, Ic } from "../icons";

export default function NavBar() {
  const { S, goNav, nav, region, showToast } = useApp();
  const isIpad = typeof window!=="undefined" && window.innerWidth>=700;
  const navHeight = isIpad ? 68 : 64; // Adjust height for iPad padding
  const items = [
    {k:"book",         label:"Book",         node:<Ic.Book         c={nav==="book"         ?PINK:"#999"} s={isIpad?25:21}/>, enabled:true},
    {k:"coaching",     label:"Coaching",     node:<Ic.Coaching     c={nav==="coaching"     ?PINK:"#999"} s={isIpad?25:21}/>, enabled:!!region},
    {k:"reservations", label:"Reservations", node:<Ic.Reservations c={nav==="reservations" ?PINK:"#999"} s={isIpad?25:21}/>, enabled:!!region},
    {k:"programs",     label:"Programs",     node:<Ic.Programs     c={nav==="programs"     ?PINK:"#999"} s={isIpad?26:22}/>, enabled:!!region},
    {k:"crews",        label:"Crews",        node:<CrewsIcon       c={nav==="crews"        ?PINK:"#999"} s={isIpad?27:23}/>, enabled:!!region},
    {k:"popups",       label:"Pop-ups",      node:<Ic.Truck        c={nav==="popups"       ?PINK:"#999"} s={isIpad?26:22}/>, enabled:region==="Durham"},
    {k:"more",         label:"More",         node:<Ic.More         c={nav==="more"         ?PINK:"#999"} s={isIpad?25:21}/>, enabled:!!region},
  ];
  return (
    <div style={{...S.navWrap, height: navHeight}}>
      {items.map(({k,label,node,enabled})=>(
        <button key={k} style={{...S.navBtn(nav===k), ...(isIpad?{paddingTop:9,paddingBottom:8,fontSize:12,gap:6}:{}) ,opacity:enabled?1:0.45, cursor:enabled?"pointer":"not-allowed"}} onClick={()=>{
          if (enabled) goNav(k);
          else if (!region) showToast("Choose a region first");
          else if (k==="popups") showToast("Pop-ups are currently available in Durham only");
        }}>
          {node}<span style={{whiteSpace:"nowrap"}}>{label}</span>
          {nav===k&&<div style={S.navLine}/>}
        </button>
      ))}
    </div>
  );
}
