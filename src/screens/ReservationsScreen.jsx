import React from "react";
import CrewSheet from "../components/crews/CrewSheet";
import { Ic } from "../components/icons";
import NavBar from "../components/layout/NavBar";
import Toast from "../components/layout/Toast";
import Divider from "../components/ui/Divider";
import LvBadge from "../components/ui/LvBadge";
import { useApp } from "../context/AppContext";
import { DARK, PINK } from "../theme";

export default function ReservationsScreen() {
  const {
    S, canJoinCrew, createCrew, crewName, crews, goNav, joinCrew, leaveCrew, modal, myCrew, region,
    resTab, reservations, setCrewName, setModal, setNav, setResTab, setReservations, setScreen,
    showToast,
  } = useApp();
  return (
    <div style={S.root}>
      <Toast/>
      <div style={{...S.contentMax,flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
        <div style={{...S.topBar,paddingBottom:0}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
            <div style={{fontSize:22,fontWeight:700,color:DARK,letterSpacing:"-0.3px"}}>Reservations</div>
            <Ic.Cart s={24}/>
          </div>
          <div style={{display:"flex",borderBottom:"1px solid #eee"}}>
            {[["upcoming","Upcoming"],["history","History / Replays"]].map(([k,l])=>(
              <button key={k} onClick={()=>setResTab(k)}
                style={{flex:1,padding:"10px 0",border:"none",background:"none",fontWeight:resTab===k?700:500,fontSize:15,color:resTab===k?DARK:"#bbb",cursor:"pointer",borderBottom:resTab===k?`2.5px solid ${PINK}`:"2.5px solid transparent"}}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <div style={S.scroll}>
        {(resTab==="upcoming" ? (
          reservations.length===0 ? (
            <div style={{padding:"20px 24px 32px",textAlign:"center"}}>
              <div style={{color:"#bbb",fontSize:14,marginBottom:36}}>No upcoming reservations</div>
              <div style={{fontSize:34,fontWeight:800,letterSpacing:"-1px",marginBottom:6,color:DARK}}>Let's Play!</div>
              <div style={{color:"#888",fontSize:15,marginBottom:28}}>What would you like to do next?</div>
              {[
                {label:"Book a table",  Icon:Ic.Book,    action:()=>goNav("book")},
                {label:"Book a lesson", Icon:Ic.Coaching,action:()=>goNav("coaching")},
                {label:"Browse events", Icon:Ic.Programs,action:()=>goNav("programs")},
              ].map(({label,Icon,action})=>(
                <button key={label} onClick={action}
                  style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 20px",background:DARK,color:"#fff",borderRadius:50,border:"none",cursor:"pointer",marginBottom:12,fontSize:16,fontWeight:600}}>
                  <span>{label}</span>
                  <span style={{width:38,height:38,borderRadius:"50%",background:PINK,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon c="#fff" s={18}/></span>
                </button>
              ))}
            </div>
          ) : (
            <div style={{padding:"12px 16px"}}>
              {myCrew&&(
                <div style={{background:"#0f0f0f",borderRadius:14,padding:"14px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:12,cursor:"pointer"}} onClick={()=>goNav("crews")}>
                  <LvBadge level={myCrew.level} color={myCrew.color}/>
                  <div style={{flex:1}}>
                    <div style={{color:PINK,fontSize:10,fontWeight:700,letterSpacing:"0.6px",textTransform:"uppercase",marginBottom:2}}>Your Crew</div>
                    <div style={{color:"#fff",fontWeight:800,fontSize:15}}>{myCrew.name}</div>
                    <div style={{color:"rgba(255,255,255,.4)",fontSize:12,marginTop:1}}>Level {myCrew.level} · {myCrew.xp.toLocaleString()} XP</div>
                  </div>
                  <Ic.ChevR c="#555" s={16}/>
                </div>
              )}
              {reservations.map((r,i)=>(
                <div key={r.id}>
                  <div style={{paddingTop:14,paddingBottom:14}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                      <div style={{fontWeight:700,fontSize:16,color:DARK}}>{r.isCoach?`Lesson w/ ${r.coachName}`:r.isProgram?r.location:r.location}</div>
                      <span style={{background:"#edfff3",color:"#15803d",fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:10,flexShrink:0}}>Confirmed</span>
                    </div>
                    <div style={{color:"#999",fontSize:13}}>{r.isCoach?r.location:r.isProgram?r.address:r.address}</div>
                    <div style={{color:"#999",fontSize:13,marginBottom:8}}>{r.date} · {r.time} · {r.dur}</div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{...S.badge,background:r.isProgram?"#f0f7ff":r.isPopup?"#fff0f7":"#f2f2f2",color:r.isProgram?"#1D4ED8":r.isPopup?PINK:"#555",border:r.isProgram?"1px solid #bfdbfe":"1px solid #eee"}}>{r.isProgram?"EVENT":r.pod}</span>
                      {!r.isProgram && !r.isPopup && (
                        <button onClick={()=>setModal({type:"crew",res:r})}
                          style={{fontSize:12,color:PINK,background:PINK+"12",border:`1px solid ${PINK}40`,borderRadius:6,padding:"3px 10px",cursor:"pointer",fontWeight:700}}>
                          Join a Crew
                        </button>
                      )}
                      <button onClick={()=>{setReservations(p=>p.filter(x=>x.id!==r.id));showToast("Reservation cancelled");}}
                        style={{fontSize:12,color:"#bbb",background:"none",border:"1px solid #eee",borderRadius:6,padding:"3px 10px",cursor:"pointer"}}>
                        Cancel
                      </button>
                    </div>
                  </div>
                  {i<reservations.length-1&&<Divider/>}
                </div>
              ))}
            </div>
          )
        ) : (
          <div style={{padding:"48px 24px",textAlign:"center",color:"#ccc",fontSize:14}}>No history yet</div>
        ))}
        </div>
        {modal?.type==="crew"&&<CrewSheet res={modal.res} crews={crews.filter(c=>!region||c.region===region)} crewName={crewName} setCrewName={setCrewName} joinCrew={joinCrew} createCrew={createCrew} onDismiss={()=>{setModal(null);setScreen("reservations");setNav("reservations");}} PINK={PINK} DARK={DARK} S={S} myCrew={myCrew} leaveCrew={leaveCrew} canJoinCrew={canJoinCrew}/>}
        <NavBar/>
      </div>
    </div>
  );
}
