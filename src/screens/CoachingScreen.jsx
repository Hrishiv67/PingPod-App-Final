import React from "react";
import CoachAvatar from "../components/coaching/CoachAvatar";
import { Ic } from "../components/icons";
import NavBar from "../components/layout/NavBar";
import Toast from "../components/layout/Toast";
import LocRow from "../components/locations/LocRow";
import RegionHeader from "../components/locations/RegionHeader";
import AppLoadingOverlay from "../components/overlays/AppLoadingOverlay";
import Divider from "../components/ui/Divider";
import SecSep from "../components/ui/SecSep";
import { useApp } from "../context/AppContext";
import { COACHES_BY_REGION } from "../data/coaches";
import { REG_IMG } from "../data/images";
import { LOCS, REGIONS } from "../data/locations";
import { DATES } from "../data/schedule";
import { DARK, PINK } from "../theme";

export default function CoachingScreen() {
  const {
    S, coachBooked, coachDate, coachDetail, coachDur, coachLoc, coachTime, confirmCoachBooking,
    locTab, openBooking, pickRegion, region, setCoachBooked, setCoachDate, setCoachDetail,
    setCoachDur, setCoachLoc, setCoachTime, setLocTab, showToast,
  } = useApp();
  const coaches = region ? (COACHES_BY_REGION[region]||[]) : [];

    if (coachBooked) return (
    <div style={S.root}>
      <div style={{...S.contentMax,flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:14,padding:24}}>
          <div style={{width:76,height:76,borderRadius:"50%",background:"#f0fff4",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic.Check c="#22c55e" s={38}/></div>
          <div style={{fontSize:26,fontWeight:800,color:DARK,letterSpacing:"-0.5px"}}>Lesson booked!</div>
          <CoachAvatar coach={coachDetail} size={60}/>
          <div style={{fontSize:16,fontWeight:700,color:DARK}}>{coachDetail.name}</div>
          <div style={{fontSize:14,color:"#aaa",textAlign:"center"}}>{coachDate} · {coachTime} · {coachDur}</div>
          <div style={{fontSize:15,fontWeight:700,color:PINK}}>${coachDetail.price * (coachDur==="2 hrs"?2:coachDur==="90 min"?1.5:1)}/session</div>
        </div>
        <NavBar/>
      </div>
    </div>
  );

    if (coachDetail) {
    const availTimes = coachDetail.times[coachDate]||[];
    const price = coachDetail.price;
    const durMulti = coachDur==="2 hrs"?2:coachDur==="90 min"?1.5:1;
    return (
      <div style={S.root}>
        <Toast/>
        <AppLoadingOverlay/>
        <div style={{...S.contentMax,flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
        <div style={{...S.topBar,paddingBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:4}}>
            <button onClick={()=>{setCoachDetail(null);setCoachTime(null);}} style={{background:"none",border:"none",cursor:"pointer",padding:"2px 6px 2px 0",display:"flex"}}><Ic.ChevL/></button>
            <div style={{fontSize:20,fontWeight:700,letterSpacing:"-0.3px"}}>Book a Lesson</div>
          </div>
        </div>
        <div style={S.scroll}>
          <div style={{padding:"0 16px 96px"}}>
            <div style={{display:"flex",gap:14,alignItems:"flex-start",padding:"4px 0 20px",borderBottom:"1px solid #f0f0f0",marginBottom:20}}>
              <CoachAvatar coach={coachDetail} size={72}/>
              <div style={{flex:1}}>
                <div style={{fontWeight:800,fontSize:18,color:DARK,letterSpacing:"-0.3px"}}>{coachDetail.name}</div>
                <div style={{color:"#888",fontSize:13,marginBottom:4}}>{coachDetail.title} · {coachDetail.specialty}</div>
                <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:6}}>
                  <span style={{display:"flex",alignItems:"center",gap:3,fontSize:13}}><Ic.Star s={13}/>{coachDetail.rating}</span>
                  <span style={{color:"#ccc",fontSize:12}}>{coachDetail.sessions} sessions</span>
                  <span style={{background:PINK+"15",color:PINK,fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:6}}>{coachDetail.level}</span>
                </div>
                <div style={{fontSize:13,color:"#555",lineHeight:1.55}}>{coachDetail.bio}</div>
              </div>
            </div>
            <div style={{fontWeight:700,fontSize:11,color:"#aaa",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.8px"}}>Location</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:22}}>
              {coachDetail.locations.map(l=>(
                <button key={l} onClick={()=>setCoachLoc(l)}
                  style={{padding:"9px 16px",borderRadius:10,border:`2px solid ${coachLoc===l?PINK:"#e0e0e0"}`,background:coachLoc===l?"#fff0f7":"#fff",color:coachLoc===l?PINK:"#555",fontWeight:600,cursor:"pointer",fontSize:13}}>
                  {l}
                </button>
              ))}
            </div>
            <div style={{fontWeight:700,fontSize:11,color:"#aaa",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.8px"}}>Duration</div>
            <div style={{display:"flex",gap:10,marginBottom:22}}>
              {["1 hr","90 min","2 hrs"].map(d=>(
                <button key={d} onClick={()=>{setCoachDur(d);setCoachTime(null);}}
                  style={{flex:1,padding:"11px 0",borderRadius:10,border:`2px solid ${coachDur===d?PINK:"#e0e0e0"}`,background:coachDur===d?"#fff0f7":"#fff",color:coachDur===d?PINK:DARK,fontWeight:600,cursor:"pointer",fontSize:13}}>
                  {d}
                </button>
              ))}
            </div>
            <div style={{background:"#f8f8f8",borderRadius:12,padding:"12px 16px",marginBottom:22}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <div>
                  <div style={{fontWeight:700,fontSize:15,color:DARK,textDecoration:"line-through",opacity:0.5}}>${price * durMulti}</div>
                  <div style={{color:"#aaa",fontSize:12,marginTop:1}}>${price}/hr · {coachDur}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontWeight:800,fontSize:17,color:DARK}}>${Math.round(price * durMulti * 0.9)}</div>
                  <div style={{fontSize:10,color:"#aaa"}}>your price</div>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 10px",background:"#0EA5E920",borderRadius:8}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:"#0EA5E9",flexShrink:0}}/>
                <span style={{fontSize:11,color:"#0EA5E9",fontWeight:700}}>Member 10% off applied</span>
              </div>
            </div>
            <div style={{fontWeight:700,fontSize:11,color:"#aaa",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.8px"}}>Date</div>
            <div style={{display:"flex",gap:8,overflowX:"auto",marginBottom:22,paddingBottom:4,scrollbarWidth:"none"}}>
              {DATES.map(d=><button key={d} onClick={()=>{setCoachDate(d);setCoachTime(null);}} style={{...S.chip(coachDate===d),flexShrink:0}}>{d}</button>)}
            </div>
            <div style={{fontWeight:700,fontSize:11,color:"#aaa",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.8px"}}>
              Available Times — {coachDate}
            </div>
            {availTimes.length===0 ? (
              <div style={{color:"#bbb",fontSize:14,padding:"12px 0 22px"}}>No availability on this date</div>
            ) : (
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:28}}>
                {availTimes.map(t=>(
                  <button key={t} onClick={()=>setCoachTime(t)}
                    style={{padding:"13px 0",borderRadius:10,border:`2px solid ${coachTime===t?PINK:"#eee"}`,background:coachTime===t?"#fff0f7":"#fafafa",color:coachTime===t?PINK:DARK,fontWeight:600,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                    <Ic.Clock c={coachTime===t?PINK:"#bbb"} s={13}/>
                    {t}
                  </button>
                ))}
              </div>
            )}

            <button onClick={()=>{if(!coachTime||!coachLoc){showToast("Select location and time");return;}confirmCoachBooking();}}
              style={{width:"100%",padding:"15px 0",borderRadius:12,background:(!coachTime||!coachLoc)?"#ccc":DARK,color:"#fff",fontSize:16,fontWeight:700,cursor:"pointer",border:"none"}}>
              Book Lesson · ${Math.round(price * durMulti * 0.9)}
            </button>
          </div>
        </div>
        </div>
        <NavBar/>
      </div>
    );
  }

    // No region selected yet
  if (!region) return (
    <div style={S.root}>
      <Toast/>
      <div style={{...S.contentMax,flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
        <div style={{...S.topBar,paddingBottom:14}}>
          <div style={{fontSize:22,fontWeight:700,color:DARK,letterSpacing:"-0.3px"}}>Coaching</div>
        </div>
        <div style={S.scroll}>
          <div style={{padding:"16px 16px 8px",color:"#888",fontSize:14}}>Choose a region to find coaches near you.</div>
          <div style={{padding:"8px 12px 24px"}}>
            {REGIONS.map(r=>(
              <div key={r} onClick={()=>pickRegion(r)}
                style={{borderRadius:14,overflow:"hidden",cursor:"pointer",marginBottom:10,position:"relative",height:120,maxHeight:160,background:"#1a1a1a"}}>
                <img src={REG_IMG[r]} alt={r} style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",inset:0}}/>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.72) 0%,rgba(0,0,0,.1) 55%,transparent 100%)"}}/>
                <div style={{position:"absolute",bottom:12,left:14,color:"#fff",fontSize:17,fontWeight:700,textShadow:"0 1px 6px rgba(0,0,0,.5)"}}>{r}</div>
              </div>
            ))}
          </div>
        </div>
        <NavBar/>
      </div>
    </div>
  );

  const rd = LOCS[region];
  const curTab = locTab||(rd.tabs?rd.tabs[0]:null);
  const locs = rd.tabs?(rd[curTab]||[]):(rd.default||[]);

  return (
    <div style={S.root}>
      <Toast/>
      <div style={{...S.contentMax,flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
        <RegionHeader rd={rd} curTab={curTab} onTabChange={t=>setLocTab(t)}/>
        <div style={S.scroll}>
        <div style={{margin:"14px 16px 0",background:"#0f0f0f",borderRadius:14,padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{color:"#fff",fontWeight:700,fontSize:15}}>Private Lessons</div>
            <div style={{color:"rgba(255,255,255,.5)",fontSize:12,marginTop:2}}>Club · <span style={{textDecoration:"line-through",opacity:0.6}}>$50</span> $45/hr  ·  Master · <span style={{textDecoration:"line-through",opacity:0.6}}>$120</span> $108/hr</div>
          </div>
          <div style={{background:"#0EA5E9",borderRadius:8,padding:"5px 10px"}}>
            <span style={{color:"#fff",fontSize:11,fontWeight:700}}>Your 10% off</span>
          </div>
        </div>

        <div style={S.secHd}>Coaches in {region}</div>
        {coaches.map((coach,i)=>(
          <div key={coach.id}>
            <div onClick={()=>{setCoachDetail(coach);setCoachDate("Sun, Apr 26");setCoachTime(null);setCoachLoc(coach.locations[0]);setCoachDur("1 hr");setCoachBooked(false);}}
              style={{display:"flex",gap:14,padding:"14px 16px",cursor:"pointer",alignItems:"flex-start"}}>
              <CoachAvatar coach={coach} size={60}/>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:2}}>
                  <div style={{fontWeight:700,fontSize:16,color:DARK}}>{coach.name}</div>
                  <div style={{fontWeight:800,fontSize:15,color:DARK}}>${coach.price}<span style={{fontSize:11,fontWeight:500,color:"#aaa"}}>/hr</span></div>
                </div>
                <div style={{color:"#888",fontSize:13,marginBottom:4}}>{coach.title} · {coach.specialty}</div>
                <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:6}}>
                  <span style={{display:"flex",alignItems:"center",gap:3,fontSize:13}}><Ic.Star s={13}/>{coach.rating}</span>
                  <span style={{color:"#ccc",fontSize:12}}>{coach.sessions} sessions</span>
                  <span style={{background:PINK+"15",color:PINK,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:5}}>{coach.level}</span>
                </div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {coach.locations.map(l=>(
                    <span key={l} style={{...S.badge,background:"#fff0f7",color:PINK,borderColor:PINK+"30"}}>📍 {l}</span>
                  ))}
                </div>
              </div>
            </div>
            {i<coaches.length-1&&<Divider/>}
          </div>
        ))}

        <SecSep/>
        <div style={S.secHd}>Locations</div>
        {locs.map((loc,i)=>(
          <div key={loc.id}><LocRow loc={loc} onPress={openBooking}/>{i<locs.length-1&&<Divider/>}</div>
        ))}
        <div style={{height:20}}/>
      </div>
        <NavBar/>
      </div>
    </div>
  );
}
