import React from "react";
import { CrewsIcon, Ic } from "../components/icons";
import NavBar from "../components/layout/NavBar";
import { useApp } from "../context/AppContext";
import { DARK, PINK } from "../theme";

export default function ProgramDetailScreen() {
  const { S, myCrew, reservations, selProgram, setReservations, setScreen, showToast } = useApp();
  const p = selProgram;
  const typeColors = {"VIRTUAL EVENT":"#0d1b4b","CLINIC":PINK,"LEAGUE":"#7C3AED","OPEN PLAY":"#10B981","TOURNAMENT":"#C9A227","CREW EVENT":DARK};
  const tc = typeColors[p.type]||DARK;
  return (
    <div style={S.root}>
      <div style={{...S.contentMax,flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
      <div style={{background:tc,flexShrink:0,padding:"52px 20px 24px"}}>
        <button onClick={()=>setScreen("programs")} style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(255,255,255,0.12)",border:"none",borderRadius:20,padding:"7px 14px",color:"rgba(255,255,255,0.8)",fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:20}}>
          <Ic.ChevL c="rgba(255,255,255,0.8)" s={15}/> Programs
        </button>
        <div style={{background:"rgba(255,255,255,0.15)",borderRadius:20,padding:"4px 12px",display:"inline-flex",alignItems:"center",marginBottom:10}}>
          <span style={{color:"#fff",fontSize:10,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase"}}>{p.type}</span>
        </div>
        <div style={{color:"#fff",fontSize:20,fontWeight:800,letterSpacing:"-0.4px",lineHeight:1.25,marginBottom:8}}>{p.title}</div>
        <div style={{display:"flex",gap:16,color:"rgba(255,255,255,0.65)",fontSize:13}}>
          <span>{p.date}</span>
          <span>{p.time}</span>
        </div>
      </div>
      <div style={S.scroll}>
        <div style={{padding:"20px 16px",display:"flex",gap:10,flexWrap:"wrap",borderBottom:"1px solid #f5f5f5"}}>
          {[{l:"Location",v:p.location},{l:"Level",v:p.level},{l:"Type",v:p.type}].map(({l,v})=>(
            <div key={l} style={{background:"#f8f8f8",borderRadius:10,padding:"10px 14px",minWidth:90}}>
              <div style={{color:"#aaa",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:3}}>{l}</div>
              <div style={{color:DARK,fontWeight:700,fontSize:14}}>{v}</div>
            </div>
          ))}
          {p.spots&&<div style={{background:"#fff0f7",borderRadius:10,padding:"10px 14px",border:`1px solid ${PINK}25`}}>
            <div style={{color:"#aaa",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:3}}>Spots</div>
            <div style={{color:PINK,fontWeight:700,fontSize:14}}>{p.spots} left</div>
          </div>}
        </div>
        <div style={{padding:"20px 16px"}}>
          <div style={{color:"#aaa",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:10}}>About this event</div>
          <div style={{color:"#333",fontSize:15,lineHeight:1.75}}>{p.detail}</div>
        </div>
        {p.crewOnly&&(
          <div style={{margin:"0 16px 16px",background:"#0f0f0f",borderRadius:12,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
            <CrewsIcon c={PINK} s={22}/>
            <div>
              <div style={{color:"#fff",fontWeight:700,fontSize:14}}>CrewPass Members Only</div>
              <div style={{color:"rgba(255,255,255,0.45)",fontSize:12,marginTop:2}}>You must be in a registered crew to attend this event.</div>
            </div>
          </div>
        )}
        <div style={{padding:"0 16px 32px"}}>
          {(()=>{
            const progId = "prog_" + p.id;
            const isReg = reservations.some(r=>r.id===progId);
            if(isReg) return (
              <div style={{width:"100%",padding:"15px",borderRadius:14,background:"#edfff3",border:"1px solid #bbf7d0",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" fill="#22c55e"/><path d="M5.5 9L8 11.5L12.5 6.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span style={{color:"#15803d",fontWeight:700,fontSize:16}}>You're Registered</span>
              </div>
            );
            return (
              <button onClick={()=>{
                if(p.waitlist){showToast("Added to waitlist!");return;}
                if(p.crewOnly&&!myCrew){showToast("Join a crew first!");return;}
                const newRes={id:progId,location:p.title,address:p.location,date:p.date,time:p.time,dur:p.type,pod:"EVENT",isProgram:true};
                setReservations(prev=>[...prev,newRes]);
                showToast(p.spots?"Spot reserved — see you there!":"You're registered!");
              }}
                style={{width:"100%",padding:"15px",borderRadius:14,background:p.waitlist?"#888":tc,border:"none",color:"#fff",fontSize:16,fontWeight:700,cursor:"pointer"}}>
                {p.waitlist?"Join Waitlist":p.crewOnly&&!myCrew?"Join a Crew to Register":"Register Now"}
              </button>
            );
          })()}
        </div>
      </div>
      <NavBar/>
      </div>
    </div>
  );
}
