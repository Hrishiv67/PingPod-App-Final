import React from "react";
import CrewSheet from "../components/crews/CrewSheet";
import { CrewsIcon, Ic } from "../components/icons";
import NavBar from "../components/layout/NavBar";
import Toast from "../components/layout/Toast";
import CrewJoinCelebration from "../components/overlays/CrewJoinCelebration";
import CrewTutorial from "../components/tutorial/CrewTutorial";
import { useApp } from "../context/AppContext";
import { DARK, PINK } from "../theme";
import { tierForCrewLevel } from "../utils/crewTiers";

export default function CrewsScreen() {
  const {
    S, canJoinCrew, createCrew, crewJoinAnim, crewName, crewSort, crews, crewsScrollRef,
    crewsScrolled, joinCrew, leaveCrew, modal, myCrew, region, setCrewDetail, setCrewName,
    setCrewSort, setCrewsScrolled, setModal, setNav, setScreen, setSelTier, setShowTutorial,
    showTutorial,
  } = useApp();
  const sortOpts=[["XP","Top XP"],["Streak","Streak"],["Members","Active"]];
  const regionCrews = crews.filter(c => !region || c.region === region);
  const sorted=[...regionCrews].sort((a,b)=>{
    if(crewSort==="Streak") return b.streak-a.streak;
    if(crewSort==="Members") return b.members-a.members;
    return b.xp-a.xp;
  });
  const myRank=myCrew?sorted.findIndex(c=>c.id===myCrew.id)+1:null;
  const TIER_SUMMARY=[
    {lv:1, label:"Rookie",     color:"#8B8FA8",abbr:"TT",  short:"Profile & XP Tracking"},
    {lv:3, label:"Rising Crew",color:"#10B981",abbr:"EV",  short:"Invite-Only Events"},
    {lv:5, label:"Core Crew",  color:"#0EA5E9",abbr:"15%", short:"15% Crew Discounts"},
    {lv:7, label:"Elite Crew", color:"#7C3AED",abbr:"ELT", short:"Free Hours + Priority"},
    {lv:10,label:"Legend",     color:PINK,     abbr:"LEG", short:"Gear + All Access"},
  ];
  const PlaySVG = () => (
    <svg width="11" height="12" viewBox="0 0 11 12" fill="#555">
      <path d="M2 1.5L9.5 6L2 10.5V1.5Z"/>
    </svg>
  );
  return (
    <div style={S.root}>
      <Toast/>
      {crewJoinAnim&&<CrewJoinCelebration/>}
      {showTutorial&&<CrewTutorial onClose={()=>setShowTutorial(false)}/>}
      <div style={{...S.contentMax,flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
      <div style={{background:"#fff",borderBottom:"1px solid #f0f0f0",flexShrink:0,padding:"52px 16px 12px"}}>
        {/* ── Title row ── */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <CrewsIcon c={DARK} s={22}/>
            <span style={{fontSize:20,fontWeight:800,letterSpacing:"-0.5px",color:DARK}}>CrewPass</span>
          </div>
          <button onClick={()=>setShowTutorial(true)}
            style={{height:32,padding:"0 12px",borderRadius:8,background:"#f4f4f4",border:"1px solid #e8e8e8",color:"#555",fontSize:12,fontWeight:600,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:5}}>
            <PlaySVG/> How it works
          </button>
        </div>

        {/* ── Collapsible: myCrew card + CvC banner — hides on scroll ── */}
        {myCrew&&(
          <div style={{overflow:"hidden",maxHeight:crewsScrolled?"0px":"600px",opacity:crewsScrolled?0:1,
            transition:"max-height 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.4s cubic-bezier(0.4,0,0.2,1)",pointerEvents:crewsScrolled?"none":"auto"}}>

            {/* My crew card */}
            <div onClick={()=>{setCrewDetail(myCrew);setScreen("crewDetail");}}
              style={{background:"#111120",borderRadius:20,padding:"18px",marginBottom:12,position:"relative",overflow:"hidden",border:`1px solid ${myCrew.color}20`,cursor:"pointer"}}>
              <div style={{position:"absolute",top:-24,right:-24,width:100,height:100,borderRadius:"50%",background:myCrew.color+"0d",pointerEvents:"none"}}/>
              <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:14,position:"relative"}}>
                <div style={{width:46,height:46,borderRadius:13,background:myCrew.color+"18",border:`1.5px solid ${myCrew.color}30`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:0,flexShrink:0}}>
                  <span style={{fontSize:8,fontWeight:900,color:myCrew.color,letterSpacing:"0.3px"}}>LV</span>
                  <span style={{fontSize:16,fontWeight:900,color:myCrew.color,lineHeight:1.1}}>{myCrew.level}</span>
                </div>
                <div style={{flex:1}}>
                  <div style={{color:"rgba(255,255,255,0.3)",fontSize:10,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",marginBottom:3}}>Your Crew</div>
                  <div style={{color:"#fff",fontWeight:800,fontSize:18,letterSpacing:"-0.4px"}}>{myCrew.name}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{color:myCrew.color,fontWeight:800,fontSize:20,letterSpacing:"-0.5px"}}>{myCrew.xp.toLocaleString()}</div>
                  <div style={{color:"rgba(255,255,255,0.2)",fontSize:10,marginTop:1}}>Crew XP</div>
                </div>
              </div>
              <div style={{marginBottom:14,position:"relative"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                  <span style={{color:"rgba(255,255,255,0.25)",fontSize:11}}>Level {myCrew.level}</span>
                  <span style={{color:myCrew.color,fontSize:11,fontWeight:600}}>{(1000-(myCrew.xp%1000)).toLocaleString()} XP to next</span>
                </div>
                <div style={{height:4,background:"rgba(255,255,255,0.06)",borderRadius:2}}>
                  <div style={{height:"100%",width:`${(myCrew.xp%1000)/1000*100}%`,background:myCrew.color,borderRadius:2}}/>
                </div>
              </div>
              <div style={{display:"flex",gap:8,position:"relative"}}>
                {[{l:"Members",v:myCrew.members},{l:"Win Streak",v:`${myCrew.streak}W`},{l:"Rank",v:`#${myRank}`}].map(({l,v})=>(
                  <div key={l} style={{flex:1,background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"10px 6px",textAlign:"center",border:"1px solid rgba(255,255,255,0.05)"}}>
                    <div style={{color:"#fff",fontWeight:800,fontSize:15}}>{v}</div>
                    <div style={{color:"rgba(255,255,255,0.2)",fontSize:10,marginTop:2}}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:10,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
                <span style={{color:"rgba(255,255,255,0.25)",fontSize:10,fontWeight:600,letterSpacing:"0.5px"}}>Tap to view full stats</span>
                <span style={{color:"rgba(255,255,255,0.2)",fontSize:10}}>→</span>
              </div>
            </div>

            {/* Crew vs Crew banner */}
            <div style={{marginBottom:12,background:"linear-gradient(135deg,#1a0028 0%,#0d0d1a 100%)",borderRadius:14,padding:"14px 16px",border:"1px solid rgba(255,255,255,0.06)"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <div style={{width:30,height:30,borderRadius:9,background:PINK+"20",border:`1px solid ${PINK}30`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{fontSize:14}}>⚔️</span>
                </div>
                <div>
                  <div style={{color:"#fff",fontWeight:700,fontSize:14,letterSpacing:"-0.2px"}}>Crew vs. Crew</div>
                  <div style={{color:"rgba(255,255,255,0.35)",fontSize:11}}>Challenge another crew to a match</div>
                </div>
                <button onClick={()=>setScreen("crewChallenge")}
                  style={{marginLeft:"auto",padding:"7px 16px",borderRadius:20,background:PINK,border:"none",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",flexShrink:0}}>
                  Challenge ⚔️
                </button>
              </div>
              <div style={{display:"flex",gap:6,overflowX:"auto",scrollbarWidth:"none"}}>
                {sorted.filter(c=>c.id!==myCrew.id).slice(0,3).map(opp=>(
                  <div key={opp.id} style={{flexShrink:0,background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"8px 12px",border:"1px solid rgba(255,255,255,0.06)",minWidth:110}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                      <div style={{width:6,height:6,borderRadius:"50%",background:opp.color,flexShrink:0}}/>
                      <span style={{color:"#fff",fontSize:11,fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{opp.name}</span>
                    </div>
                    <div style={{color:"rgba(255,255,255,0.3)",fontSize:9}}>LV{opp.level} · {opp.xp.toLocaleString()} XP</div>
                  </div>
                ))}
              </div>
              <button onClick={()=>leaveCrew()}
                style={{marginTop:10,width:"100%",padding:"8px",background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.18)",borderRadius:10,color:"#ef9999",fontSize:11,fontWeight:600,cursor:"pointer"}}>
                Leave {myCrew.name}
              </button>
            </div>

          </div>
        )}

        {/* ── Sort tabs ── */}
        <div style={{display:"flex",borderTop:"1px solid #f0f0f0",marginLeft:-16,marginRight:-16}}>
          {sortOpts.map(([key,label])=>(
            <button key={key} onClick={()=>setCrewSort(key)}
              style={{flex:1,padding:"12px 0",background:"none",border:"none",fontSize:13,fontWeight:crewSort===key?700:500,color:crewSort===key?DARK:"#666",cursor:"pointer",borderBottom:crewSort===key?`2px solid ${PINK}`:"2px solid transparent",letterSpacing:crewSort===key?"-0.2px":"normal"}}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div style={S.scroll} ref={crewsScrollRef}
        onScroll={e=>setCrewsScrolled(e.target.scrollTop > 10)}>
        <div style={{margin:"14px 16px 8px",background:"#fff",borderRadius:16,border:"1px solid #ececec",boxShadow:"0 4px 16px rgba(0,0,0,0.04)",overflow:"hidden"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",borderBottom:"1px solid #f3f3f3"}}>
            <div>
              <div style={{fontSize:14,fontWeight:800,color:DARK}}>Reward Tiers</div>
              <div style={{fontSize:11,color:"#888",marginTop:1}}>
                {myCrew?`Your crew is Level ${myCrew.level} · ${tierForCrewLevel(myCrew.level)} unlocked tier`:"Join a crew to unlock perks"}
              </div>
            </div>
            <button onClick={()=>setScreen("rewardTier")}
              style={{padding:"7px 12px",borderRadius:10,border:`1px solid ${PINK}30`,background:PINK+"10",color:PINK,fontSize:11,fontWeight:700,cursor:"pointer"}}>
              View details
            </button>
          </div>
          <div style={{display:"flex",gap:8,overflowX:"auto",scrollbarWidth:"none",padding:"10px 12px"}}>
            {TIER_SUMMARY.map(t=>{
              const unlocked = !!myCrew && myCrew.level>=t.lv;
              return (
                <button key={`quick_${t.lv}`} onClick={()=>{setSelTier(t.lv);setScreen("rewardTier");}}
                  style={{flexShrink:0,minWidth:84,padding:"9px 10px",borderRadius:11,border:`1px solid ${unlocked?t.color+"50":"#e8e8e8"}`,background:unlocked?t.color+"12":"#fafafa",cursor:"pointer"}}>
                  <div style={{fontSize:9,fontWeight:900,color:unlocked?t.color:"#9aa",letterSpacing:"0.4px"}}>LV {t.lv}</div>
                  <div style={{fontSize:10.5,fontWeight:700,color:DARK,marginTop:2,whiteSpace:"nowrap"}}>{t.label}</div>
                  <div style={{fontSize:9,color:unlocked?"#16a34a":"#aaa",marginTop:4,fontWeight:700}}>{unlocked?"UNLOCKED":"LOCKED"}</div>
                </button>
              );
            })}
          </div>
        </div>
        {!myCrew&&(
          <div style={{margin:"16px 16px 8px",background:"linear-gradient(165deg, #0d0d18 0%, #15152a 100%)",borderRadius:24,overflow:"hidden",border:"1px solid rgba(255,255,255,0.08)",boxShadow:"0 12px 40px rgba(0,0,0,0.2)"}}>
            <div style={{padding:"24px 22px 22px"}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                <div style={{width:48,height:48,borderRadius:14,background:PINK+"22",border:`1.5px solid ${PINK}40`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <CrewsIcon c={PINK} s={26}/>
                </div>
                <div>
                  <div style={{color:"#fff",fontWeight:800,fontSize:18,letterSpacing:"-0.3px"}}>What is CrewPass?</div>
                  <div style={{color:"rgba(255,255,255,0.5)",fontSize:12,marginTop:2}}>Crews · XP · Rewards</div>
                </div>
              </div>
              <div style={{color:"rgba(255,255,255,0.85)",fontSize:14,lineHeight:1.7,marginBottom:18}}>
                PingPod’s crew program. Join or create a crew, earn shared XP on every booking, and level up together to unlock <strong style={{color:"#fff"}}>real rewards</strong>: 15% off play, free hours, custom paddles, and crew-vs-crew challenges.
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
                {[{Icon:Ic.Lightning,c:PINK,l:"Earn XP",sub:"Every booking"},{Icon:Ic.Crown,c:"#F59E0B",l:"Level up",sub:"5 reward tiers"},{Icon:Ic.Shield,c:"#0EA5E9",l:"Compete",sub:"Crew vs crew"}].map(({Icon,c,l,sub})=>(
                  <div key={l} style={{background:"rgba(255,255,255,0.06)",borderRadius:14,padding:"14px 10px",textAlign:"center",border:`1px solid ${c}30`}}>
                    <Icon c={c} s={22}/>
                    <div style={{fontSize:12,fontWeight:800,color:"#fff",marginTop:8}}>{l}</div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,0.45)",marginTop:2}}>{sub}</div>
                  </div>
                ))}
              </div>
              <button onClick={()=>setShowTutorial(true)} style={{width:"100%",padding:"10px 0",background:"transparent",borderRadius:10,border:"1px solid rgba(255,255,255,0.2)",color:"rgba(255,255,255,0.8)",fontSize:12,fontWeight:600,cursor:"pointer",marginBottom:10}}>
                ▶ How it works
              </button>
              <button onClick={()=>setModal({type:"crew",res:{}})}
                style={{width:"100%",padding:"16px 0",background:`linear-gradient(135deg,${PINK},#ff3385)`,borderRadius:14,border:"none",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:`0 6px 24px ${PINK}50`}}>
                Join or Create a Crew
              </button>
            </div>
          </div>
        )}
        <div style={{padding:"16px 20px 10px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontSize:15,fontWeight:700,color:DARK}}>
            {crewSort==="XP"?"Top Crews by XP":crewSort==="Streak"?"Win Streak Leaders":"Most Active Crews"}
          </div>
          <span style={{fontSize:12,color:"#777"}}>{region||"New York"}</span>
        </div>
        {sorted.map((crew,i)=>{
          const isMe=myCrew?.id===crew.id;
          const isStreak=crewSort==="Streak";
          const isMem=crewSort==="Members";
          const rankMedals=["🥇","🥈","🥉"];
          const activeTier=TIER_SUMMARY.filter(t=>t.lv<=crew.level).slice(-1)[0];
          if(isStreak) {
            const maxStreak=Math.max(...sorted.map(c=>c.streak),1);
            const rankColors=["#C9A227","#9BA4B5","#CD7F32"];
            return (
              <div key={crew.id} onClick={()=>{setCrewDetail(crew);setScreen("crewDetail");}}
                style={{margin:"0 16px 8px",borderRadius:16,background:"#fff",border:`1px solid ${isMe?crew.color+"50":"#ebebeb"}`,cursor:"pointer",overflow:"hidden"}}>
                <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px"}}>
                  <div style={{width:30,flexShrink:0,display:"flex",justifyContent:"center"}}>
                    {i<3?(
                      <div style={{width:26,height:26,borderRadius:8,background:rankColors[i]+"18",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <span style={{fontSize:11,fontWeight:900,color:rankColors[i]}}>{i+1}</span>
                      </div>
                    ):<span style={{fontSize:13,fontWeight:700,color:"#ccc"}}>{i+1}</span>}
                  </div>
                  <div style={{width:40,height:40,borderRadius:11,background:crew.color+"16",border:`1px solid ${crew.color}28`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span style={{fontSize:7,fontWeight:900,color:crew.color}}>LV</span>
                    <span style={{fontSize:14,fontWeight:900,color:crew.color,lineHeight:1.1}}>{crew.level}</span>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                      <span style={{fontWeight:700,fontSize:14,color:DARK,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{crew.name}</span>
                      {isMe&&<span style={{background:PINK,color:"#fff",fontSize:8,fontWeight:800,padding:"2px 6px",borderRadius:5,flexShrink:0}}>YOU</span>}
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{flex:1,height:3,background:"#f0f0f0",borderRadius:2,overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${(crew.streak/maxStreak)*100}%`,background:`linear-gradient(90deg,${crew.color},${crew.color}bb)`,borderRadius:2}}/>
                      </div>
                      <span style={{fontSize:12,fontWeight:800,color:crew.color,flexShrink:0}}>{crew.streak}🔥</span>
                    </div>
                  </div>
                  <Ic.ChevR c="#ddd" s={14}/>
                </div>
                {activeTier&&activeTier.lv>=3&&(
                  <div style={{background:"#fcfcfc",borderTop:"1px solid #f5f5f5",padding:"6px 16px",display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:16,height:16,borderRadius:5,background:activeTier.color+"18",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <span style={{fontSize:6.5,fontWeight:900,color:activeTier.color}}>{activeTier.abbr}</span>
                    </div>
                    <span style={{fontSize:11,color:"#555",fontWeight:500}}>{activeTier.label} · {activeTier.short}</span>
                  </div>
                )}
              </div>
            );
          }
          // XP / Members leaderboard: standard card
          const rankColors=["#C9A227","#9BA4B5","#CD7F32"];
          return (
            <div key={crew.id} onClick={()=>{setCrewDetail(crew);setScreen("crewDetail");}}
              style={{margin:"0 16px 8px",borderRadius:16,background:"#fff",border:`1px solid ${isMe?crew.color+"50":"#eee"}`,overflow:"hidden",cursor:"pointer",boxShadow:isMe?`0 4px 20px ${crew.color}22`:"0 1px 6px rgba(0,0,0,0.05)"}}>
              <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px"}}>
                <div style={{width:30,flexShrink:0,display:"flex",justifyContent:"center"}}>
                  {i<3?(
                    <div style={{width:26,height:26,borderRadius:8,background:rankColors[i]+"18",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <span style={{fontSize:11,fontWeight:900,color:rankColors[i]}}>{i+1}</span>
                    </div>
                  ):<span style={{fontSize:13,fontWeight:700,color:"#ccc"}}>{i+1}</span>}
                </div>
                <div style={{width:40,height:40,borderRadius:11,background:crew.color+"16",border:`1px solid ${crew.color}25`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{fontSize:7,fontWeight:900,color:crew.color}}>LV</span>
                  <span style={{fontSize:14,fontWeight:900,color:crew.color,lineHeight:1.1}}>{crew.level}</span>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                    <span style={{fontWeight:700,fontSize:14,color:DARK,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{crew.name}</span>
                    {isMe&&<span style={{background:PINK,color:"#fff",fontSize:8,fontWeight:800,padding:"2px 6px",borderRadius:5,flexShrink:0}}>YOU</span>}
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                    <span style={{fontSize:11,color:"#666"}}>{crew.members} members</span>
                    <span style={{fontSize:9,color:"#ddd"}}>•</span>
                    <span style={{fontSize:11,color:"#555",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{crew.location}</span>
                    <span style={{fontSize:9,color:"#ddd"}}>•</span>
                    <span style={{fontSize:11,color:"#888"}}>{crew.streak}W</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{flex:1,height:3,background:"#f0f0f0",borderRadius:2}}>
                      <div style={{height:"100%",width:`${Math.min(100,(crew.xp/6000)*100)}%`,background:crew.color,borderRadius:2}}/>
                    </div>
                    <span style={{fontSize:11,fontWeight:700,color:crew.color,flexShrink:0}}>{isMem?`${crew.members} members`:crew.xp.toLocaleString()+" XP"}</span>
                  </div>
                </div>
                <Ic.ChevR c="#ddd" s={14}/>
              </div>
              {activeTier&&activeTier.lv>=3&&(
                <div style={{background:"#fcfcfc",borderTop:"1px solid #f5f5f5",padding:"6px 16px",display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:16,height:16,borderRadius:5,background:activeTier.color+"18",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span style={{fontSize:6.5,fontWeight:900,color:activeTier.color}}>{activeTier.abbr}</span>
                  </div>
                  <span style={{fontSize:11,color:"#555",fontWeight:500}}>{activeTier.label} · {activeTier.short}</span>
                </div>
              )}
            </div>
          );
        })}
        <div style={{padding:"20px 20px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",opacity:crewsScrolled?0.6:1,transition:"opacity 0.3s ease"}}>
          <div style={{fontSize:15,fontWeight:700,color:DARK}}>Reward Tiers</div>
          <span style={{fontSize:12,color:PINK,fontWeight:600}}>5 levels</span>
        </div>
        <div style={{padding:"0 16px",display:"flex",flexDirection:"column",gap:8}}>
          {TIER_SUMMARY.map((tier,tierIdx)=>{
            const unlocked = !!myCrew && myCrew.level>=tier.lv;
            const headerSize = 13;
            const borderAlpha = unlocked ? "55" : "18";
            return (
              <div key={tier.lv}
                onClick={()=>{setSelTier(tier.lv);setScreen("rewardTier");}}
                style={{background:"#fff",borderRadius:14,border:`1px solid ${tier.color+borderAlpha}`,overflow:"hidden",cursor:"pointer",transition:"transform 0.2s, box-shadow 0.2s",boxShadow:unlocked?`0 4px 14px ${tier.color}22`:"none"}}>
                <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px"}}>
                  <div style={{width:42,height:42,borderRadius:12,background:tier.color+"15",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                    <span style={{fontSize:9,fontWeight:900,color:tier.color,letterSpacing:"0.2px"}}>{tier.abbr}</span>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                      <span style={{fontWeight:700,fontSize:headerSize,color:DARK}}>{tier.short}</span>
                      <span style={{background:unlocked?tier.color+"18":"#f2f2f2",color:unlocked?tier.color:"#999",fontSize:9,fontWeight:800,padding:"2px 8px",borderRadius:5}}>
                        {unlocked?"UNLOCKED":"LOCKED"}
                      </span>
                    </div>
                    <div style={{display:"flex",gap:6}}>
                      <span style={{fontSize:11,fontWeight:700,color:tier.color}}>Level {tier.lv}</span>
                      <span style={{fontSize:11,color:"#e0e0e0"}}>·</span>
                      <span style={{fontSize:11,color:"#aaa"}}>{tier.label}</span>
                    </div>
                  </div>
                  <Ic.ChevR c={tier.color} s={14}/>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{height:76}}/>
      </div>
      {modal?.type==="crew"&&<CrewSheet res={modal.res} crews={crews.filter(c=>!region||c.region===region)} crewName={crewName} setCrewName={setCrewName} joinCrew={joinCrew} createCrew={createCrew} onDismiss={()=>{setModal(null);setScreen("reservations");setNav("reservations");}} PINK={PINK} DARK={DARK} S={S} myCrew={myCrew} leaveCrew={leaveCrew} canJoinCrew={canJoinCrew}/>}
      <NavBar/>
      </div>
    </div>
  );
}
