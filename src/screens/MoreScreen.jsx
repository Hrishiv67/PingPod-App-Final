import React from "react";
import { Ic } from "../components/icons";
import NavBar from "../components/layout/NavBar";
import Toast from "../components/layout/Toast";
import { useApp } from "../context/AppContext";
import { DARK } from "../theme";

export default function MoreScreen() {
  const { S, showToast } = useApp();
  const moreItems=[
    {label:"Account",icon:<svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>},
    {label:"Shop",icon:<svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>},
    {label:"Redeem Gift Card",icon:<svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8V21"/><path d="M3 12h18"/><path d="M12 8c-2-3-6-3-6 0s4 0 6 0c2-3 6-3 6 0s-4 0-6 0"/></svg>},
    {label:"Membership Info",icon:<svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="14" y2="12"/><line x1="7" y1="16" x2="11" y2="16"/></svg>},
    {label:"Favorite Replays",icon:<svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="14" rx="2"/><polygon points="10 8 10 14 15 11" fill="#333" stroke="none"/><line x1="2" y1="20" x2="22" y2="20"/></svg>},
    {label:"Play Passes",icon:<svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H4v4a2 2 0 0 1 0 4v4h16v-4a2 2 0 0 1 0-4z"/><line x1="12" y1="8" x2="12" y2="12" strokeDasharray="2 2"/><line x1="12" y1="16" x2="12" y2="20" strokeDasharray="2 2"/></svg>},
    {label:"Help Center",icon:<svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>},
  ];
  return (
    <div style={S.root}>
      <Toast/>
      <div style={{...S.contentMax,flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
        <div style={{background:"linear-gradient(180deg,#1a0dab 0%,#1400a0 100%)",padding:"48px 20px 20px",flexShrink:0}}>
          <div style={{display:"flex",justifyContent:"flex-end",marginBottom:6}}>
            <span style={{color:"rgba(255,255,255,0.8)",fontSize:12,fontWeight:500,cursor:"pointer"}}>Log out</span>
          </div>
          <div style={{textAlign:"center",marginBottom:6}}>
            <div style={{fontSize:21,fontWeight:800,color:"#fff",letterSpacing:"-0.3px"}}>You</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.6)",marginTop:3}}>PingPod dollars: $0 · 5 Replay Credits</div>
          </div>
          <div style={{display:"flex",marginTop:12}}>
            <div style={{flex:1,textAlign:"center",borderRight:"1px solid rgba(255,255,255,0.15)",padding:"4px 0"}}>
              <div style={{fontSize:15,fontWeight:700,color:"#fff"}}>Member</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.45)",marginTop:2}}>Membership</div>
            </div>
            <div style={{flex:1,textAlign:"center",padding:"4px 0"}}>
              <div style={{fontSize:15,fontWeight:700,color:"#fff"}}>Jan 2026</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.45)",marginTop:2}}>Joined</div>
            </div>
          </div>
        </div>
        <div style={S.scroll}>
          {moreItems.map((item,i)=>(
            <div key={item.label}>
              <div onClick={()=>showToast(item.label)}
                style={{display:"flex",alignItems:"center",padding:"14px 18px",cursor:"pointer",gap:14}}>
                <div style={{width:22,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,opacity:0.7}}>{item.icon}</div>
                <div style={{flex:1,fontSize:15,color:DARK,fontWeight:400}}>{item.label}</div>
                <Ic.ChevR c="#d4d4d4" s={14}/>
              </div>
              {i<moreItems.length-1&&<div style={{height:1,background:"#f5f5f5",margin:"0 18px 0 54px"}}/>}
            </div>
          ))}
          <div style={{padding:"24px 16px 14px",display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
            <div style={{display:"flex",gap:18}}>
              {[
                <svg key="fb" width={24} height={24} viewBox="0 0 24 24" fill="#999"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
                <svg key="ig" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
                <svg key="yt" width={24} height={24} viewBox="0 0 24 24" fill="#999"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.6C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98" fill="#fff"/></svg>,
              ].map(icon=>icon)}
            </div>
            <div style={{fontSize:10,color:"#bbb",letterSpacing:"0.5px"}}>POWERED BY <span style={{fontWeight:700,letterSpacing:"0.3px"}}>PodPlay</span></div>
          </div>
          <div style={{height:10}}/>
        </div>
        <NavBar/>
      </div>
    </div>
  );
}
