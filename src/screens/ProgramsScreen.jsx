import React from "react";
import { Ic } from "../components/icons";
import NavBar from "../components/layout/NavBar";
import Toast from "../components/layout/Toast";
import AppLoadingOverlay from "../components/overlays/AppLoadingOverlay";
import Divider from "../components/ui/Divider";
import { useApp } from "../context/AppContext";
import { PROGRAMS } from "../data/programs";
import { DATES } from "../data/schedule";
import { BLUE, DARK, PINK } from "../theme";

export default function ProgramsScreen() {
  const {
    S, myCrew, progFilter, region, reservations, selDate, setProgFilter, setReservations,
    setScreen, setSelDate, setSelProgram, showToast,
  } = useApp();
  const pFilters = ["Open Play","Clinics","Leagues","Tournaments","Kickstart"];
  const filtered = progFilter==="All" ? PROGRAMS : PROGRAMS.filter(p=>p.type.toLowerCase().replace(/ /g,"").includes(progFilter.toLowerCase().replace(/ /g,"")));
  // Spotlight: show spotlighted programs for selected date if any, else all spotlighted
  const dateSpotlights = PROGRAMS.filter(p=>p.spotBg && p.date===selDate);
  const spotlightShow  = dateSpotlights;  // Only show spotlight events for selected date
  const spotlightIds   = new Set(spotlightShow.map(p=>p.id));

  const todayList = filtered.filter(p=>p.date===selDate && !spotlightIds.has(p.id));
  const upcomingList = filtered.filter(p=>p.date!==selDate && !spotlightIds.has(p.id));
  return (
    <div style={S.root}>
      <Toast/>
      <AppLoadingOverlay/>
      <div style={{...S.contentMax,flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
        <div style={{...S.topBar,paddingBottom:0}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
            <div style={{display:"flex",alignItems:"center",gap:4}}>
              <span style={{fontSize:20,fontWeight:700,letterSpacing:"-0.3px"}}>{region||"New York / New Jersey"}</span>
              <Ic.ChevR c="#111" s={16}/>
            </div>
            <Ic.Sliders c="#333" s={20}/>
          </div>
          <div style={{display:"flex",overflowX:"auto",scrollbarWidth:"none",WebkitOverflowScrolling:"touch",paddingBottom:2}}>
            {DATES.map(d=>(
              <button key={d} onClick={()=>setSelDate(d)}
                style={{padding:"8px 12px",background:"none",border:"none",color:selDate===d?DARK:"#bbb",fontWeight:selDate===d?700:400,fontSize:13,cursor:"pointer",borderBottom:selDate===d?`2.5px solid ${DARK}`:"2.5px solid transparent",whiteSpace:"nowrap",flexShrink:0}}>
                {d}
              </button>
            ))}
          </div>
          <div style={{...S.blueBar,padding:"8px 12px",gap:8}}>
          {pFilters.map(f=>(
            <button key={f} onClick={()=>setProgFilter(progFilter===f?"All":f)}
              style={{padding:"6px 16px",borderRadius:20,background:progFilter===f?"#fff":"transparent",color:progFilter===f?BLUE:"#fff",border:"2px solid rgba(255,255,255,.5)",fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div style={S.scroll}>
        {spotlightShow.length>0&&(
          <>
            <div style={{...S.secHd,display:"flex",alignItems:"center",justifyContent:"space-between",paddingRight:16}}>
              <span>Spotlight</span>
              {spotlightShow.length>1&&<span style={{fontSize:11,color:"#bbb",fontWeight:400,letterSpacing:"0.2px"}}>swipe →</span>}
            </div>
            <div style={{display:"flex",gap:12,overflowX:"auto",padding:"0 16px 20px",scrollbarWidth:"none",WebkitOverflowScrolling:"touch",scrollSnapType:"x mandatory",msOverflowStyle:"none"}}>
              {spotlightShow.map(p=>(
                <div key={p.id} onClick={()=>{ if(p.detail){setSelProgram(p);setScreen("programDetail");}else{const progId="prog_"+p.id;const isReg=reservations.some(r=>r.id===progId);if(isReg){showToast("Already registered!");return;}if(p.waitlist){showToast("Added to waitlist!");return;}if(p.crewOnly&&!myCrew){showToast("Join a crew first!");return;}const newRes={id:progId,location:p.title,address:p.location,date:p.date,time:p.time,dur:p.type,pod:"EVENT",isProgram:true};setReservations(prev=>[...prev,newRes]);showToast("Registered! · "+p.title);}}}
                  style={{minWidth:224,scrollSnapAlign:"start",borderRadius:14,cursor:"pointer",flexShrink:0,background:p.spotBg,border:"1px solid rgba(255,255,255,.1)",overflow:"hidden"}}>
                  <div style={{padding:"14px 14px 16px"}}>
                    {p.spots&&<div style={{background:PINK,color:"#fff",fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:10,display:"inline-block",marginBottom:8}}>only {p.spots} spots left</div>}
                    <div style={{fontSize:10,fontWeight:700,color:PINK,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.7px"}}>{p.type}</div>
                    <div style={{color:"#fff",fontWeight:700,fontSize:13.5,marginBottom:8,lineHeight:1.35}}>{p.title}</div>
                    <div style={{color:"rgba(255,255,255,.5)",fontSize:11.5}}>{p.date} | {p.time} | {p.location}</div>
                  </div>
                </div>
              ))}
            </div>
            <Divider/>
          </>
        )}
        <div style={S.secHd}>{selDate}</div>
        {todayList.map((p,i,arr)=>(
          <div key={p.id}>
            <div onClick={()=>{ if(p.detail){setSelProgram(p);setScreen("programDetail");}else{const progId="prog_"+p.id;const isReg=reservations.some(r=>r.id===progId);if(isReg){showToast("Already registered!");return;}if(p.waitlist){showToast("Added to waitlist!");return;}if(p.crewOnly&&!myCrew){showToast("Join a crew first!");return;}const newRes={id:progId,location:p.title,address:p.location,date:p.date,time:p.time,dur:p.type,pod:"EVENT",isProgram:true};setReservations(prev=>[...prev,newRes]);showToast("Registered! · "+p.title);}}} style={{padding:"12px 16px",cursor:"pointer"}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                <span style={{fontSize:10,color:"#22c55e"}}>●</span>
                <span style={{color:"#666",fontSize:13}}>{p.time}</span>
                {reservations.some(r=>r.id==="prog_"+p.id)&&<span style={{background:"#edfff3",color:"#15803d",fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:4}}>Registered</span>}
                {p.waitlist&&<span style={{background:"#efefef",color:"#666",fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:4}}>WAITLIST</span>}
                {p.crewOnly&&<span style={{background:PINK+"18",color:PINK,fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:4}}>CREW EVENT</span>}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                <Ic.Trophy c="#C9A227" s={13}/><span style={{fontWeight:700,fontSize:15,color:DARK}}>{p.title}</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:12,color:"#bbb",fontSize:12.5}}>
                <span style={{display:"flex",alignItems:"center",gap:3}}><Ic.Pin/>{p.location}</span>
                <span style={{display:"flex",alignItems:"center",gap:3}}><Ic.Bars/>{p.level}</span>
              </div>
            </div>
            {i<arr.length-1&&<Divider/>}
          </div>
        ))}
        {upcomingList.length>0&&<>
          <div style={{...S.secHd,paddingTop:8,borderTop:"6px solid #f5f5f5",marginTop:4}}>Other Days</div>
          {upcomingList.map((p,i,arr)=>(
            <div key={p.id}>
              <div onClick={()=>{ if(p.detail){setSelProgram(p);setScreen("programDetail");}else{const progId="prog_"+p.id;const isReg=reservations.some(r=>r.id===progId);if(isReg){showToast("Already registered!");return;}if(p.waitlist){showToast("Added to waitlist!");return;}if(p.crewOnly&&!myCrew){showToast("Join a crew first!");return;}const newRes={id:progId,location:p.title,address:p.location,date:p.date,time:p.time,dur:p.type,pod:"EVENT",isProgram:true};setReservations(prev=>[...prev,newRes]);showToast("Registered! · "+p.title);}}} style={{padding:"12px 16px",cursor:"pointer"}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                  <span style={{fontSize:10,color:"#ccc"}}>●</span>
                  <span style={{color:"#aaa",fontSize:13}}>{p.time}</span>
                  {p.crewOnly&&<span style={{background:PINK+"18",color:PINK,fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:4}}>CREW EVENT</span>}
                </div>
                <div style={{fontWeight:700,fontSize:15,color:DARK,marginBottom:4}}>{p.title}</div>
                <div style={{display:"flex",alignItems:"center",gap:12,color:"#bbb",fontSize:12.5}}>
                  <span style={{display:"flex",alignItems:"center",gap:3}}><Ic.Pin/>{p.location}</span>
                  <span style={{display:"flex",alignItems:"center",gap:3}}><Ic.Bars/>{p.level}</span>
                </div>
              </div>
              {i<arr.length-1&&<Divider/>}
            </div>
          ))}
        </>}
        <div style={{height:20}}/>
      </div>
        <NavBar/>
      </div>
    </div>
  );
}
