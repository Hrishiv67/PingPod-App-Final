import React from "react";
import CrewSheet from "../components/crews/CrewSheet";
import { CrewsIcon, Ic } from "../components/icons";
import NavBar from "../components/layout/NavBar";
import Toast from "../components/layout/Toast";
import AppLoadingOverlay from "../components/overlays/AppLoadingOverlay";
import CrewJoinCelebration from "../components/overlays/CrewJoinCelebration";
import LvBadge from "../components/ui/LvBadge";
import { useApp } from "../context/AppContext";
import { THUMB } from "../data/images";
import { DATES, TIMES, TIME_INDEX } from "../data/schedule";
import { IPAD_PLANE } from "../styles/appStyles";
import { DARK, PINK } from "../theme";
import { getPrice, isPeakTime, toHour24 } from "../utils/pricing";

export default function BookingScreen() {
  const {
    S, addXpConfirmCrew, applyCrewXp, booked, bookingStep, canJoinCrew, confirmBooking, createCrew,
    createCrewFromBooking, crewJoinAnim, crewName, crews, groupSize, isIpadLayout, joinCrew,
    joinCrewFromBooking, leaveCrew, modal, myCrew, playLoader, region, selDate, selDur, selLoc,
    selPod, selTime, selTimes, setAddXpConfirmCrew, setApplyCrewXp, setBooked, setBookingStep,
    setCrewName, setGroupSize, setModal, setNav, setScreen, setSelDate, setSelDur, setSelPod,
    setSelTime, setSelTimes, setShowGroupSheet, showGroupSheet, showToast,
  } = useApp();
  if (booked&&!modal) return (
    <div style={S.root}>
      {crewJoinAnim&&<CrewJoinCelebration/>}
      <div style={{...S.contentMax,flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",padding:"32px 24px 24px",overflowY:"auto"}}>
        <div style={{width:72,height:72,borderRadius:"50%",background:"#f0fff4",border:"2px solid #bbf7d0",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,boxShadow:"0 4px 20px rgba(34,197,94,0.2)",flexShrink:0}}>
          <Ic.Check c="#22c55e" s={36}/>
        </div>
        <div style={{fontSize:24,fontWeight:800,color:DARK,letterSpacing:"-0.5px",marginBottom:4,textAlign:"center"}}>You're booked!</div>
        <div style={{fontSize:15,color:"#555",textAlign:"center",marginBottom:2}}>{selLoc?.name}</div>
        <div style={{fontSize:13,color:"#999",textAlign:"center",marginBottom:24}}>{selDate} · {selTime} · {selDur}</div>
        {myCrew && applyCrewXp && (
          <div style={{width:"100%",maxWidth:isIpadLayout?IPAD_PLANE-24:720,background:"#fff",borderRadius:20,padding:"20px 20px 18px",border:"1px solid #eee",marginBottom:16,boxShadow:"0 8px 32px rgba(0,0,0,0.06)"}}>
            <div style={{fontSize:11,color:"#888",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:8}}>Crew XP added</div>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:48,height:48,borderRadius:14,background:myCrew.color+"20",border:`1.5px solid ${myCrew.color}40`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <span style={{fontSize:8,fontWeight:900,color:myCrew.color}}>LV</span>
                <span style={{fontSize:16,fontWeight:900,color:myCrew.color,lineHeight:1.1}}>{myCrew.level}</span>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:800,fontSize:18,color:DARK,letterSpacing:"-0.3px"}}>{myCrew.name}</div>
                <div style={{fontSize:12,color:"#888",marginTop:2}}>+150 XP from this booking has been applied.</div>
              </div>
            </div>
          </div>
        )}
        <button onClick={()=>{setBooked(false);setScreen("reservations");setNav("reservations");}}
          style={{fontSize:13,color:"#aaa",background:"none",border:"none",cursor:"pointer",padding:"8px 12px",marginTop:4}}>
          Go to Reservations
        </button>
      </div>
      <NavBar/>
    </div>
  );
  return (
    <div style={S.root}>
      <Toast/>
      <AppLoadingOverlay/>
      {/* legacy booking fade removed in favor of loading overlay */}
      {modal?.type==="crew"&&<CrewSheet
        res={modal.res}
        crews={crews.filter(c=>!region||c.region===region)}
        crewName={crewName}
        setCrewName={setCrewName}
        joinCrew={joinCrew}
        createCrew={createCrew}
        onDismiss={()=>{
          // Dismiss crew sheet without changing tabs/screens.
          setModal(null);
          setAddXpConfirmCrew(null);
        }}
        PINK={PINK}
        DARK={DARK}
        S={S}
        myCrew={myCrew}
        leaveCrew={leaveCrew}
        canJoinCrew={canJoinCrew}
        fromBooking={!!(modal.res?.location)}
        joinCrewFromBooking={joinCrewFromBooking}
        createCrewFromBooking={createCrewFromBooking}
        addXpConfirmCrew={addXpConfirmCrew}
        onConfirmAddXp={addXpConfirmCrew?()=>{
          // Arm XP for this booking, but do not animate or navigate yet.
          setApplyCrewXp(true);
          setModal(null);
          setAddXpConfirmCrew(null);
        }:undefined}
        onSkipAddXp={addXpConfirmCrew?()=>{
          // Skip adding XP, keep user in the current flow.
          setApplyCrewXp(false);
          setModal(null);
          setAddXpConfirmCrew(null);
        }:undefined}
      />}
      <div style={{...S.contentMax,flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
        <div style={{...S.topBar,paddingBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:4}}>
            <button onClick={()=>setScreen("locations")} style={{background:"none",border:"none",cursor:"pointer",padding:"2px 6px 2px 0",display:"flex"}}><Ic.ChevL/></button>
            <div>
              <div style={{fontSize:20,fontWeight:700,letterSpacing:"-0.3px"}}>{selLoc.name}</div>
              <div style={{color:"#aaa",fontSize:12,marginTop:1}}>{selLoc.address}</div>
            </div>
          </div>
        </div>
        <div style={S.scroll}>
          <div style={{padding:"0 16px 32px",maxWidth:isIpadLayout?IPAD_PLANE-24:520,margin:"0 auto"}}>
          <div style={{
            width:"100%",
            maxWidth:isIpadLayout?IPAD_PLANE-24:520,
            height:isIpadLayout?220:160,
            borderRadius:12,
            marginBottom:20,
            overflow:"hidden",
            background:"#ebebeb"
          }}>
            <img
              src={THUMB[selLoc.img]}
              alt={selLoc.name}
              style={{
                width:"100%",
                height:"100%",
                objectFit:"cover",
                objectPosition: selLoc.img==="corcoran" ? "center 90%" : "center",
                display:"block"
              }}
            />
          </div>
          {bookingStep==="experience" && (
            <>
              {/* Select Open/Closed */}
              <div style={{marginBottom:24,borderRadius:24,background:"#fff",boxShadow:"0 -4px 30px rgba(0,0,0,0.18)",padding:"16px 20px 20px"}}>
                <div style={{width:40,height:4,borderRadius:999,background:"#e5e5e5",margin:"0 auto 10px"}}/>
                <div style={{fontSize:14,fontWeight:600,color:"#111",textAlign:"center",marginBottom:8}}>Select pod experience:</div>
                <div style={{fontSize:12,color:"#777",textAlign:"center",marginBottom:14}}>Choose between shared Open Pods or a Private Pod.</div>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {selLoc.types.filter(t=>t!=="ROBOT TABLE").map(t=>{
                    const isOpen = t==="OPEN POD";
                    const selected = selPod===t;
                    return (
                      <button
                        key={t}
                        onClick={()=>setSelPod(t)}
                        style={{
                          width:"100%",
                          borderRadius:999,
                          padding:"13px 18px",
                          display:"flex",
                          alignItems:"center",
                          justifyContent:"space-between",
                          border:"none",
                          cursor:"pointer",
                          background:selected?"#111":"#f5f5f5"
                        }}>
                        <div style={{display:"flex",alignItems:"center",gap:12}}>
                          <div style={{width:34,height:34,borderRadius:17,background:selected?"#ff007a":"#111",display:"flex",alignItems:"center",justifyContent:"center"}}>
                            <Ic.Book c="#fff" s={18}/>
                          </div>
                          <div style={{textAlign:"left"}}>
                            <div style={{fontSize:14,fontWeight:700,color:selected?"#fff":"#111"}}>{isOpen?"Open Pod":"Private Pod"}</div>
                            <div style={{fontSize:12,color:selected?"#f5f5f5":"#777"}}>
                              {isOpen?"A table in a shared space":"Private, VIP space with single table"}
                            </div>
                          </div>
                        </div>
                        <div style={{width:18,height:18,borderRadius:9,border:`2px solid ${selected?"#fff":"#bbb"}`,background:selected?"#ff007a":"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>
                          {selected&&<div style={{width:8,height:8,borderRadius:4,background:"#fff"}}/>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {bookingStep==="schedule" && (
            <>
              <div style={{fontWeight:700,fontSize:11,color:"#aaa",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.8px"}}>Date</div>
              <div style={{display:"flex",gap:8,overflowX:"auto",marginBottom:18,paddingBottom:6,WebkitOverflowScrolling:"touch",scrollbarWidth:"none",msOverflowStyle:"none",scrollSnapType:"x mandatory"}}>
                {DATES.map(d=><button key={d} onClick={()=>setSelDate(d)} style={{...S.chip(selDate===d),flexShrink:0,fontSize:12,scrollSnapAlign:"start"}}>{d}</button>)}
              </div>
              <div style={{fontWeight:700,fontSize:11,color:"#aaa",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.8px"}}>Time</div>
              <div style={{borderRadius:20,overflow:"hidden",border:"1px solid #e8e8e8",marginBottom:18,background:"#fff"}}>
                {TIMES.map(t=>{
                  const selected = selTimes.includes(t);
                  const hour24 = toHour24(t) ?? 12;
                  const peak = isPeakTime(t, selDate);
                  // Busy/quiet simulation (max 4): peak hours have fewer tables
                  let tables = peak ? 2 : 4;
                  if (peak && (hour24 >= 17 && hour24 < 20)) tables = 1;
                  if (!peak && (hour24 >= 22 || hour24 < 6)) tables = 3;
                  return (
                    <button
                      key={t}
                      onClick={()=>{
                        setSelTimes(prev=>{
                          let next;
                          if (prev.includes(t)) {
                            next = prev.filter(x=>x!==t);
                          } else {
                            next = [...prev, t].sort((a,b)=>TIME_INDEX[a]-TIME_INDEX[b]);
                          }
                          if (next.length===0) {
                            setSelTime(null);
                            setSelDur("1 hr");
                            return next;
                          }
                          const first = next[0];
                          const slots = next.length;
                          const hrs = slots * 0.5;
                          const durLabel = hrs===1 ? "1 hr" : `${hrs} hrs`;
                          setSelTime(first);
                          setSelDur(`${slots} x 30 min`);
                          return next;
                        });
                      }}
                      style={{
                        width:"100%",
                        padding:"12px 16px",
                        border:"none",
                        borderTop:"1px solid #f2f2f2",
                        background:selected?"#0046ff":"#fff",
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"space-between",
                        cursor:"pointer"
                      }}>
                      <div style={{textAlign:"left"}}>
                        <div style={{fontSize:14,fontWeight:600,color:selected?"#fff":"#111"}}>{t}</div>
                        <div style={{fontSize:12,color:selected?"#e5e5ff":"#777"}}>
                          {tables} table{tables!==1?"s":""} available · {peak ? "Peak" : "Off‑peak"}
                        </div>
                      </div>
                      <span style={{width:22,height:22,borderRadius:11,border:`2px solid ${selected?"#fff":"#d0d0d0"}`,background:selected?"#fff":"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        {selected&&<span style={{width:10,height:10,borderRadius:5,background:"#0046ff"}}/>}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {bookingStep==="checkout" && (
            <>
              <div style={{borderRadius:22,background:"#fff",border:"1px solid #eee",padding:"18px 18px 16px",boxShadow:"0 10px 28px rgba(0,0,0,0.06)",marginBottom:18,width:"100%",maxWidth:isIpadLayout?IPAD_PLANE-24:720,marginLeft:"auto",marginRight:"auto"}}>
                <div style={{fontSize:12,color:"#999",fontWeight:700,letterSpacing:"1.4px",textTransform:"uppercase",marginBottom:8}}>Checkout</div>
                <div style={{fontSize:18,fontWeight:800,color:"#111",letterSpacing:"-0.3px",marginBottom:2}}>{selLoc?.name}</div>
                <div style={{fontSize:13,color:"#777",marginBottom:12}}>{selDate} · {selTime} · {selDur}</div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"#666",marginBottom:8}}>
                  <span>{selPod==="OPEN POD"?"Open Pod":"Private Pod"}</span>
                  <span>Group: {groupSize}</span>
                </div>
                {selPod&&selTime&&(()=>{
                  const p=getPrice(selPod,selTime,selDate,selDur);
                  let t=Math.round(p.total*0.90);
                  if(myCrew&&myCrew.level>=5)t=Math.round(t*0.85);
                  return (
                    <div style={{marginTop:12,paddingTop:12,borderTop:"1px solid #f0f0f0",display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
                      <span style={{fontSize:14,fontWeight:700,color:"#111"}}>Total</span>
                      <span style={{fontSize:22,fontWeight:900,color:"#111"}}>${t}</span>
                    </div>
                  );
                })()}
              </div>
              {myCrew ? (
                <div style={{marginTop:8,marginBottom:12,padding:"10px 12px",borderRadius:14,background:"#0f0f0f",color:"#fff",display:"flex",alignItems:"center",gap:10,width:"100%",maxWidth:isIpadLayout?IPAD_PLANE-24:720,marginLeft:"auto",marginRight:"auto"}}>
                  <LvBadge level={myCrew.level} color={myCrew.color}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700}}>{myCrew.name}</div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,0.7)"}}>
                      {applyCrewXp ? "150 XP will be added from this booking." : "Tap to add 150 XP from this booking."}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={()=>setApplyCrewXp(v=>!v)}
                    style={{padding:"6px 10px",borderRadius:12,border:"none",background:applyCrewXp?"#22c55e":"#fff",color:applyCrewXp?"#fff":"#0f0f0f",fontSize:11,fontWeight:700,cursor:"pointer"}}>
                    {applyCrewXp ? "XP Added" : "+150 XP"}
                  </button>
                </div>
              ) : (
                <div style={{marginTop:8,marginBottom:12,padding:"12px 14px",borderRadius:16,background:"#faf5ff",border:"1px solid #e9d5ff",width:"100%",maxWidth:isIpadLayout?IPAD_PLANE-24:720,marginLeft:"auto",marginRight:"auto"}}>
                  <div style={{fontSize:12,fontWeight:700,color:"#6b21a8",marginBottom:4}}>Earn Crew XP together</div>
                  <div style={{fontSize:12,color:"#6b21a8",marginBottom:8}}>Join or create a crew now so this booking’s XP is tracked from day one.</div>
                  <button
                    onClick={()=>setModal({type:"crew",res:{location:selLoc?.name,date:selDate,time:selTime}})}
                    style={{width:"100%",padding:"10px 12px",borderRadius:12,border:"none",background:"#6b21a8",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                    <CrewsIcon c="#fff" s={18}/> Join or Create a Crew
                  </button>
                </div>
              )}
            </>
          )}
          {selPod&&selTime&&(()=>{
            const p=getPrice(selPod,selTime,selDate,selDur);
            return (
              <div style={{borderRadius:14,overflow:"hidden",marginBottom:20,border:"1px solid #ebebeb"}}>
                <div style={{background:p.peak?"#fff8f0":"#f0fff4",padding:"10px 16px",display:"flex",alignItems:"center",gap:8,borderBottom:"1px solid #ebebeb"}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:p.peak?"#f97316":"#22c55e",flexShrink:0}}/>
                  <span style={{fontSize:12,fontWeight:700,color:p.peak?"#c2410c":"#15803d"}}>{p.peak?"Peak Hours":"Off-Peak · 30% off applied"}</span>
                  {!p.peak&&<span style={{fontSize:11,color:"#888",marginLeft:"auto"}}>Before 4 PM weekdays</span>}
                </div>
                <div style={{background:"#fff",padding:"14px 16px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <span style={{fontSize:13,color:"#888"}}>{selPod} · {p.hrs} hr{p.hrs>1?"s":""}</span>
                    <span style={{fontSize:13,color:"#888"}}>${p.hourly}/hr</span>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <span style={{fontSize:13,color:"#0EA5E9",fontWeight:600}}>Member 10% off</span>
                    <span style={{fontSize:13,color:"#0EA5E9",fontWeight:600}}>-${Math.round(p.total*0.10)}</span>
                  </div>
                  {myCrew&&myCrew.level>=5&&(
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                      <span style={{fontSize:13,color:PINK,fontWeight:600}}>Core Crew 15% off</span>
                      <span style={{fontSize:13,color:PINK,fontWeight:600}}>-${Math.round(p.total*0.15)}</span>
                    </div>
                  )}
                  <div style={{display:"flex",justifyContent:"space-between",borderTop:"1px solid #f0f0f0",paddingTop:10,marginTop:6}}>
                    <span style={{fontSize:15,fontWeight:700,color:DARK}}>Total</span>
                    <span style={{fontSize:20,fontWeight:800,color:DARK}}>${(()=>{let t=p.total;t=Math.round(t*0.90);if(myCrew&&myCrew.level>=5)t=Math.round(t*0.85);return t;})()}</span>
                  </div>
                </div>
              </div>
            );
          })()}
          {myCrew&&selPod==="OPEN POD"&&(
            <div style={{background:"#0f0f0f",borderRadius:12,padding:"13px 16px",marginBottom:20,display:"flex",alignItems:"center",gap:12}}>
              <LvBadge level={myCrew.level} color={myCrew.color}/>
              <div style={{flex:1}}>
                <div style={{color:"#fff",fontWeight:700,fontSize:14}}>{myCrew.name}</div>
                <div style={{color:"rgba(255,255,255,.45)",fontSize:12}}>+150 Crew XP for this booking</div>
              </div>
              <Ic.Lightning c={PINK} s={16}/>
            </div>
          )}
          </div>
        </div>
      <div style={{padding:"10px 16px 14px",borderTop:"1px solid #e8e8e8",background:"#fff"}}>
          <button
            onClick={()=>{
              if (bookingStep==="experience") {
                if(!selPod){showToast("Select Open Pod or Private Pod");return;}
                playLoader("Loading", 420, ()=>setBookingStep("schedule"));
                return;
              }
              if (bookingStep==="schedule") {
                if(!selTime){showToast("Select at least one time slot");return;}
                setShowGroupSheet(true);
                return;
              }
              if (bookingStep==="checkout") {
                if(!selPod||!selTime){showToast("Select pod type and time");return;}
                confirmBooking();
                return;
              }
            }}
            style={{
              width:"100%",
              borderRadius:999,
              padding:"14px 20px",
              background:(
                (bookingStep==="experience" && !selPod) ||
                (bookingStep==="schedule" && !selTime) ||
                (bookingStep==="checkout" && (!selPod || !selTime))
              ) ? "#d4d4d4" : "#111",
              color:"#fff",
              fontSize:16,
              fontWeight:700,
              border:"none",
              cursor:"pointer",
              display:"flex",
              alignItems:"center",
              justifyContent:"space-between",
              maxWidth:isIpadLayout?IPAD_PLANE-24:520,
              margin:"0 auto"
            }}>
            <span>
              {bookingStep==="experience" ? "Next →" : bookingStep==="schedule" ? "Check out →" : "Confirm →"}
            </span>
            {bookingStep!=="experience" && selPod && selTime ? (()=> {
              const p=getPrice(selPod,selTime,selDate,selDur);
              const tBase=Math.round(p.total*0.90);
              const tFinal=myCrew&&myCrew.level>=5?Math.round(tBase*0.85):tBase;
              return <span style={{fontSize:14,color:"#f5f5f5"}}>{p.hrs*30} min / ${tFinal}</span>;
            })() : <span style={{fontSize:14,color:"#e5e5e5"}}>{bookingStep==="experience" ? "Select pod experience" : "Select time to see price"}</span>}
          </button>
        </div>
        <NavBar/>
        {showGroupSheet && (
          <div style={{position:"absolute",inset:0,zIndex:600,display:"flex",flexDirection:"column",justifyContent:"flex-end",background:"rgba(0,0,0,0.45)"}} onClick={()=>setShowGroupSheet(false)}>
            <div
              style={{
                background:"#fff",
                borderRadius:"20px 20px 0 0",
                maxHeight:"80vh",
                marginLeft:"auto",
                marginRight:"auto",
                width:"100%",
                maxWidth:isIpadLayout?IPAD_PLANE:520,
                padding:"16px 20px 24px"
              }}
              onClick={e=>e.stopPropagation()}
            >
              <div style={{width:40,height:4,borderRadius:999,background:"#e5e5e5",margin:"0 auto 12px"}}/>
              <div style={{fontSize:16,fontWeight:700,textAlign:"center",marginBottom:4}}>Group size</div>
              <div style={{fontSize:12,color:"#888",textAlign:"center",marginBottom:14}}>Who’s playing in this booking?</div>
              <div style={{display:"flex",flexDirection:"column",borderRadius:16,overflow:"hidden",border:"1px solid #e5e5e5",marginBottom:16}}>
                {[1,2,3,4,5,6].map(n=>{
                  const active = groupSize===n;
                  return (
                    <button
                      key={n}
                      onClick={()=>setGroupSize(n)}
                      style={{
                        width:"100%",
                        padding:"12px 18px",
                        border:"none",
                        borderTop:n===1?"none":"1px solid #f0f0f0",
                        background:active?"#0046ff":"#fff",
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"space-between",
                        fontSize:14,
                        cursor:"pointer",
                        color:active?"#fff":"#111"
                      }}
                    >
                      <span>{n} player{n>1?"s":""}</span>
                      <span style={{display:"flex",alignItems:"center",gap:8,fontSize:12,color:active?"#e5e5ff":"#555"}}>
                        {n>=5 && <span>${n===5?"2.50":"5"} each</span>}
                        <span
                          style={{
                            width:20,
                            height:20,
                            borderRadius:10,
                            border:`2px solid ${active?"#fff":"#d0d0d0"}`,
                            background:active?"#fff":"transparent",
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"center"
                          }}
                        >
                          {active && (
                            <span
                              style={{
                                width:10,
                                height:10,
                                borderRadius:5,
                                background:"#0046ff"
                              }}
                            />
                          )}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
              <button
                onClick={()=>{
                  setShowGroupSheet(false);
                  playLoader("Loading", 420, ()=>setBookingStep("checkout"));
                }}
                style={{
                  width:"100%",
                  borderRadius:999,
                  padding:"13px 20px",
                  background:"#111",
                  color:"#fff",
                  fontSize:15,
                  fontWeight:700,
                  border:"none",
                  cursor:"pointer",
                  marginTop:4
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
