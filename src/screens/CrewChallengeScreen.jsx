import React from "react";
import { Ic } from "../components/icons";
import NavBar from "../components/layout/NavBar";
import Toast from "../components/layout/Toast";
import ChallengeOverlay from "../components/overlays/ChallengeOverlay";
import { useApp } from "../context/AppContext";
import { DARK, PINK } from "../theme";

export default function CrewChallengeScreen() {
  const { S, challengeAnim, crews, myCrew, region, setChallengeAnim, setScreen, showToast } = useApp();
  // Challangeable crews: same region, not my own crew
  const challengeable = crews.filter(c => c.region===(myCrew?.region||region) && c.id!==myCrew?.id);
  // Group by location
  const byLoc = {};
  challengeable.forEach(c=>{
    if(!byLoc[c.location]) byLoc[c.location]=[];
    byLoc[c.location].push(c);
  });
  // Special event crews (cross-region)
  const crossRegion = crews.filter(c=>c.region!==(myCrew?.region||region) && c.id!==myCrew?.id).slice(0,3);
  return (
    <div style={S.root}>
      <Toast/>
      {challengeAnim&&<ChallengeOverlay/>}
      <div style={{...S.contentMax,flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
      <div style={{background:"#0a0a14",flexShrink:0,padding:"52px 20px 14px",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
          <button onClick={()=>setScreen("crews")} style={{background:"none",border:"none",cursor:"pointer",display:"flex",padding:"2px 8px 2px 0"}}>
            <Ic.ChevL c="#fff"/>
          </button>
          <span style={{fontSize:20,fontWeight:800,color:"#fff",letterSpacing:"-0.4px"}}>⚔️ Crew Challenge</span>
        </div>
        <div style={{color:"rgba(255,255,255,0.35)",fontSize:13,paddingLeft:2}}>
          Challenge crews from your home pods. Win = +1,000 Crew XP.
        </div>
        {myCrew&&(
          <div style={{marginTop:12,background:"rgba(255,255,255,0.05)",borderRadius:12,padding:"10px 14px",display:"flex",alignItems:"center",gap:10,border:"1px solid rgba(255,255,255,0.08)"}}>
            <div style={{width:32,height:32,borderRadius:9,background:myCrew.color+"30",border:`1px solid ${myCrew.color}50`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <span style={{fontSize:6,fontWeight:900,color:myCrew.color}}>LV</span>
              <span style={{fontSize:12,fontWeight:900,color:myCrew.color,lineHeight:1.1}}>{myCrew.level}</span>
            </div>
            <div>
              <div style={{color:"rgba(255,255,255,0.4)",fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.8px"}}>Challenging as</div>
              <div style={{color:"#fff",fontWeight:700,fontSize:14}}>{myCrew.name}</div>
            </div>
            <div style={{marginLeft:"auto",textAlign:"right"}}>
              <div style={{color:myCrew.color,fontWeight:800,fontSize:16}}>{myCrew.xp.toLocaleString()}</div>
              <div style={{color:"rgba(255,255,255,0.25)",fontSize:10}}>XP</div>
            </div>
          </div>
        )}
      </div>
      <div style={S.scroll}>
        {Object.entries(byLoc).map(([loc, locCrews])=>(
          <div key={loc}>
            <div style={{padding:"16px 16px 8px",display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:PINK,flexShrink:0}}/>
              <span style={{fontSize:12,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:"0.8px"}}>{loc}</span>
            </div>
            {locCrews.map(opp=>(
              <div key={opp.id} style={{margin:"0 16px 8px",borderRadius:16,background:"#fff",border:"1px solid #eee",overflow:"hidden",cursor:"pointer"}}
                onClick={()=>{ if(myCrew) setChallengeAnim({myCrew,opponent:opp}); else showToast("Join a crew first"); }}>
                <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px"}}>
                  <div style={{width:42,height:42,borderRadius:12,background:opp.color+"18",border:`1px solid ${opp.color}30`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span style={{fontSize:7,fontWeight:900,color:opp.color}}>LV</span>
                    <span style={{fontSize:14,fontWeight:900,color:opp.color,lineHeight:1.1}}>{opp.level}</span>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:700,fontSize:15,color:DARK,marginBottom:3}}>{opp.name}</div>
                    <div style={{fontSize:12,color:"#888",marginBottom:6}}>{opp.members} members · {opp.streak}W streak</div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{flex:1,height:3,background:"#f0f0f0",borderRadius:2}}>
                        <div style={{height:"100%",width:`${Math.min(100,(opp.xp/6000)*100)}%`,background:opp.color,borderRadius:2}}/>
                      </div>
                      <span style={{fontSize:11,fontWeight:700,color:opp.color,flexShrink:0}}>{opp.xp.toLocaleString()} XP</span>
                    </div>
                  </div>
                  <div style={{flexShrink:0,background:DARK,borderRadius:10,padding:"8px 14px"}}>
                    <span style={{color:"#fff",fontSize:12,fontWeight:700}}>Challenge</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        {crossRegion.length>0&&(
          <div>
            <div style={{padding:"16px 16px 8px",display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:"#F59E0B",flexShrink:0}}/>
              <span style={{fontSize:12,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:"0.8px"}}>Special Events — Cross-City</span>
              <span style={{background:"#F59E0B18",color:"#F59E0B",fontSize:9,fontWeight:800,padding:"2px 7px",borderRadius:5,border:"1px solid #F59E0B30"}}>INVITE ONLY</span>
            </div>
            {crossRegion.map(opp=>(
              <div key={opp.id} style={{margin:"0 16px 8px",borderRadius:16,background:"linear-gradient(135deg,#fffbf0 0%,#fff 100%)",border:"1px solid #F59E0B30",overflow:"hidden",cursor:"pointer"}}
                onClick={()=>{ if(myCrew) setChallengeAnim({myCrew,opponent:opp}); else showToast("Join a crew first"); }}>
                <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px"}}>
                  <div style={{width:42,height:42,borderRadius:12,background:opp.color+"18",border:`1px solid ${opp.color}30`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span style={{fontSize:7,fontWeight:900,color:opp.color}}>LV</span>
                    <span style={{fontSize:14,fontWeight:900,color:opp.color,lineHeight:1.1}}>{opp.level}</span>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                      <span style={{fontWeight:700,fontSize:15,color:DARK}}>{opp.name}</span>
                      <span style={{fontSize:9,fontWeight:700,color:"#F59E0B",background:"#F59E0B18",padding:"1px 6px",borderRadius:4}}>{opp.region}</span>
                    </div>
                    <div style={{fontSize:12,color:"#888"}}>{opp.members} members · {opp.xp.toLocaleString()} XP</div>
                  </div>
                  <div style={{flexShrink:0,background:"#F59E0B",borderRadius:10,padding:"8px 14px"}}>
                    <span style={{color:"#fff",fontSize:12,fontWeight:700}}>Challenge</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{height:32}}/>
      </div>
      <NavBar/>
      </div>
    </div>
  );
}
