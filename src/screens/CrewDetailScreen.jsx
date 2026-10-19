import React from "react";
import { Ic } from "../components/icons";
import NavBar from "../components/layout/NavBar";
import { useApp } from "../context/AppContext";
import { DARK, PINK } from "../theme";

export default function CrewDetailScreen() {
  const { S, crewDetail, setCrewDetail, setScreen } = useApp();
  const cd = crewDetail;
  const ROLE_COLORS = {"Captain":PINK,"Anchor":"#7C3AED","Wildcard":"#F59E0B","Attacker":"#EF4444",
    "Blocker":"#0EA5E9","Strategist":"#7C3AED","Returner":"#10B981","Defender":"#0EA5E9",
    "Server":"#F59E0B","Technician":"#0EA5E9","Closer":"#EF4444","Motivator":"#F59E0B",
    "Veteran":"#8B8FA8","Rising":"#10B981","Spinner":"#7C3AED","Hitter":"#EF4444"};
  return (
    <div style={S.root}>
      <div style={{...S.contentMax,flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
      <div style={{background:`linear-gradient(170deg,${cd.color}18 0%,#f8f9fa 100%)`,borderBottom:`1px solid ${cd.color}20`,flexShrink:0,padding:"54px 20px 20px"}}>
        <button onClick={()=>{setCrewDetail(null);setScreen("crews");}}
          style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(0,0,0,0.07)",border:"1px solid rgba(0,0,0,0.1)",borderRadius:20,padding:"7px 14px",color:"rgba(0,0,0,0.6)",fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:20}}>
          <Ic.ChevL c="rgba(0,0,0,0.5)" s={15}/> Crews
        </button>
        <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
          <div style={{width:54,height:54,borderRadius:16,background:cd.color+"20",border:`1.5px solid ${cd.color}40`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0,gap:1}}>
            <span style={{fontSize:8,fontWeight:900,color:cd.color,letterSpacing:"0.3px",textTransform:"uppercase"}}>LV</span>
            <span style={{fontSize:18,fontWeight:900,color:cd.color,lineHeight:1}}>{cd.level}</span>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:6}}>
              <span style={{background:cd.color+"20",color:cd.color,fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:10,border:`1px solid ${cd.color}30`}}>{cd.tag}</span>
              <span style={{background:"rgba(0,0,0,0.06)",color:"rgba(0,0,0,0.4)",fontSize:10,fontWeight:600,padding:"3px 10px",borderRadius:10}}>Est. {cd.founded}</span>
            </div>
            <div style={{color:DARK,fontWeight:800,fontSize:22,letterSpacing:"-0.6px",lineHeight:1.15,marginBottom:4}}>{cd.name}</div>
            <div style={{color:"#888",fontSize:12}}>{cd.homeTable}</div>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            <div style={{color:cd.color,fontWeight:800,fontSize:22,letterSpacing:"-0.5px"}}>{cd.xp.toLocaleString()}</div>
            <div style={{color:"#999",fontSize:10,marginTop:1}}>XP</div>
          </div>
        </div>
        <div style={{display:"flex",gap:8,marginTop:16}}>
          {[{l:"Members",v:cd.members},{l:"Win Streak",v:`${cd.streak}W`},{l:"Location",v:cd.location}].map(({l,v})=>(
            <div key={l} style={{flex:1,background:"rgba(255,255,255,0.7)",borderRadius:10,padding:"10px 6px",textAlign:"center",border:"1px solid rgba(0,0,0,0.08)"}}>
              <div style={{color:DARK,fontWeight:800,fontSize:14}}>{v}</div>
              <div style={{color:"#888",fontSize:10,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={S.scroll}>
        <div style={{margin:"16px 16px 0",background:"#fafafa",borderRadius:16,padding:"18px",border:"1px solid #eeeeee"}}>
          <div style={{color:"#555",fontSize:10,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",marginBottom:8}}>Crew Vibe</div>
          <div style={{color:"#111",fontSize:13.5,lineHeight:1.75,fontStyle:"italic"}}>"{cd.vibe}"</div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:12,paddingTop:12,borderTop:"1px solid #f0f0f0"}}>
            <div style={{width:3,height:20,background:cd.color,borderRadius:2,flexShrink:0}}/>
            <div style={{color:DARK,fontSize:14,fontWeight:700}}>{cd.motto}</div>
          </div>
        </div>
        <div style={{padding:"16px 16px 0"}}>
          <div style={{color:"#555",fontSize:10,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",marginBottom:12}}>Roster — {cd.players.length} Players</div>
          {cd.players.map((p,i)=>{
            const rc=ROLE_COLORS[p.role]||"#666";
            const initials=p.name.split(" ").map(w=>w[0]).join("").toUpperCase();
            return (
              <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:i<cd.players.length-1?"1px solid #f5f5f5":"none"}}>
                <div style={{width:40,height:40,borderRadius:12,background:rc+"18",border:`1px solid ${rc}28`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{color:rc,fontWeight:800,fontSize:11}}>{initials}</span>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{color:"#111",fontWeight:700,fontSize:14}}>{p.name}</div>
                  <div style={{color:"#555",fontSize:12,marginTop:1}}>{p.style}</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{background:rc+"18",color:rc,fontSize:9,fontWeight:800,padding:"3px 8px",borderRadius:8,marginBottom:3,letterSpacing:"0.3px"}}>{p.role.toUpperCase()}</div>
                  <div style={{color:"#444",fontSize:10}}>{p.rating}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{height:32}}/>
      </div>
      </div>
      <NavBar/>
    </div>
  );
}
