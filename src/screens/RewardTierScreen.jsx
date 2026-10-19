import React from "react";
import CrewSheet from "../components/crews/CrewSheet";
import { Ic } from "../components/icons";
import NavBar from "../components/layout/NavBar";
import { useApp } from "../context/AppContext";
import { DARK, PINK } from "../theme";

export default function RewardTierScreen() {
  const {
    S, canJoinCrew, createCrew, crewName, crews, joinCrew, leaveCrew, modal, myCrew, region,
    selTier, setCrewName, setModal, setScreen, setSelTier,
  } = useApp();
  const TIERS = [
    {lv:1, label:"Rookie",     color:"#8B8FA8",xpNeeded:0,     abbr:"TT",  headline:"Welcome to the Game",
     perks:[
       {abbr:"PRO", title:"Crew Profile",     desc:"Your crew gets a public profile on the leaderboard with full stats, streak history, and XP timeline."},
       {abbr:"XP",  title:"Live XP Tracking", desc:"Watch your crew XP grow in real time after every booking, event, and match."},
       {abbr:"CAL", title:"Crew Calendar",    desc:"One shared calendar so crew members can see each other's upcoming bookings and coordinate sessions."},
     ],
     howToEarn:"Book tables together, attend events, and play off-peak hours to start stacking XP.",
     grad:"linear-gradient(170deg,#1c1c28 0%,#080810 100%)"},
    {lv:3, label:"Rising Crew",color:"#10B981",xpNeeded:2000,  abbr:"EV",  headline:"Invite-Only Events",
     perks:[
       {abbr:"TKT", title:"Exclusive Events",       desc:"Early invites to members-only tournament nights and PingPod special events — 48 hrs before public."},
       {abbr:"ALT", title:"Priority Notifications", desc:"First to know about new locations, drop events, and limited workshops before anyone else."},
       {abbr:"VS",  title:"Crew vs. Crew",          desc:"Challenge other Level 3+ crews to head-to-head match nights at any PingPod location."},
     ],
     howToEarn:"Reach 2,000 Crew XP. Earn 50 XP per booking, 30 for open play, 80 for league or tournament wins.",
     grad:"linear-gradient(170deg,#0a2018 0%,#080810 100%)"},
    {lv:5, label:"Core Crew",  color:"#0EA5E9",xpNeeded:5000,  abbr:"15%", headline:"Crew Night Discounts",
     perks:[
       {abbr:"15%", title:"15% Off Crew Bookings",  desc:"3+ crew members booking together automatically get 15% off the hourly rate at checkout."},
       {abbr:"LTE", title:"Extended Hours",         desc:"Book tables during late-night slots (10 PM–midnight) unavailable to non-crew members."},
       {abbr:"BKT", title:"Crew Bracket Events",    desc:"Enter exclusive crew-bracket tournaments with prize pools including free hours, gear, and merch."},
       {abbr:"WLL", title:"Crew Photo Wall",        desc:"Your highlights and wins get featured on the digital wall at your home PingPod location."},
     ],
     howToEarn:"Reach 5,000 Crew XP. Consistent weekly bookings by all members accelerates progress.",
     grad:"linear-gradient(170deg,#061828 0%,#080810 100%)"},
    {lv:7, label:"Elite Crew", color:"#7C3AED",xpNeeded:10000, abbr:"ELT", headline:"Free Hours + Priority",
     perks:[
       {abbr:"4HR", title:"4 Free Hours / Month",   desc:"4 complimentary table hours every calendar month, shared across all members. Roll over up to 2 months."},
       {abbr:"14D", title:"14-Day Advance Booking", desc:"Book tables 14 days ahead — double the standard window. Secure prime weekend slots first."},
       {abbr:"SZN", title:"Season Championship",    desc:"Auto entry into PingPod's quarterly Season Championship. Top crew wins free membership for all members."},
       {abbr:"BAD", title:"Elite Badge",            desc:"Exclusive Elite badge on your crew profile, visible to all players across every leaderboard."},
       {abbr:"VIP", title:"Dedicated Crew Line",    desc:"Direct access to PingPod staff. No hold times, ever."},
     ],
     howToEarn:"Reach 10,000 Crew XP. A fully active 6-person crew reaches this in roughly 3 months.",
     grad:"linear-gradient(170deg,#160a2e 0%,#080810 100%)"},
    {lv:10,label:"Legend",     color:"#FF0080", xpNeeded:20000, abbr:"LEG", headline:"All Access + Gear",
     perks:[
       {abbr:"PAD", title:"Custom Crew Paddles",  desc:"Custom-engraved Butterfly paddles with your crew name and colors. One set per member, yours to keep."},
       {abbr:"KIT", title:"Crew Kit",             desc:"Official PingPod jersey with your crew name, colors, and number for all official events."},
       {abbr:"INF", title:"Unlimited Free Hours", desc:"No hourly charges for any member at any PingPod location while you hold Legend status."},
       {abbr:"ALL", title:"All-Location Access",  desc:"Book at any PingPod city — NYC, Philly, Boston, Chicago, Miami — at zero cost during standard hours."},
       {abbr:"HOF", title:"Hall of Fame",         desc:"Permanently listed in the PingPod Hall of Fame at every location and on the website."},
       {abbr:"CTH", title:"Coaching Sessions",    desc:"Two complimentary 1-hr Master Coach sessions per month for the whole crew, no fee."},
     ],
     howToEarn:"Reach 20,000 Crew XP — reserved for the most dedicated crews in history.",
     grad:"linear-gradient(170deg,#2a0018 0%,#080810 100%)"},
  ];
  const tier = TIERS.find(t=>t.lv===selTier)||TIERS[1];
  const isUnlocked = !!myCrew && myCrew.level>=tier.lv;
  const prog = (myCrew&&tier.xpNeeded>0) ? Math.min(1,myCrew.xp/tier.xpNeeded) : 0;
  const AbbrBadge = ({abbr,color,dim=44}) => (
    <div style={{width:dim,height:dim,borderRadius:13,background:color+"18",border:`1px solid ${color}28`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      <span style={{color,fontSize:8.5,fontWeight:900,letterSpacing:"0.2px"}}>{abbr}</span>
    </div>
  );
  return (
    <div style={S.root}>
      <div style={{...S.contentMax,flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
      <div style={{background:tier.grad,flexShrink:0,padding:"54px 20px 20px"}}>
        <button onClick={()=>setScreen("crews")}
          style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:20,padding:"7px 14px",color:"rgba(255,255,255,0.65)",fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:20}}>
          <Ic.ChevL c="rgba(255,255,255,0.65)" s={15}/> Reward Tiers
        </button>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12}}>
          <div style={{flex:1}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.07)",borderRadius:20,padding:"4px 12px",marginBottom:10,border:"1px solid rgba(255,255,255,0.1)"}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:tier.color}}/>
              <span style={{color:"rgba(255,255,255,0.65)",fontSize:10,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase"}}>Level {tier.lv} · {tier.label}</span>
            </div>
            <div style={{color:"#fff",fontSize:24,fontWeight:800,letterSpacing:"-0.5px",lineHeight:1.2,marginBottom:6}}>{tier.headline}</div>
            <div style={{color:"rgba(255,255,255,0.35)",fontSize:13}}>{tier.xpNeeded===0?"Starting tier — everyone begins here":"Unlocks at "+tier.xpNeeded.toLocaleString()+" Crew XP"}</div>
          </div>
          <div style={{width:52,height:52,borderRadius:15,background:tier.color+"20",border:`1.5px solid ${tier.color}35`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <span style={{color:tier.color,fontSize:9,fontWeight:900,letterSpacing:"0.3px"}}>{tier.abbr}</span>
          </div>
        </div>
        {myCrew&&tier.xpNeeded>0&&(
          <div style={{marginTop:18}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{color:"rgba(255,255,255,0.35)",fontSize:11}}>{isUnlocked?"Active":"Progress"}</span>
              <span style={{color:tier.color,fontSize:11,fontWeight:700}}>{myCrew.xp.toLocaleString()} / {tier.xpNeeded.toLocaleString()} XP</span>
            </div>
            <div style={{height:4,background:"rgba(255,255,255,0.08)",borderRadius:2}}>
              <div style={{height:"100%",width:`${prog*100}%`,background:tier.color,borderRadius:2}}/>
            </div>
          </div>
        )}
      </div>
      <div style={S.scroll}>
        {isUnlocked?(
          <div style={{margin:"16px 16px 0",background:"#f0fff4",borderRadius:14,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,border:"1px solid #86efac"}}>
            <div style={{width:34,height:34,borderRadius:"50%",background:"#22c55e18",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <Ic.Check c="#22c55e" s={16}/>
            </div>
            <div>
              <div style={{fontWeight:700,fontSize:14,color:"#16a34a"}}>Active for your crew</div>
              <div style={{fontSize:12,color:"#6b7280",marginTop:1}}>{tier.label} benefits apply to all members</div>
            </div>
          </div>
        ):(
          <div style={{margin:"16px 16px 0",background:"#fafafa",borderRadius:14,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,border:"1px solid #e5e7eb"}}>
            <div style={{width:34,height:34,borderRadius:"50%",background:tier.color+"12",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <Ic.Lightning c={tier.color} s={16}/>
            </div>
            <div>
              <div style={{fontWeight:700,fontSize:14,color:DARK}}>{myCrew?`${Math.max(0,tier.xpNeeded-myCrew.xp).toLocaleString()} XP away`:"Join a crew to track progress"}</div>
              <div style={{fontSize:12,color:"#888",marginTop:1}}>Keep booking and competing together</div>
            </div>
          </div>
        )}
        <div style={{padding:"20px 16px 8px"}}>
          <div style={{color:"#aaa",fontSize:10,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",marginBottom:12}}>{tier.perks.length} Benefits Unlocked</div>
          {tier.perks.map((perk,i)=>(
            <div key={i} style={{marginBottom:8,background:"#fafafa",borderRadius:14,padding:"16px",border:`1px solid ${isUnlocked?tier.color+"35":"#eeeeee"}`}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                <AbbrBadge abbr={perk.abbr} color={isUnlocked?tier.color:"#333"}/>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:15,color:DARK,marginBottom:5}}>{perk.title}</div>
                  <div style={{fontSize:13,color:"#444",lineHeight:1.65}}>{perk.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{margin:"0 16px 16px",background:"#fff",borderRadius:14,padding:"16px",border:"1px solid #e5e7eb"}}>
          <div style={{color:"#666",fontSize:10,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",marginBottom:8}}>How to reach this tier</div>
          <div style={{fontSize:13,color:"#222",lineHeight:1.7}}>{tier.howToEarn}</div>
        </div>
        <div style={{padding:"0 16px 8px"}}>
          <div style={{color:"#aaa",fontSize:10,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",marginBottom:12}}>All Tiers</div>
          <div style={{display:"flex",gap:8,overflowX:"auto",scrollbarWidth:"none",paddingBottom:4}}>
            {TIERS.map(t=>{
              const isActive=selTier===t.lv;
              const isOwned=myCrew&&myCrew.level>=t.lv;
              return (
                <button key={t.lv} onClick={()=>setSelTier(t.lv)}
                  style={{flexShrink:0,padding:"10px 14px",borderRadius:14,border:`1.5px solid ${isActive?t.color:"#e5e7eb"}`,background:isActive?t.color+"14":"#f9fafb",cursor:"pointer",textAlign:"center",minWidth:64}}>
                  <div style={{fontSize:9,fontWeight:900,color:isActive?t.color:"#888",marginBottom:3,letterSpacing:"0.3px"}}>LV{t.lv}</div>
                  <div style={{fontSize:10,fontWeight:700,color:isActive?DARK:"#333",whiteSpace:"nowrap"}}>{t.label}</div>
                  {isOwned&&<div style={{width:6,height:6,borderRadius:"50%",background:"#22c55e",margin:"4px auto 0"}}/>}
                </button>
              );
            })}
          </div>
        </div>
        {!myCrew&&(
          <div style={{margin:"8px 16px 16px"}}>
            <button onClick={()=>{setModal({type:"crew",res:{}});setScreen("crews");}}
              style={{width:"100%",padding:"15px 0",background:PINK,borderRadius:14,border:"none",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer"}}>
              Join a Crew to Start Earning
            </button>
          </div>
        )}
        <div style={{height:28}}/>
      </div>
      {modal?.type==="crew"&&<CrewSheet res={modal.res} crews={crews.filter(c=>!region||c.region===region)} crewName={crewName} setCrewName={setCrewName} joinCrew={joinCrew} createCrew={createCrew} onDismiss={()=>{setModal(null);setScreen("crews");}} PINK={PINK} DARK={DARK} S={S} myCrew={myCrew} leaveCrew={leaveCrew} canJoinCrew={canJoinCrew}/>}
      <NavBar/>
      </div>
    </div>
  );
}
