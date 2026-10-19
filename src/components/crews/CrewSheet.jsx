import React, { useEffect, useRef, useState } from "react";
import { CrewsIcon } from "../icons";

// ─── CrewSheet (defined outside main component to avoid hooks-in-render rule) ──
export default function CrewSheet({res, crews, crewName: crewNameProp, setCrewName, joinCrew, createCrew: createCrewParent, onDismiss, PINK, DARK, S, myCrew, leaveCrew, canJoinCrew, fromBooking, joinCrewFromBooking, createCrewFromBooking, addXpConfirmCrew, onConfirmAddXp, onSkipAddXp}) {
  const isIpadSheet = typeof window!=="undefined" && window.innerWidth>=700;
  const [tab, setTab] = useState("join");
  const [localName, setLocalName] = useState(crewNameProp||"");
  const [crewSize, setCrewSize] = useState("3–4");
  const [kbOffset, setKbOffset] = useState(0);
  const sheetRef = useRef(null);
  useEffect(()=>{
    const vv = window.visualViewport;
    if(!vv) return;
    const onResize = ()=>{
      const off = window.innerHeight - vv.height;
      setKbOffset(off > 40 ? off : 0);
    };
    vv.addEventListener("resize",onResize);
    vv.addEventListener("scroll",onResize);
    return ()=>{ vv.removeEventListener("resize",onResize); vv.removeEventListener("scroll",onResize); };
  },[]);
  const scrollInputVisible = (e)=>{
    setTimeout(()=>{ e.target.scrollIntoView({behavior:"smooth",block:"center"}); },300);
  };
  const joinOrCreate = fromBooking && (joinCrewFromBooking || createCrewFromBooking) ? { join: joinCrewFromBooking || joinCrew, create: createCrewFromBooking || createCrewParent } : { join: joinCrew, create: createCrewParent };
  const createCrew = () => {
    if(!localName.trim()) return;
    joinOrCreate.create(localName.trim());
  };
  const LvBadge = ({level,color}) => (
    <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:30,height:30,borderRadius:8,background:color+"22",flexShrink:0}}>
      <span style={{fontSize:9,fontWeight:800,color,letterSpacing:"-0.2px"}}>LV{level}</span>
    </div>
  );
  const XPBar = ({xp,max,color,h=5}) => (
    <div style={{width:"100%",height:h,background:"#eee",borderRadius:h/2,overflow:"hidden"}}>
      <div style={{width:`${Math.min(100,(xp/max)*100)}%`,height:"100%",background:color,borderRadius:h/2}}/>
    </div>
  );
  return (
    <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.45)",zIndex:500,display:"flex",flexDirection:"column",justifyContent:"flex-end"}} onClick={onDismiss}>
      <div ref={sheetRef} style={{background:"#fff",borderRadius:"20px 20px 0 0",maxHeight:"82vh",overflowY:"auto",marginLeft:"auto",marginRight:"auto",width:"100%",maxWidth:isIpadSheet?1024:760,transform:kbOffset?`translateY(-${kbOffset}px)`:"none",transition:"transform 0.2s ease-out"}} onClick={e=>e.stopPropagation()}>
        <div style={{padding:"16px 20px 0"}}>
          <div style={{width:32,height:4,background:"#ddd",borderRadius:2,margin:"0 auto 16px"}}/>
          {addXpConfirmCrew ? (
            <div style={{padding:"0 0 28px"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                <CrewsIcon c={PINK} s={24}/>
                <div>
                  <div style={{fontSize:17,fontWeight:800,letterSpacing:"-0.3px",color:DARK}}>Add this booking to your crew?</div>
                  <div style={{fontSize:12,color:"#888",marginTop:2}}>This booking will earn +150 XP for {addXpConfirmCrew.name}.</div>
                </div>
              </div>
              {res?.location && (
                <div style={{background:"#f9f9f9",borderRadius:8,padding:"9px 12px",marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:"#22c55e",flexShrink:0}}/>
                  <div style={{fontSize:12,color:"#666"}}>
                    <span style={{fontWeight:700,color:DARK}}>{res.location}</span>
                    {res.date&&<span style={{color:"#aaa"}}> · {res.date} · {res.time}</span>}
                  </div>
                </div>
              )}
              <div style={{background:`linear-gradient(135deg,${addXpConfirmCrew.color}0a 0%,${addXpConfirmCrew.color}04 100%)`,borderRadius:12,padding:"14px 16px",marginBottom:14,border:`1px solid ${addXpConfirmCrew.color}20`}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:40,height:40,borderRadius:10,background:addXpConfirmCrew.color+"12",border:`1.5px solid ${addXpConfirmCrew.color}25`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span style={{fontSize:7,fontWeight:900,color:addXpConfirmCrew.color,lineHeight:1}}>LV</span>
                    <span style={{fontSize:14,fontWeight:900,color:addXpConfirmCrew.color,lineHeight:1.1}}>{addXpConfirmCrew.level}</span>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:10,color:"#999",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:1}}>Your crew</div>
                    <div style={{fontWeight:800,fontSize:15,color:DARK,letterSpacing:"-0.2px"}}>{addXpConfirmCrew.name}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:10,color:"#999",marginBottom:1}}>Adding</div>
                    <div style={{fontSize:18,fontWeight:800,color:addXpConfirmCrew.color}}>+150 XP</div>
                  </div>
                </div>
              </div>
              <button onClick={()=>onConfirmAddXp&&onConfirmAddXp()}
                style={{width:"100%",padding:"13px",borderRadius:12,background:addXpConfirmCrew.color,border:"none",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:8}}>
                <CrewsIcon c="#fff" s={16}/> Add +150 XP to {addXpConfirmCrew.name}
              </button>
              <button onClick={()=>onSkipAddXp&&onSkipAddXp()}
                style={{width:"100%",padding:"10px",borderRadius:10,background:"#f7f7f7",border:"none",color:"#bbb",fontSize:12,fontWeight:500,cursor:"pointer"}}>
                Skip for now
              </button>
            </div>
          ) : (
            <>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
            <CrewsIcon c={PINK} s={24}/>
            <div>
              <div style={{fontSize:18,fontWeight:800,letterSpacing:"-0.3px",color:DARK}}>Join a Crew</div>
              <div style={{fontSize:12,color:"#aaa",marginTop:1}}>Play together. Earn XP. Unlock rewards.</div>
            </div>
          </div>
          {res?.location && (
            <div style={{background:"#f8f8f8",borderRadius:10,padding:"10px 14px",margin:"14px 0",display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:"#22c55e",flexShrink:0}}/>
              <div style={{fontSize:13,color:"#555"}}>
                <span style={{fontWeight:700,color:DARK}}>{res.location}</span>
                {res.date&&<span style={{color:"#999"}}> · {res.date} · {res.time}</span>}
              </div>
            </div>
          )}
          <div style={{display:"flex",borderBottom:"1px solid #eee",marginTop:8}}>
            {[["join","Join Existing"],["create","Create New"]].map(([k,l])=>(
              <button key={k} onClick={()=>setTab(k)}
                style={{flex:1,padding:"9px 0",border:"none",background:"none",fontWeight:tab===k?700:500,fontSize:13,color:tab===k?DARK:"#bbb",cursor:"pointer",borderBottom:tab===k?`2px solid ${PINK}`:"2px solid transparent",transition:"all 0.15s"}}>
                {l}
              </button>
            ))}
          </div>
          <div style={{padding:"14px 4px 36px"}}>
          {tab==="join" ? (
            <div>
              <div style={{fontSize:10,fontWeight:700,color:"#999",letterSpacing:"0.8px",textTransform:"uppercase",marginBottom:10}}>Open Crews Near You</div>
              {crews.slice(0,5).map(crew=>{
                const prereq = canJoinCrew ? canJoinCrew(crew) : {ok:true};
                const isMyCurrentCrew = myCrew?.id===crew.id;
                return (
                <div key={crew.id} onClick={()=>{ if(!prereq.ok||isMyCurrentCrew) return; joinOrCreate.join(crew); }}
                  style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,border:`1px solid ${isMyCurrentCrew?crew.color+"30":"#f0f0f0"}`,marginBottom:6,cursor:prereq.ok&&!isMyCurrentCrew?"pointer":"default",opacity:prereq.ok?1:0.5,background:isMyCurrentCrew?crew.color+"06":"#fff",transition:"box-shadow 0.15s"}}>
                  <LvBadge level={crew.level} color={crew.color}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:1}}>
                      <span style={{fontWeight:700,fontSize:14,color:DARK}}>{crew.name}</span>
                      {isMyCurrentCrew&&<span style={{fontSize:8,fontWeight:800,background:crew.color,color:"#fff",padding:"1px 5px",borderRadius:4}}>YOURS</span>}
                    </div>
                    <div style={{fontSize:11,color:"#888",marginBottom:4}}>{crew.members} members · {crew.location}</div>
                    <XPBar xp={crew.xp} max={5000} color={crew.color} h={3}/>
                    {!prereq.ok&&<div style={{fontSize:10,color:"#e97316",fontWeight:600,marginTop:3}}>⚠ {prereq.reason}</div>}
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontSize:12,fontWeight:700,color:crew.color}}>{crew.xp.toLocaleString()} XP</div>
                    {!isMyCurrentCrew&&prereq.ok&&<div style={{fontSize:10,color:"#22c55e",fontWeight:600,marginTop:2}}>Join →</div>}
                  </div>
                </div>
                );
              })}
              {myCrew&&leaveCrew&&(
                <button onClick={()=>{leaveCrew();onDismiss();}}
                  style={{width:"100%",padding:"10px",background:"#fff5f5",borderRadius:10,border:"1px solid #fecaca",color:"#ef4444",fontSize:12,fontWeight:600,cursor:"pointer",marginTop:4,marginBottom:2}}>
                  Leave {myCrew.name}
                </button>
              )}
              <button onClick={onDismiss} style={{width:"100%",padding:"11px 0",background:"#f7f7f7",borderRadius:10,border:"none",color:"#bbb",fontSize:13,cursor:"pointer",marginTop:4}}>Skip for now</button>
            </div>
          ) : (
            <div>
              <div style={{fontSize:10,fontWeight:700,color:"#999",letterSpacing:"0.8px",textTransform:"uppercase",marginBottom:10}}>Name Your Crew</div>
              <input value={localName} onChange={e=>setLocalName(e.target.value)} placeholder="e.g. Smash Bros, Spin Kings..."
                autoFocus onFocus={scrollInputVisible}
                style={{width:"100%",padding:"12px 14px",border:`1.5px solid ${localName?"#ddd":"#eee"}`,borderRadius:10,fontSize:16,fontWeight:600,outline:"none",boxSizing:"border-box",fontFamily:"inherit",marginBottom:18,transition:"border-color 0.15s"}}/>
              <div style={{fontSize:10,fontWeight:700,color:"#999",letterSpacing:"0.8px",textTransform:"uppercase",marginBottom:8}}>Crew Size</div>
              <div style={{display:"flex",gap:6,marginBottom:20}}>
                {["3–4","5–6","7–8"].map(o=>(
                  <button key={o} onClick={()=>setCrewSize(o)} style={{flex:1,padding:"9px 0",borderRadius:8,border:`1.5px solid ${crewSize===o?PINK:"#eee"}`,background:crewSize===o?PINK+"0a":"#fff",color:crewSize===o?PINK:"#999",fontSize:12,fontWeight:crewSize===o?700:500,cursor:"pointer",transition:"all 0.12s"}}>{o} Players</button>
                ))}
              </div>
              <button onClick={createCrew} disabled={!localName.trim()}
                style={{width:"100%",padding:"13px 0",borderRadius:10,background:localName.trim()?DARK:"#e8e8e8",color:localName.trim()?"#fff":"#bbb",border:"none",fontSize:14,fontWeight:700,cursor:localName.trim()?"pointer":"not-allowed",transition:"all 0.15s"}}>
                {localName.trim() ? `Create "${localName}" →` : "Enter a crew name"}
              </button>
              <button onClick={onDismiss} style={{width:"100%",padding:"10px 0",background:"none",border:"none",color:"#ccc",fontSize:12,cursor:"pointer",marginTop:4}}>Skip for now</button>
            </div>
          )}
        </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
