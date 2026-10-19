import React, { useEffect, useState } from "react";
import BootIntroOverlay from "./components/overlays/BootIntroOverlay";
import { INIT_CREWS } from "./data/crews";
import { REG_IMG, THUMB } from "./data/images";
import { LOCS } from "./data/locations";
import BookingScreen from "./screens/BookingScreen";
import CoachingScreen from "./screens/CoachingScreen";
import CrewChallengeScreen from "./screens/CrewChallengeScreen";
import CrewDetailScreen from "./screens/CrewDetailScreen";
import CrewsScreen from "./screens/CrewsScreen";
import LocationsScreen from "./screens/LocationsScreen";
import MoreScreen from "./screens/MoreScreen";
import PopupsScreen from "./screens/PopupsScreen";
import ProgramDetailScreen from "./screens/ProgramDetailScreen";
import ProgramsScreen from "./screens/ProgramsScreen";
import RegionScreen from "./screens/RegionScreen";
import ReservationsScreen from "./screens/ReservationsScreen";
import RewardTierScreen from "./screens/RewardTierScreen";
import { createStyles } from "./styles/appStyles";
import { tierForCrewLevel } from "./utils/crewTiers";
import { getPrice } from "./utils/pricing";
import { AppContext } from "./context/AppContext";

export default function PingPodApp() {
  const [screen,       setScreen]       = useState("region");
  const [region,       setRegion]       = useState(null);
  const [regionTransition, setRegionTransition] = useState(null);
  const [locTab,       setLocTab]       = useState(null);
  const [nav,          setNav]          = useState("book");
  const [selLoc,       setSelLoc]       = useState(null);
  const [selDate,      setSelDate]      = useState("Sun, Apr 26");
  const [selTime,      setSelTime]      = useState(null);
  const [selPod,       setSelPod]       = useState(null);
  const [selDur,       setSelDur]       = useState("1 hr");
  const [selTimes,     setSelTimes]     = useState([]);
  const [groupSize,    setGroupSize]    = useState(2);
  const [applyCrewXp,  setApplyCrewXp]  = useState(false);
  const [bookingFade,  setBookingFade]  = useState(false);
  const [bookingStep,  setBookingStep]  = useState("experience"); // experience -> schedule -> checkout -> booked
  const [appLoading,   setAppLoading]   = useState(null); // { key, label }
  const [reservations, setReservations] = useState([]);
  const [booked,       setBooked]       = useState(false);
  const [progFilter,   setProgFilter]   = useState("All");
  const [resTab,       setResTab]       = useState("upcoming");
  const [toast,        setToast]        = useState(null);
  const [modal,        setModal]        = useState(null);
  const [myCrew,       setMyCrew]       = useState(null);
  const [crews,        setCrews]        = useState(INIT_CREWS);
  const [crewSort,     setCrewSort]     = useState("XP");
  const [crewName,     setCrewName]     = useState("");
  const [showTutorial, setShowTutorial] = useState(false);
  const [crewDetail,   setCrewDetail]   = useState(null);
  const [selTier,      setSelTier]      = useState(3);
  // Coaching sub-screens
  const [coachDetail,  setCoachDetail]  = useState(null); // selected coach obj
  const [coachDate,    setCoachDate]    = useState("Sun, Apr 26");
  const [coachTime,    setCoachTime]    = useState(null);
  const [coachLoc,     setCoachLoc]     = useState(null);
  const [coachDur,     setCoachDur]     = useState("1 hr");
  const [coachBooked,  setCoachBooked]  = useState(false);
  const [selProgram,   setSelProgram]   = useState(null);
  const [selPopup,     setSelPopup]     = useState(null);
  const [selZone,      setSelZone]      = useState(null); // pop-ups: selected zone (category) first
  const [popupHighlight, setPopupHighlight] = useState(0);
  const [pbStep,     setPbStep]     = useState(0);
  const [pbDate,     setPbDate]     = useState(null);
  const [pbTables,   setPbTables]   = useState(1);
  const [pbDuration, setPbDuration] = useState(2);
  const [pbTime,     setPbTime]     = useState(null);
  const [crewJoinAnim, setCrewJoinAnim] = useState(null); // {crew, xp}
  const [challengeAnim, setChallengeAnim] = useState(null); // {myCrew, opponent}
  const [crewsScrolled, setCrewsScrolled] = useState(false);
  const crewsScrollRef = React.useRef(null);
  const [selPopupSlot, setSelPopupSlot] = useState(null);
  const [addXpConfirmCrew, setAddXpConfirmCrew] = useState(null); // after join from post-booking, show Add XP confirm in sheet
  const [popupBookedAnim, setPopupBookedAnim] = useState(null); // pop-up booking confirmation overlay
  const [showGroupSheet, setShowGroupSheet]   = useState(false);
  const [bootIntro, setBootIntro]             = useState(true);
  const showToast = (m) => { setToast(m); setTimeout(()=>setToast(null), 2600); };
  useEffect(()=>{
    if(myCrew?.level) setSelTier(tierForCrewLevel(myCrew.level));
  },[myCrew?.id,myCrew?.level]);

  useEffect(() => {
    // Keep critical Durham assets warm so they stay available even on constrained devices.
    [THUMB.corcoran, REG_IMG["Durham"]].forEach((src) => {
      if (!src) return;
      const img = new Image();
      img.decoding = "async";
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setBootIntro(false), 1300);
    return () => clearTimeout(id);
  }, []);

  const goNav = (k) => {
    if (!region && k !== "book") {
      showToast("Choose a region first");
      setScreen("region");
      setNav("book");
      return;
    }
    if (k === "popups" && region !== "Durham") {
      showToast("Pop-ups are currently available in Durham only");
      return;
    }
    // Flutter loader on nav sections (no navigation delay)
    if (k === "popups") playLoader("Pop-ups", 520, ()=>{});
    else if (k !== "book") playLoader("Loading", 260, ()=>{});
    if(k==="crews") setCrewsScrolled(false);
    setNav(k);
    setCoachDetail(null); setCoachBooked(false); setCrewDetail(null); setSelProgram(null); setSelPopup(null); setSelZone(null); setSelPopupSlot(null); setPopupHighlight(0); setPbStep(0); setPbDate(null); setPbTime(null); setPopupBookedAnim(null);
    if      (k==="book")         setScreen(region?"locations":"region");
    else if (k==="programs")     setScreen("programs");
    else if (k==="reservations") setScreen("reservations");
    else if (k==="coaching")     setScreen("coaching");
    else if (k==="crews")        { setScreen("crews"); }
    else if (k==="popups")       setScreen("popups");
    else if (k==="more")         setScreen("more");
  };

  const pickRegion = (r) => {
    const rd = LOCS[r];
    setRegion(r);
    setLocTab(rd.tabs ? rd.tabs[0] : null);
    setNav("book");
    setRegionTransition(r);
    setTimeout(() => {
      setScreen("locations");
      setRegionTransition(null);
    }, 720);
  };

  const openBooking = (loc) => {
    setSelLoc(loc);
    setSelDate("Sun, Apr 26");
    setSelTime(null);
    setSelPod(null);
    setSelDur("1 hr");
    setBooked(false);
    setApplyCrewXp(false);
    setBookingStep("experience");
    setScreen("booking");
  };
  const confirmBooking = () => {
    const pricing = getPrice(selPod, selTime, selDate, selDur);
    let finalPrice = Math.round(pricing.total * 0.90);
    if (myCrew && myCrew.level >= 5) finalPrice = Math.round(finalPrice * 0.85);
    const res={id:Date.now(),location:selLoc.name,address:selLoc.address,date:selDate,time:selTime,pod:selPod,dur:selDur,img:selLoc.img,price:finalPrice};

    playLoader("Booking", 520, ()=>{
      setReservations(r=>[res,...r]);
      setBooked(true);
      setBookingStep("booked");
      if (myCrew && applyCrewXp) {
        const updated={...myCrew,xp:myCrew.xp+150};
        setMyCrew(updated);
        setCrews(p=>p.map(c=>c.id===myCrew.id?updated:c));
        setSelTier(tierForCrewLevel(updated.level));
        setCrewJoinAnim({crew:updated,xp:150});
      }
    });
  };

  const joinCrew = (crew) => {
    const youPlayer = {name:"You",role:"Beginner",style:"Just starting out",rating:"Unrated"};
    const updatedPlayers = [...(crew.players||[]), youPlayer];
    const u={...crew,members:crew.members+1,xp:crew.xp+150,players:updatedPlayers};
    setMyCrew(u); setCrews(p=>p.map(c=>c.id===crew.id?u:c));
    setSelTier(tierForCrewLevel(u.level));
    setModal(null);
  };

  const joinCrewFromBooking = (crew) => {
    const youPlayer = {name:"You",role:"Beginner",style:"Just starting out",rating:"Unrated"};
    const updatedPlayers = [...(crew.players||[]), youPlayer];
    const u={...crew,members:crew.members+1,xp:crew.xp+150,players:updatedPlayers};
    setMyCrew(u); setCrews(p=>p.map(c=>c.id===crew.id?u:c));
    setSelTier(tierForCrewLevel(u.level));
    setAddXpConfirmCrew(u);
  };

  const createCrew = (forceName) => {
    const name = (forceName || crewName || "").trim();
    if(!name) return;
    const CREW_COLORS = ["#FF0080","#7C3AED","#0EA5E9","#10B981","#F59E0B","#EF4444","#1D4ED8"];
    const crewColor = CREW_COLORS[Math.floor(Math.random()*CREW_COLORS.length)];
    const youPlayer = {name:"You",role:"Captain",style:"Crew founder",rating:"Unrated"};
    const rd = LOCS[region];
    const locName = region && rd ? (rd.default?.[0]?.name || (rd.tabs && rd[rd.tabs[0]]?.[0]?.name) || region) : "Home Base";
    const c={id:Date.now(),name,members:1,xp:150,level:1,streak:0,
      location:locName,region:region||"New York / New Jersey",color:crewColor,
      tag:"New Crew",founded:"2026",
      vibe:`${name} — a new crew just getting started. The grind begins now.`,
      players:[youPlayer],homeTable:"TBD",motto:"Just getting started."};
    setMyCrew(c);
    setCrews(p=>[c,...p]);
    setSelTier(tierForCrewLevel(c.level));
    setModal(null);
    setCrewName("");
    showToast(`${name} created · You're the captain 🎉`);
    setScreen("crews"); setNav("crews");
  };

  const createCrewFromBooking = (forceName) => {
    const name = (forceName || crewName || "").trim();
    if(!name) return;
    const CREW_COLORS = ["#FF0080","#7C3AED","#0EA5E9","#10B981","#F59E0B","#EF4444","#1D4ED8"];
    const crewColor = CREW_COLORS[Math.floor(Math.random()*CREW_COLORS.length)];
    const youPlayer = {name:"You",role:"Captain",style:"Crew founder",rating:"Unrated"};
    const rd = LOCS[region];
    const locName = region && rd ? (rd.default?.[0]?.name || (rd.tabs && rd[rd.tabs[0]]?.[0]?.name) || region) : "Home Base";
    const c={id:Date.now(),name,members:1,xp:150,level:1,streak:0,
      location:locName,region:region||"New York / New Jersey",color:crewColor,
      tag:"New Crew",founded:"2026",
      vibe:`${name} — a new crew just getting started. The grind begins now.`,
      players:[youPlayer],homeTable:"TBD",motto:"Just getting started."};
    setMyCrew(c);
    setCrews(p=>[c,...p]);
    setSelTier(tierForCrewLevel(c.level));
    setCrewName("");
    setAddXpConfirmCrew(c);
    showToast(`${name} created · You're the captain 🎉`);
  };

  const leaveCrew = () => {
    if(!myCrew) return;
    const name = myCrew.name;
    const updatedPlayers = (myCrew.players||[]).filter(p=>p.name!=="You");
    setCrews(p=>p.map(c=>c.id===myCrew.id?{...c,members:Math.max(0,c.members-1),players:updatedPlayers}:c));
    setMyCrew(null);
    showToast(`Left ${name}`);
  };

  // All crews open for demo
  const canJoinCrew = (_crew) => ({ok:true});

  const confirmCoachBooking = () => {
    const res={id:Date.now(),location:coachLoc||coachDetail.locations[0],address:"",date:coachDate,time:coachTime,pod:"COACHING",dur:coachDur,img:null,isCoach:true,coachName:coachDetail.name};
    setReservations(r=>[res,...r]);
    setCoachBooked(true);
    setTimeout(()=>{setCoachDetail(null);setCoachBooked(false);setScreen("reservations");setNav("reservations");},2000);
  };
  const viewportW = typeof window!=="undefined" ? window.innerWidth : 1024;
  const viewportH = typeof window!=="undefined" ? window.innerHeight : 1366;
  const shortestSide = Math.min(viewportW, viewportH);
  const isIpadLayout = shortestSide >= 768;

  const playLoader = (label="Loading", ms=260, thenFn) => {
    const key = Date.now() + Math.random();
    setAppLoading({ key, label });
    thenFn?.();
    setTimeout(() => {
      setAppLoading(cur => (cur?.key===key ? null : cur));
    }, ms);
  };

  const getLocs = () => {
    const rd = region ? LOCS[region] : null;
    if (!rd) return [];
    if (rd.tabs) return rd[locTab] || [];
    return rd.default || [];
  };

  const S = createStyles(isIpadLayout);

  // Everything the screens and shared components read via useApp().
  const ctx = {
    S, addXpConfirmCrew, appLoading, applyCrewXp, booked, bookingStep, canJoinCrew, challengeAnim,
    coachBooked, coachDate, coachDetail, coachDur, coachLoc, coachTime, confirmBooking,
    confirmCoachBooking, createCrew, createCrewFromBooking, crewDetail, crewJoinAnim, crewName,
    crewSort, crews, crewsScrollRef, crewsScrolled, goNav, groupSize, isIpadLayout, joinCrew,
    joinCrewFromBooking, leaveCrew, locTab, modal, myCrew, nav, openBooking, pbDate, pbDuration,
    pbStep, pbTables, pbTime, pickRegion, playLoader, popupBookedAnim, progFilter, region,
    regionTransition, resTab, reservations, selDate, selDur, selLoc, selPod, selPopup, selProgram,
    selTier, selTime, selTimes, selZone, setAddXpConfirmCrew, setApplyCrewXp, setBooked,
    setBookingStep, setChallengeAnim, setCoachBooked, setCoachDate, setCoachDetail, setCoachDur,
    setCoachLoc, setCoachTime, setCrewDetail, setCrewJoinAnim, setCrewName, setCrewSort,
    setCrewsScrolled, setGroupSize, setLocTab, setModal, setNav, setPbDate, setPbDuration,
    setPbStep, setPbTables, setPbTime, setPopupBookedAnim, setProgFilter, setRegion, setResTab,
    setReservations, setScreen, setSelDate, setSelDur, setSelPod, setSelPopup, setSelPopupSlot,
    setSelProgram, setSelTier, setSelTime, setSelTimes, setSelZone, setShowGroupSheet,
    setShowTutorial, showGroupSheet, showToast, showTutorial, toast,
  };

  return (
    <AppContext.Provider value={ctx}>
      {renderScreen()}
    </AppContext.Provider>
  );

  function renderScreen() {
    if (bootIntro) return <BootIntroOverlay />;
    if (screen==="region") return <RegionScreen />;
    if (screen==="locations") return <LocationsScreen />;
    if (screen==="booking") return <BookingScreen />;
    if (screen==="programs") return <ProgramsScreen />;
    if (screen==="reservations") return <ReservationsScreen />;
    if (screen==="coaching") return <CoachingScreen />;
    if (screen==="crewDetail" && crewDetail) return <CrewDetailScreen />;
    if (screen==="rewardTier") return <RewardTierScreen />;
    if (screen==="crews") return <CrewsScreen />;
    if (screen==="crewChallenge") return <CrewChallengeScreen />;
    if (screen==="programDetail" && selProgram) return <ProgramDetailScreen />;
    if (screen==="popups") return <PopupsScreen />;
    if (screen==="more") return <MoreScreen />;
    return null;
  }
}
