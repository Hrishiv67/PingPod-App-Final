import React from "react";

// TODO: placeholder. The original PopupDurhamMap.jsx was never committed to this repo;
// replace this file with it (it lives in src/components/ of the local Netlify project).
// Props: center, zones, zonePolygons, selectedZoneId, venues, selectedVenueId, pink.
export default function PopupDurhamMap({ zones = [], selectedZoneId, venues = [], selectedVenueId, pink }) {
  const zone = zones.find((z) => z.id === selectedZoneId);
  return (
    <div style={{margin:"4px 16px 12px",padding:"14px 16px",borderRadius:14,border:"1px solid #ededed",background:"#fafafa"}}>
      <div style={{fontSize:12,fontWeight:800,color:"#111"}}>{zone ? zone.name : "Durham pop-up venues"}</div>
      <div style={{fontSize:11.5,color:"#888",marginTop:2}}>{venues.length} available venue{venues.length===1?"":"s"}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:10}}>
        {venues.map((v) => (
          <span key={v.id} style={{fontSize:11,padding:"4px 9px",borderRadius:12,border:`1px solid ${v.id===selectedVenueId?pink:"#e5e5e5"}`,color:v.id===selectedVenueId?pink:"#555",background:"#fff"}}>
            {v.name}
          </span>
        ))}
      </div>
    </div>
  );
}
