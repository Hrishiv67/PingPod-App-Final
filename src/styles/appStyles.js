import { BLUE, DARK, PINK } from "../theme";

export const IPAD_PLANE = 1024;

// Shared inline-style tokens. Layout values depend on whether we render the iPad layout.
export const createStyles = (isIpadLayout) => ({
  root:    {fontFamily:"'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif",maxWidth:"100%",margin:0,width:"100%",minHeight:"100dvh",height:"100dvh",display:"flex",flexDirection:"column",background:isIpadLayout?"#f3f3f3":"#fafafa",position:"relative",overflow:"hidden",boxSizing:"border-box"},
  contentMax: {maxWidth:isIpadLayout?IPAD_PLANE:768,marginLeft:"auto",marginRight:"auto",width:"100%",flex:1,display:"flex",flexDirection:"column",minWidth:0,background:"#fff",boxShadow:isIpadLayout?"0 12px 40px rgba(0,0,0,0.10)":"none"},
  scroll:  {flex:1,overflowY:"auto",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain"},
  topBar:  {padding:isIpadLayout?"56px 24px 0":"52px 16px 0",background:"#fff",flexShrink:0,borderBottom:"none"},
  navWrap: {display:"flex",borderTop:"1px solid #e6e6e6",background:"#fff",flexShrink:0,paddingBottom:"calc(6px + env(safe-area-inset-bottom))",paddingTop:4,minHeight:64,width:"100%"},
  navBtn:  (a)=>({flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",paddingTop:7,paddingBottom:6,cursor:"pointer",color:a?PINK:"#333",fontSize:10.5,fontWeight:500,gap:4,border:"none",background:"none",lineHeight:1,whiteSpace:"nowrap"}),
  navLine: {display:"none"},
  chip:    (a)=>({padding:"7px 16px",borderRadius:20,background:a?PINK:"#fff",color:a?"#fff":DARK,border:`1.5px solid ${a?PINK:"#ddd"}`,fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",lineHeight:1}),
  badge:   {padding:"3px 9px",borderRadius:4,background:"#f2f2f2",color:"#555",fontSize:11,fontWeight:700,border:"1px solid #e0e0e0",letterSpacing:"0.3px"},
  secHd:   {fontSize:18,fontWeight:700,color:DARK,padding:"16px 16px 8px"},
  blueBar: {display:"flex",background:BLUE,marginLeft:-16,marginRight:-16,padding:"0 12px",overflowX:"auto",scrollbarWidth:"none"},
  blueTab: (a)=>({padding:"9px 14px",background:"none",border:"none",color:a?"#fff":"rgba(255,255,255,.65)",fontSize:14,fontWeight:a?700:500,cursor:"pointer",borderBottom:a?"2.5px solid #fff":"2.5px solid transparent",whiteSpace:"nowrap",flexShrink:0}),
  input:   {width:"100%",padding:"13px 16px",border:"1.5px solid #eee",borderRadius:12,fontSize:15,fontWeight:500,outline:"none",boxSizing:"border-box",fontFamily:"inherit"},
});
