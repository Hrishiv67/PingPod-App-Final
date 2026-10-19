import React from "react";
import { Ic } from "../components/icons";
import NavBar from "../components/layout/NavBar";
import Toast from "../components/layout/Toast";
import AppLoadingOverlay from "../components/overlays/AppLoadingOverlay";
import PopupBookedCelebration from "../components/overlays/PopupBookedCelebration";
import PopupDurhamMap from "../components/popups/PopupDurhamMap";
import PopupTruckVisual from "../components/popups/PopupTruckVisual";
import { useApp } from "../context/AppContext";
import { LOCS } from "../data/locations";
import { DARK, PINK } from "../theme";

export default function PopupsScreen() {
  const {
    S, pbDate, pbDuration, pbStep, pbTables, pbTime, popupBookedAnim, region, selPopup, selZone,
    setLocTab, setNav, setPbDate, setPbDuration, setPbStep, setPbTables, setPbTime,
    setPopupBookedAnim, setRegion, setReservations, setScreen, setSelPopup, setSelPopupSlot,
    setSelZone, showToast,
  } = useApp();
  if (region !== "Durham") {
    return (
      <div style={S.root}>
        <Toast/>
        <AppLoadingOverlay/>
        <div style={{...S.contentMax,flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
          <div style={{padding:"64px 20px 20px",background:"#fff",borderBottom:"1px solid #f0f0f0"}}>
            <div style={{fontSize:24,fontWeight:800,color:DARK,letterSpacing:"-0.4px",marginBottom:8}}>Pop-up Pods</div>
            <div style={{fontSize:14,color:"#777"}}>Pop-up Pods are currently available only in Durham.</div>
          </div>
          <div style={S.scroll}>
            <div style={{margin:"16px",padding:"16px",background:"#fff",border:"1px solid #eee",borderRadius:14}}>
              <button
                onClick={()=>{ setRegion("Durham"); const rd=LOCS["Durham"]; setLocTab(rd?.tabs?rd.tabs[0]:null); setScreen("locations"); setNav("book"); }}
                style={{width:"100%",padding:"14px",borderRadius:12,background:PINK,border:"none",color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer"}}
              >
                Choose Durham
              </button>
            </div>
          </div>
          <NavBar/>
        </div>
      </div>
    );
  }
  const DURHAM_ZONES_LIST = [
    { id: "central", name: "Central Park" },
    { id: "downtown", name: "Downtown" },
    { id: "campus", name: "Campus / Duke" },
    { id: "south", name: "South Durham" },
  ];
  const MAP_CENTER = { lat: 35.9975, lon: -78.9025 };
  const ZONE_POLYGONS = {
    // Non-overlapping map-native zone polygons; they scale with map zoom.
    central: [
      [36.008, -78.902],
      [36.008, -78.884],
      [35.999, -78.884],
      [35.999, -78.902],
    ],
    downtown: [
      [35.998, -78.911],
      [35.998, -78.895],
      [35.989, -78.895],
      [35.989, -78.911],
    ],
    campus: [
      [36.010, -78.935],
      [36.010, -78.914],
      [35.999, -78.914],
      [35.999, -78.935],
    ],
    south: [
      [35.983, -78.925],
      [35.983, -78.888],
      [35.962, -78.888],
      [35.962, -78.925],
    ],
  };
  const POPUP_LOCS = [
    {id:1,name:"Durham Central Park",address:"501 Foster St",zoneId:"central", lat:36.0,lon:-78.898,
     desc:"Open-air park tables near the main lawn. Perfect for families and first-timers.",
     pricePerTable:25,available:true},
    {id:2,name:"American Tobacco Campus",address:"318 Blackwell St",zoneId:"downtown", lat:35.996,lon:-78.901,
     desc:"High-energy downtown venue. Great for corporate events and team outings.",
     pricePerTable:40,available:true},
    {id:3,name:"Brightleaf Square",address:"905 W Main St",zoneId:"downtown", lat:35.997,lon:-78.906,
     desc:"Historic warehouse courtyard. Weekend markets, private events.",
     pricePerTable:45,available:true},
    {id:4,name:"Downtown Durham Pavilion",address:"201 Foster St",zoneId:"downtown", lat:35.994,lon:-78.897,
     desc:"Outdoor pavilion with covered tables. Ideal for events.",
     pricePerTable:35,available:true},
    {id:5,name:"Duke East Campus",address:"Buchanan Blvd",zoneId:"campus", lat:36.002,lon:-78.918,
     desc:"On-campus pop-up near the main quad. Student events and club nights.",
     pricePerTable:22,available:true},
    {id:6,name:"Duke West Campus Lawn",address:"Science Dr",zoneId:"campus", lat:36.006,lon:-78.928,
     desc:"Lawn pop-up with scenic views. Book for groups.",
     pricePerTable:28,available:true},
    {id:7,name:"Duke K-Ville",address:"Cameron Blvd",zoneId:"campus", lat:36.001,lon:-78.918,
     desc:"High-energy campus spot. Great for tournaments.",
     pricePerTable:30,available:true},
    {id:8,name:"NC Central University",address:"1801 Fayetteville St",zoneId:"south", lat:35.974,lon:-78.898,
     desc:"Community-centered pop-up for students, faculty, and residents.",
     pricePerTable:22,available:true},
    {id:9,name:"Southpoint Area Park",address:"7800 Renaissance Pkwy",zoneId:"south", lat:35.968,lon:-78.918,
     desc:"Park near Southpoint. Family-friendly, plenty of space.",
     pricePerTable:28,available:true},
    {id:10,name:"Fayetteville St Corridor",address:"500 Fayetteville St",zoneId:"south", lat:35.978,lon:-78.894,
     desc:"Downtown corridor pop-up. Walk-in friendly.",
     pricePerTable:26,available:true},
    {id:11,name:"Central Park East",address:"501 Foster St",zoneId:"central", lat:36.001,lon:-78.894,
     desc:"East lawn at Central Park. Shaded area available.",
     pricePerTable:27,available:true},
    {id:12,name:"Central Park Pavilion",address:"520 Foster St",zoneId:"central", lat:36.003,lon:-78.888,
     desc:"Covered pavilion. Rain or shine.",
     pricePerTable:32,available:true},
  ];
  const venuesInZone = selZone ? POPUP_LOCS.filter(v=>v.zoneId===selZone && v.available) : [];

  // Calendar data — April 29 through May 18
  const CAL_MONTHS = [
    { month:"April 2026", days:[
        {d:null},{d:null},{d:null},{d:1},{d:2},{d:3},{d:4},
        {d:5},{d:6},{d:7},{d:8},{d:9},{d:10},{d:11},
        {d:12},{d:13},{d:14},{d:15},{d:16},{d:17},{d:18},
        {d:19},{d:20},{d:21},{d:22},{d:23},{d:24},{d:25},
        {d:26,avail:true},{d:27,avail:true},{d:28,avail:true},{d:29,avail:true},{d:30,avail:true},
      ]},
    { month:"May 2026", days:[
        {d:null},{d:null},{d:null},{d:null},{d:null},{d:1,avail:true},{d:2,avail:true},
        {d:4,avail:true},{d:5,avail:true},{d:6,avail:true},{d:7,avail:true},{d:8,avail:true},{d:9,avail:true},{d:10,avail:true},
        {d:11,avail:true},{d:12,avail:true},{d:13,avail:true},{d:14,avail:true},{d:15,avail:true},{d:16,avail:true},{d:17,avail:true},
        {d:18,avail:true},
      ]},
  ];

  // pbStep/pbDate/pbTables/pbDuration/pbTime are hoisted to main component state
  const TIMES_POPUP = ["9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM"];
  const DURATION_OPTS = [{h:1,label:"1 hr"},{h:2,label:"2 hrs"},{h:3,label:"3 hrs"},{h:4,label:"4 hrs"},{h:8,label:"Full Day"}];

  const stepTitles = ["Choose Zone & Venue","Pick a Date","Details","Confirm"];

  const totalPriceFull = selPopup ? selPopup.pricePerTable * pbTables * pbDuration : 0;
  const totalPrice = Math.round(totalPriceFull * 0.9);

  const doBook = () => {
    const dur = DURATION_OPTS.find(o=>o.h===pbDuration)?.label||`${pbDuration}hr`;
    const popRes = {
      id:`popup_${Date.now()}`,
      location:selPopup.name,
      address:selPopup.address,
      date:pbDate,
      time:pbTime,
      dur:dur,
      pod:"POP-UP",
      isPopup:true,
      tables:pbTables,
      price:totalPrice,
    };
    setReservations(prev=>[...prev,popRes]);
    setPopupBookedAnim(popRes);
    showToast(`Booked! ${selPopup.name} · ${pbDate} · ${pbTime}`);
    setSelPopup(null); setSelZone(null); setSelPopupSlot(null); setPbStep(0); setPbDate(null); setPbTime(null); setPbTables(1); setPbDuration(1);
  };

  // Step indicator
  const StepDots = () => (
    <div style={{display:"flex",gap:6,justifyContent:"center",padding:"8px 0 4px"}}>
      {stepTitles.map((_,i)=>(
        <div key={i} style={{height:3,borderRadius:2,background:i<=pbStep?PINK:"#e8e8e8",
          width:i===pbStep?24:12,transition:"all 0.25s"}}/>
      ))}
    </div>
  );

  return (
    <div style={S.root}>
      <Toast/>
      <AppLoadingOverlay/>
      {popupBookedAnim&&<PopupBookedCelebration/>}
      <div style={{...S.contentMax,flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
        <div style={{background:"#fff",flexShrink:0,padding:"52px 20px 0",borderBottom:"1px solid #f0f0f0"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
            <div>
              <div style={{fontSize:22,fontWeight:800,letterSpacing:"-0.5px",color:DARK}}>Pop-up Pods</div>
              <div style={{color:"#999",fontSize:13,marginTop:2}}>Mobile ping pong anywhere in Durham</div>
            </div>
            <div style={{width:42,height:42,borderRadius:14,background:"#fff0f7",display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${PINK}20`}}>
              <Ic.Truck c={PINK} s={20}/>
            </div>
          </div>
          <StepDots/>
        <div style={{display:"flex",gap:0,borderBottom:"none",paddingBottom:12,marginTop:8,overflowX:"auto",scrollbarWidth:"none"}}>
          {stepTitles.map((t,i)=>(
            <button key={i} onClick={()=>{ if(i<pbStep) setPbStep(i); }}
              style={{display:"flex",alignItems:"center",gap:4,background:"none",border:"none",cursor:i<pbStep?"pointer":"default",padding:"0 8px 0 0",flexShrink:0}}>
              <div style={{width:18,height:18,borderRadius:"50%",
                background:i<pbStep?"#22c55e":i===pbStep?PINK:"#e8e8e8",
                display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                {i<pbStep
                  ? <svg width="10" height="10" viewBox="0 0 10 10"><polyline points="1.5,5 4,8 8.5,2" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
                  : <span style={{fontSize:8,fontWeight:800,color:i===pbStep?"#fff":"#bbb"}}>{i+1}</span>
                }
              </div>
              <span style={{fontSize:11,fontWeight:i===pbStep?700:500,color:i===pbStep?DARK:i<pbStep?"#22c55e":"#bbb",whiteSpace:"nowrap"}}>{t}</span>
              {i<stepTitles.length-1&&<span style={{color:"#e0e0e0",fontSize:11,marginLeft:4}}>›</span>}
            </button>
          ))}
        </div>
      </div>

      <div style={S.scroll}>

        {/* ── How Pop-ups work: sleek truck + table ── */}
        {pbStep===0&&(
          <PopupTruckVisual pink={PINK} fontFamily="'Plus Jakarta Sans', -apple-system, Helvetica Neue, Arial, sans-serif" />
        )}

        {/* ── STEP 0: Select zone (category) → then venue dropdown; map with pins ── */}
        {pbStep===0&&(
          <>
            <div style={{padding:"12px 16px 6px"}}>
              <div style={{fontSize:12,fontWeight:700,color:"#888",marginBottom:8}}>Select a zone</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {DURHAM_ZONES_LIST.map(z=>(
                  <button key={z.id} type="button" onClick={()=>{setSelZone(selZone===z.id?null:z.id); setSelPopup(null);}}
                    style={{padding:"8px 14px",borderRadius:20,border:`1.5px solid ${selZone===z.id?PINK:"#e5e5e5"}`,background:selZone===z.id?PINK+"10":"#fff",color:selZone===z.id?PINK:DARK,fontSize:13,fontWeight:600,cursor:"pointer",transition:"all 0.2s"}}>
                    {z.name}
                  </button>
                ))}
              </div>
            </div>
            <PopupDurhamMap
              center={MAP_CENTER}
              zones={DURHAM_ZONES_LIST}
              zonePolygons={ZONE_POLYGONS}
              selectedZoneId={selZone}
              venues={selZone ? venuesInZone : POPUP_LOCS.filter(p=>p.available)}
              selectedVenueId={selPopup?.id}
              pink={PINK}
            />
            {selZone && (
              <div style={{margin:"2px 16px 12px",background:"#fff",border:"1px solid #ededed",borderRadius:14,padding:"10px 10px 8px"}}>
                <style>{`
                  @keyframes zoneOrbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                  @keyframes zonePulse { 0% { transform: scale(0.85); opacity: 0.85; } 100% { transform: scale(1.65); opacity: 0; } }
                `}</style>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                  <div style={{fontSize:12,fontWeight:800,color:DARK,letterSpacing:"0.2px"}}>Zone locations</div>
                  <div style={{fontSize:11,color:"#888"}}>{venuesInZone.length} in this zone</div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr",gap:8}}>
                  {venuesInZone.map((v) => {
                    const selected = selPopup?.id === v.id;
                    const orbitHue = (v.id * 37) % 360;
                    const orbitColor = selected ? `hsl(${orbitHue}, 92%, 48%)` : "#b8b8b8";
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={()=>setSelPopup(v)}
                        style={{
                          width:"100%",
                          border:selected?`1.5px solid ${PINK}`:"1.5px solid #ececec",
                          background:selected?"#fff0f7":"#fff",
                          borderRadius:12,
                          padding:"9px 10px",
                          display:"flex",
                          alignItems:"center",
                          justifyContent:"space-between",
                          cursor:"pointer",
                          textAlign:"left",
                        }}
                      >
                        <div style={{display:"flex",alignItems:"center",gap:10,minWidth:0}}>
                          <div style={{position:"relative",width:20,height:20,flexShrink:0}}>
                            {selected && <div style={{position:"absolute",inset:0,borderRadius:"50%",border:`1px solid ${orbitColor}`,animation:"zonePulse 1.15s ease-out infinite"}} />}
                            {selected && (
                              <div style={{position:"absolute",inset:-4,borderRadius:"50%",border:`1px solid ${orbitColor}66`,animation:`zoneOrbitSpin ${1.4 + (v.id % 4) * 0.28}s linear infinite`}}>
                                <div style={{position:"absolute",left:"50%",top:-2,marginLeft:-2,width:4,height:4,borderRadius:"50%",background:orbitColor}} />
                              </div>
                            )}
                            <div style={{position:"absolute",left:4,top:4,width:12,height:12,borderRadius:"50%",background:selected?PINK:"#fff",border:`2px solid ${selected?PINK:"#bbb"}`}} />
                          </div>
                          <div style={{minWidth:0}}>
                            <div style={{fontSize:12.5,fontWeight:700,color:DARK,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{v.name}</div>
                            <div style={{fontSize:11,color:"#8a8a8a",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{v.address}</div>
                          </div>
                        </div>
                        <div style={{fontSize:12,fontWeight:700,color:selected?PINK:"#666",marginLeft:8}}>${v.pricePerTable}/hr</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {selPopup&&(
              <div style={{margin:"-6px 16px 10px",background:"rgba(255,255,255,0.96)",borderRadius:10,padding:"8px 12px",boxShadow:"0 2px 12px rgba(0,0,0,0.1)",backdropFilter:"blur(8px)"}}>
                <div style={{fontSize:12,fontWeight:700,color:DARK}}>{selPopup.name}</div>
                <div style={{fontSize:11,color:"#888"}}>{selPopup.address} · ${selPopup.pricePerTable}/table/hr</div>
              </div>
            )}
            <div style={{padding:"12px 16px 32px"}}>
              <button onClick={()=>{if(!selZone){showToast("Select a zone first");return;} if(!selPopup){showToast("Select a location in Zone locations");return;} setPbStep(1);}}
                style={{width:"100%",padding:"15px",borderRadius:14,
                  background:selZone&&selPopup?PINK:"#e8e8e8",
                  border:"none",color:"#fff",fontSize:15,fontWeight:700,cursor:selZone&&selPopup?"pointer":"not-allowed",
                  transition:"background 0.2s",letterSpacing:"-0.2px"}}>
                {selPopup?`Continue with ${selPopup.name} →`:selZone?"Pick a location from Zone locations":"Select a zone, then a location"}
              </button>
            </div>
          </>
        )}

        {/* ── STEP 1: Pick a Date ── */}
        {pbStep===1&&(
          <>
            <div style={{padding:"20px 16px 8px"}}>
              <div style={{fontSize:17,fontWeight:700,color:DARK,marginBottom:4}}>When do you want it?</div>
              <div style={{fontSize:13,color:"#888"}}>Availability from April 29 onwards</div>
            </div>

            {CAL_MONTHS.map((mo,mi)=>(
              <div key={mi} style={{margin:"0 16px 16px",background:"#fff",borderRadius:16,border:"1px solid #ebebeb",overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px 10px"}}>
                  <span style={{fontWeight:700,fontSize:15,color:DARK}}>{mo.month}</span>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,padding:"0 10px 6px"}}>
                  {["S","M","T","W","T","F","S"].map((d,i)=>(
                    <div key={i} style={{textAlign:"center",fontSize:10,fontWeight:700,color:"#bbb",padding:"2px 0"}}>{d}</div>
                  ))}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3,padding:"0 10px 14px"}}>
                  {mo.days.map((day,di)=>{
                    if(!day.d) return <div key={di}/>;
                    const key = `${mo.month.split(' ')[0].slice(0,3)} ${day.d}`;
                    const isSelected = pbDate===key;
                    return (
                      <button key={di} onClick={()=>{if(day.avail){setPbDate(key);setPbTime(null);}}}
                        disabled={!day.avail}
                        style={{aspectRatio:"1",borderRadius:10,border:"none",
                          background:isSelected?PINK:day.avail?"#f8f8f8":"transparent",
                          color:isSelected?"#fff":day.avail?DARK:"#ddd",
                          fontWeight:isSelected?800:day.avail?600:400,
                          fontSize:13,cursor:day.avail?"pointer":"default",
                          transition:"all 0.15s",
                          boxShadow:isSelected?`0 2px 8px ${PINK}40`:"none"}}>
                        {day.d}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <div style={{padding:"4px 16px 32px",display:"flex",gap:10}}>
              <button onClick={()=>setPbStep(0)}
                style={{flex:1,padding:"14px",borderRadius:14,background:"#f5f5f5",border:"none",color:DARK,fontSize:14,fontWeight:600,cursor:"pointer"}}>
                ← Back
              </button>
              <button onClick={()=>{if(!pbDate){showToast("Please pick a date");return;} setPbStep(2);}}
                style={{flex:2,padding:"14px",borderRadius:14,background:pbDate?PINK:"#e8e8e8",border:"none",color:"#fff",fontSize:14,fontWeight:700,cursor:pbDate?"pointer":"not-allowed",transition:"background 0.2s"}}>
                {pbDate?`Continue with ${pbDate} →`:"Pick a date to continue"}
              </button>
            </div>
          </>
        )}

        {/* ── STEP 2: Details (tables, duration, time) ── */}
        {pbStep===2&&(
          <>
            <div style={{padding:"20px 16px 0"}}>
              <div style={{fontSize:17,fontWeight:700,color:DARK,marginBottom:2}}>Customize your booking</div>
              <div style={{fontSize:13,color:"#888",marginBottom:20}}>{selPopup?.name} · {pbDate}</div>
              <div style={{marginBottom:22}}>
                <div style={{fontSize:11,fontWeight:700,color:"#aaa",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:10}}>Number of Tables</div>
                <div style={{display:"flex",gap:8}}>
                  {[1,2,3,4].map(n=>(
                    <button key={n} onClick={()=>setPbTables(n)}
                      style={{flex:1,aspectRatio:"1",borderRadius:12,border:`2px solid ${pbTables===n?PINK:"#e8e8e8"}`,
                        background:pbTables===n?"#fff0f7":"#fafafa",
                        color:pbTables===n?PINK:DARK,fontWeight:700,fontSize:16,cursor:"pointer",
                        display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,
                        transition:"all 0.15s"}}>
                      {n}
                      <span style={{fontSize:9,fontWeight:600,color:pbTables===n?PINK:"#bbb"}}>table{n>1?"s":""}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div style={{marginBottom:22}}>
                <div style={{fontSize:11,fontWeight:700,color:"#aaa",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:10}}>Duration</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {DURATION_OPTS.map(opt=>(
                    <button key={opt.h} onClick={()=>setPbDuration(opt.h)}
                      style={{padding:"10px 16px",borderRadius:10,border:`2px solid ${pbDuration===opt.h?PINK:"#e8e8e8"}`,
                        background:pbDuration===opt.h?"#fff0f7":"#fafafa",
                        color:pbDuration===opt.h?PINK:DARK,fontWeight:600,fontSize:13,cursor:"pointer",
                        transition:"all 0.15s"}}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{marginBottom:22}}>
                <div style={{fontSize:11,fontWeight:700,color:"#aaa",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:10}}>Start Time</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                  {TIMES_POPUP.map(t=>(
                    <button key={t} onClick={()=>setPbTime(t)}
                      style={{padding:"10px 6px",borderRadius:10,border:`2px solid ${pbTime===t?PINK:"#e8e8e8"}`,
                        background:pbTime===t?"#fff0f7":"#fafafa",
                        color:pbTime===t?PINK:DARK,fontWeight:600,fontSize:13,cursor:"pointer",
                        textAlign:"center",transition:"all 0.15s"}}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{background:"#fafafa",borderRadius:14,padding:"16px",border:"1px solid #ebebeb",marginBottom:8}}>
                <div style={{fontSize:11,fontWeight:700,color:"#aaa",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:10}}>Price Estimate</div>
                {[
                  ["Location",selPopup?.name],
                  ["Date & Time",pbDate&&pbTime?`${pbDate} · ${pbTime} · ${DURATION_OPTS.find(o=>o.h===pbDuration)?.label||""}`:pbDate?"Date selected, no time yet":"—"],
                  ["Tables",`${pbTables} table${pbTables>1?"s":""} × ${DURATION_OPTS.find(o=>o.h===pbDuration)?.label||""}`],
                  ["Rate",`$${selPopup?.pricePerTable}/table/hr (10% member discount applied)`],
                ].map(([k,v])=>(
                  <div key={k} style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <span style={{fontSize:13,color:"#888"}}>{k}</span>
                    <span style={{fontSize:13,fontWeight:600,color:DARK}}>{v}</span>
                  </div>
                ))}
                <div style={{borderTop:"1px solid #e8e8e8",marginTop:10,paddingTop:10,display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
                  <span style={{fontSize:14,fontWeight:700,color:DARK}}>Total</span>
                  <span style={{fontSize:20,fontWeight:800,color:PINK}}>${totalPrice}</span>
                </div>
              </div>
            </div>

            <div style={{padding:"8px 16px 32px",display:"flex",gap:10}}>
              <button onClick={()=>setPbStep(1)}
                style={{flex:1,padding:"14px",borderRadius:14,background:"#f5f5f5",border:"none",color:DARK,fontSize:14,fontWeight:600,cursor:"pointer"}}>
                ← Back
              </button>
              <button onClick={()=>{if(!pbTime){showToast("Pick a start time first");return;} setPbStep(3);}}
                style={{flex:2,padding:"14px",borderRadius:14,background:pbTime?PINK:"#e8e8e8",border:"none",color:"#fff",fontSize:14,fontWeight:700,cursor:pbTime?"pointer":"not-allowed",transition:"background 0.2s"}}>
                Review Booking →
              </button>
            </div>
          </>
        )}

        {/* ── STEP 3: Confirm ── */}
        {pbStep===3&&(
          <>
            <div style={{padding:"20px 16px 0"}}>
              <div style={{fontSize:17,fontWeight:700,color:DARK,marginBottom:16}}>Review & Confirm</div>
              <div style={{background:"#fff",borderRadius:16,border:"1px solid #ebebeb",overflow:"hidden",marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
                <div style={{background:`linear-gradient(135deg,${PINK}18 0%,${PINK}08 100%)`,padding:"16px 20px",borderBottom:"1px solid #f5e0ec"}}>
                  <div style={{fontSize:11,fontWeight:700,color:PINK,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:4}}>Pop-up Pod Booking</div>
                  <div style={{fontSize:18,fontWeight:800,color:DARK,letterSpacing:"-0.3px"}}>{selPopup?.name}</div>
                  <div style={{fontSize:13,color:"#666",marginTop:2}}>{selPopup?.address}</div>
                </div>
                <div style={{padding:"14px 20px"}}>
                  {[
                    ["Date",pbDate],
                    ["Start Time",pbTime],
                    ["Duration",DURATION_OPTS.find(o=>o.h===pbDuration)?.label||""],
                    ["Tables",`${pbTables} table${pbTables>1?"s":""}`],
                  ].map(([k,v])=>(
                    <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:10,marginBottom:10,borderBottom:"1px solid #f8f8f8"}}>
                      <span style={{fontSize:13,color:"#888",fontWeight:500}}>{k}</span>
                      <span style={{fontSize:14,fontWeight:700,color:DARK}}>{v}</span>
                    </div>
                  ))}
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:14,fontWeight:700,color:DARK}}>Total</span>
                    <span style={{fontSize:22,fontWeight:800,color:PINK}}>${totalPrice}</span>
                  </div>
                </div>
              </div>

              {/* What's included */}
              <div style={{background:"#f8fffe",borderRadius:14,padding:"14px 16px",border:"1px solid #d1fae5",marginBottom:16}}>
                <div style={{fontSize:11,fontWeight:700,color:"#059669",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:10}}>What's included</div>
                {["Professional table tennis table(s) delivered & set up","Paddles, balls, and safety netting","On-site PingPod staff for setup and breakdown","Optional branded banner (+$50)"].map(item=>(
                  <div key={item} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:7}}>
                    <div style={{width:16,height:16,borderRadius:"50%",background:"#d1fae5",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                      <svg width="8" height="8" viewBox="0 0 8 8"><polyline points="1,4 3,6.5 7,1.5" stroke="#059669" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
                    </div>
                    <span style={{fontSize:12,color:"#333",lineHeight:1.5}}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{padding:"4px 16px 32px",display:"flex",gap:10}}>
              <button onClick={()=>setPbStep(2)}
                style={{flex:1,padding:"14px",borderRadius:14,background:"#f5f5f5",border:"none",color:DARK,fontSize:14,fontWeight:600,cursor:"pointer"}}>
                ← Back
              </button>
              <button onClick={doBook}
                style={{flex:2,padding:"14px",borderRadius:14,background:PINK,border:"none",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",letterSpacing:"-0.2px"}}>
                Confirm Booking
              </button>
            </div>
          </>
        )}
      </div>
      <NavBar/>
      </div>
    </div>
  );
}
