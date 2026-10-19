import React from "react";

export default function TutorialScene({ scene, tick }) {
  const PINK = "#FF0080";
  const F = "'Plus Jakarta Sans', -apple-system, Helvetica Neue, Arial, sans-serif";
  const pulse = Math.sin(tick * 0.09) * 0.5 + 0.5;
  const svgProps = { viewBox: "0 0 390 340", preserveAspectRatio: "xMidYMid meet", style: { width: "100%", height: "100%", display: "block" } };

  // ── INTRO: Spacious layout, no overflow, wow animations ─────────────────
  if (scene === "intro") {
    const logoOp = Math.min(1, tick / 12);
    const ringPulse = 0.5 + 0.5 * Math.sin(tick * 0.06);
    const cardOp = Math.min(1, (tick - 16) / 8);
    const cx = 195, cy = 78;
    const sparks = Array.from({length: 8}).map((_,i)=>({
      x: 118 + i*22,
      y: 50 + ((i%2)*14),
      r: i%3===0 ? 2.8 : 2.1
    }));
    return (
      <svg {...svgProps}>
        <rect width="390" height="340" fill="#fafafa"/>
        <defs>
          <linearGradient id="introRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={PINK}/>
            <stop offset="100%" stopColor="#ff4da6"/>
          </linearGradient>
        </defs>
        <circle cx={cx} cy={cy} r={52 + ringPulse * 6} fill="none" stroke="url(#introRing)" strokeWidth="1.5" opacity={0.12 + ringPulse * 0.08}/>
        <circle cx={cx} cy={cy} r={38 + ringPulse * 4} fill="none" stroke="url(#introRing)" strokeWidth="1" opacity={0.2 + ringPulse * 0.1}/>
        <circle cx={cx} cy={cy} r={26 + ringPulse * 2} fill="none" stroke="url(#introRing)" strokeWidth="0.7" opacity={0.28 + ringPulse * 0.08}/>
        {sparks.map((s,i)=>(
          <circle key={i} cx={s.x + Math.sin((tick+i*4)*0.07)*3} cy={s.y + Math.cos((tick+i*3)*0.06)*4} r={s.r} fill={PINK} opacity={0.08 + (Math.sin((tick+i*2)*0.08)*0.5+0.5)*0.22}/>
        ))}
        <rect x={cx-25} y={cy-25} width="50" height="50" rx="14" fill={PINK+"20"} stroke={PINK} strokeWidth="1.5" opacity={logoOp}/>
        <text x={cx} y={cy+10} textAnchor="middle" fill={PINK} fontSize="20" fontWeight="800" fontFamily={F}>XP</text>
        <text x="195" y="148" textAnchor="middle" fill="#111" fontSize="21" fontWeight="800" fontFamily={F} letterSpacing="-0.5">CrewPass</text>
        <text x="195" y="170" textAnchor="middle" fill="#666" fontSize="11" fontFamily={F}>Crews · XP · Rewards</text>
        <g opacity={cardOp}>
          <rect x="28" y="194" width="334" height="72" rx="16" fill="#fff" stroke="#eee" strokeWidth="1"/>
          <text x="195" y="228" textAnchor="middle" fill="#555" fontSize="11" fontWeight="600" fontFamily={F}>Join a crew → Book a pod →</text>
          <text x="195" y="246" textAnchor="middle" fill="#555" fontSize="11" fontWeight="600" fontFamily={F}>Earn XP → Unlock rewards</text>
        </g>
      </svg>
    );
  }

  // ── LEADERBOARD: White mode, compact for iPad (slide 1) ──────────────────
  if (scene === "leaderboard") {
    const crewsData = [
      {n:"East Side", xp:4200, lv:6, color:PINK,      you:true},
      {n:"Williamsburg",xp:3800,lv:5, color:"#7C3AED"},
      {n:"Bull City",  xp:3200, lv:5, color:"#1D4ED8"},
      {n:"Queens",     xp:2600, lv:4, color:"#10B981"},
    ];
    const rankColors = ["#C9A227","#9BA4B5","#CD7F32"];
    const maxXP = 4200;
    return (
      <svg {...svgProps}>
        <rect width="390" height="340" fill="#fafafa"/>
        <rect x="0" y="0" width="390" height="48" fill="#fff"/>
        <rect x="0" y="48" width="390" height="1" fill="#eee"/>
        <text x="20" y="30" fill="#111" fontSize="15" fontWeight="800" fontFamily={F} letterSpacing="-0.3">CrewPass</text>
        {["Top XP","Streak","Active"].map((t,i)=>(
          <g key={i}>
            <text x={65+i*120} y="70" textAnchor="middle"
              fill={i===0?PINK:"#999"} fontSize="11" fontWeight={i===0?700:500} fontFamily={F}>{t}</text>
            {i===0&&<rect x="42" y="78" width="46" height="2" rx="1" fill={PINK}/>}
          </g>
        ))}
        {crewsData.map((c,i)=>{
          const y = 92 + i*56;
          const op = Math.min(1, Math.max(0, (tick - i*8)/12));
          const xpW = (c.xp/maxXP)*180;
          return (
            <g key={i} opacity={op}>
              <rect x="14" y={y} width="362" height="48" rx="12" fill="#fff" stroke="#f0f0f0" strokeWidth="0.5"/>
              <rect x="24" y={y+11} width="24" height="24" rx="7"
                fill={rankColors[i]||"#f0f0f0"} opacity={(i<3)?0.18:0}/>
              <text x="36" y={y+27} textAnchor="middle"
                fill={rankColors[i]||"#ccc"} fontSize="10" fontWeight="900" fontFamily={F}>{i+1}</text>
              <rect x="56" y={y+9} width="26" height="26" rx="7" fill={c.color+"16"}/>
              <text x="69" y={y+21} textAnchor="middle" fill={c.color} fontSize="6" fontWeight="900" fontFamily={F}>LV</text>
              <text x="69" y={y+32} textAnchor="middle" fill={c.color} fontSize="11" fontWeight="900" fontFamily={F}>{c.lv}</text>
              <text x="92" y={y+24} fill="#111" fontSize="12" fontWeight="700" fontFamily={F}>{c.n}</text>
              {c.you&&<rect x="218" y={y+13} width="26" height="14" rx="7" fill={PINK}/>}
              {c.you&&<text x="231" y={y+23} textAnchor="middle" fill="#fff" fontSize="7" fontWeight="800" fontFamily={F}>YOU</text>}
              <rect x="92" y={y+33} width="180" height="2.5" rx="1.25" fill="#f0f0f0"/>
              <rect x="92" y={y+33} width={xpW} height="2.5" rx="1.25" fill={c.color}/>
              <text x="352" y={y+26} textAnchor="end" fill={c.color} fontSize="10" fontWeight="800" fontFamily={F}>{c.xp.toLocaleString()}</text>
            </g>
          );
        })}
      </svg>
    );
  }

  // ── JOIN: No overflow, LV and Create fully inside, polished animations (slide 3) ─
  if (scene === "join") {
    const joinOp   = Math.min(1, tick / 10);
    const divOp    = Math.min(1, Math.max(0, (tick-12)/8));
    const createOp = Math.min(1, Math.max(0, (tick-22)/10));
    const highlightPulse = 0.85 + 0.15 * Math.sin(tick * 0.08);
    const rowSlide = Math.min(1, (tick - 4) / 6);
    return (
      <svg {...svgProps}>
        <defs>
          <linearGradient id="joinBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff"/>
            <stop offset="100%" stopColor="#faf7ff"/>
          </linearGradient>
        </defs>
        <rect width="390" height="340" fill="url(#joinBg)"/>
        <rect x="158" y="14" width="74" height="18" rx="9" fill={PINK+"12"} stroke={PINK+"30"} strokeWidth="0.8"/>
        <text x="195" y="26" textAnchor="middle" fill={PINK} fontSize="9" fontWeight="800" fontFamily={F} letterSpacing="1.1">CREW FLOW</text>
        <text x="195" y="46" textAnchor="middle" fill="#777" fontSize="11" fontWeight="600" fontFamily={F}>Join or create in seconds</text>
        <g opacity={joinOp}>
          <rect x="20" y="54" width="350" height="122" rx="16" fill="#fff" stroke="#eee" strokeWidth="1"/>
          <text x="36" y="72" fill="#999" fontSize="9" fontWeight="700" fontFamily={F} letterSpacing="1.2">JOIN EXISTING</text>
          <rect x="28" y="90" width="334" height="48" rx="12" fill={PINK+"10"} stroke={PINK} strokeWidth="1" opacity={highlightPulse}/>
          <rect x="42" y="96" width="30" height="30" rx="8" fill={PINK+"25"} stroke={PINK+"60"} strokeWidth="0.6"/>
          <text x="57" y="109" textAnchor="middle" fill={PINK} fontSize="7" fontWeight="900" fontFamily={F}>LV</text>
          <text x="57" y="122" textAnchor="middle" fill={PINK} fontSize="12" fontWeight="900" fontFamily={F}>6</text>
          <text x="82" y="115" fill="#111" fontSize="12.5" fontWeight="800" fontFamily={F}>East Side Syndicate</text>
          <rect x="298" y="100" width="52" height="24" rx="12" fill={PINK}/>
          <text x="324" y="116" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="800" fontFamily={F}>Join</text>
          <text x="82" y="154" fill="#b6b6c4" fontSize="11" fontFamily={F}>Williamsburg Spinners · LV5</text>
          <text x="354" y="154" textAnchor="end" fill="#c7c7d1" fontSize="10" fontFamily={F}>Join</text>
        </g>
        <g opacity={divOp}>
          <line x1="20" y1="190" x2="178" y2="190" stroke="#eee" strokeWidth="1"/>
          <rect x="179" y="177" width="32" height="18" rx="9" fill="#f0f0f0"/>
          <text x="195" y="189" textAnchor="middle" fill="#999" fontSize="9" fontWeight="700" fontFamily={F}>OR</text>
          <line x1="211" y1="190" x2="370" y2="190" stroke="#eee" strokeWidth="1"/>
        </g>
        <g opacity={createOp}>
          <rect x="20" y="208" width="350" height="84" rx="16" fill="#fff" stroke="#eee" strokeWidth="1"/>
          <text x="36" y="232" fill="#999" fontSize="9" fontWeight="700" fontFamily={F} letterSpacing="1.2">CREATE NEW</text>
          <rect x="28" y="244" width="334" height="36" rx="11" fill="#fafafa" stroke="#e8e8e8" strokeWidth="1"/>
          <text x="46" y="266" fill="#111" fontSize="13" fontWeight="700" fontFamily={F}>Smash Bros</text>
          <rect x="302" y="249" width="56" height="24" rx="12" fill={PINK}/>
          <text x="330" y="265" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="800" fontFamily={F}>Create</text>
        </g>
      </svg>
    );
  }

  // ── XP: White mode, booking rows ──────────────────────────────────────
  if (scene === "xp") {
    const events = [
      {label:"Private Pod · West 99th · Fri 8 PM",    xp:80,  color:PINK,      delay:0},
      {label:"Crew Night · Lower East Side · Sat 7 PM",xp:120, color:"#7C3AED", delay:16},
      {label:"Monday League · West 99th",              xp:60,  color:"#10B981", delay:30},
    ];
    let totalXP = 0;
    events.forEach(e=>{if(tick>e.delay+4) totalXP+=e.xp;});
    totalXP = Math.min(totalXP, 260);
    const barW = Math.min(310,(totalXP/260)*310);
    const flare = 0.4 + 0.6 * Math.sin(tick * 0.11);
    return (
      <svg {...svgProps}>
        <defs>
          <linearGradient id="xpbar3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={PINK}/>
            <stop offset="100%" stopColor="#7C3AED"/>
          </linearGradient>
        </defs>
        <rect width="390" height="340" fill="#fafafa"/>
        <circle cx="195" cy="70" r={54 + flare*5} fill={PINK+"0d"} opacity={0.45}/>
        <text x="195" y="58" textAnchor="middle" fill={PINK} fontSize="48" fontWeight="900" fontFamily={F} opacity={Math.min(1,tick/6)}>+{totalXP}</text>
        <text x="195" y="78" textAnchor="middle" fill="#888" fontSize="11" fontWeight="700" fontFamily={F} opacity={Math.min(1,tick/6)} letterSpacing="2">CREW XP</text>
        <rect x="40" y="92" width="310" height="5" rx="2.5" fill="#eee"/>
        <rect x="40" y="92" width={barW} height="5" rx="2.5" fill="url(#xpbar3)"/>
        <circle cx={40+barW} cy="94.5" r="3.6" fill={PINK} opacity={0.85}/>
        {events.map((ev,i)=>{
          const y = 118 + i*66;
          const op = Math.min(1,Math.max(0,(tick-ev.delay)/10));
          const isActive = tick > ev.delay && tick < ev.delay+18;
          return (
            <g key={i} opacity={op}>
              <rect x="14" y={y} width="362" height="52" rx="13" fill={isActive?ev.color+"12":"#fff"} stroke={isActive?ev.color:"#eee"} strokeWidth="1"/>
              <rect x="24" y={y+12} width="5" height="28" rx="2.5" fill={ev.color}/>
              <text x="38" y={y+22} fill="#555" fontSize="11" fontWeight="500" fontFamily={F}>{ev.label}</text>
              <text x="362" y={y+31} textAnchor="end" fill={ev.color} fontSize="15" fontWeight="800" fontFamily={F}>+{ev.xp} XP</text>
            </g>
          );
        })}
      </svg>
    );
  }

  // ── TIERS: White mode, clean tier cards ───────────────────────────────
  if (scene === "tiers") {
    const tiers = [
      {lv:"1",  label:"Rookie",      color:"#8B8FA8", perk:"XP Tracking + Profile",     xp:"0"},
      {lv:"3",  label:"Rising Crew", color:"#10B981", perk:"Invite-Only Events",         xp:"2,000"},
      {lv:"5",  label:"Core Crew",   color:"#0EA5E9", perk:"15% Off Crew Bookings",      xp:"5,000"},
      {lv:"7",  label:"Elite Crew",  color:"#7C3AED", perk:"4 Free Hours / Month",       xp:"10,000"},
      {lv:"10", label:"Legend",      color:PINK,      perk:"Custom Paddles + All Access",xp:"20,000"},
    ];
    const activeIdx = Math.floor(tick/20) % tiers.length;
    const pathProg = Math.min(1, (tick%22)/22);
    return (
      <svg {...svgProps}>
        <rect width="390" height="340" fill="#fafafa"/>
        <text x="195" y="26" textAnchor="middle" fill="#999" fontSize="10" fontWeight="700" fontFamily={F} letterSpacing="1.5">REWARD TIERS</text>
        <path d="M30 52 C 120 42, 190 92, 360 66" stroke={PINK+"25"} strokeWidth="2" fill="none" strokeDasharray="4 6"/>
        <circle cx={30 + pathProg*330} cy={52 + Math.sin(pathProg*Math.PI)*5} r="4" fill={PINK} opacity="0.75"/>
        {tiers.map((t,i)=>{
          const y = 36 + i*58;
          const op = Math.min(1,Math.max(0,(tick-i*6)/8));
          const isActive = activeIdx===i;
          return (
            <g key={i} opacity={op}>
              <rect x="14" y={y} width="362" height="48" rx="12" fill={isActive?t.color+"12":"#fff"} stroke={isActive?t.color:"#eee"} strokeWidth="1"/>
              <rect x="24" y={y+8} width="32" height="32" rx="9" fill={t.color+"18"} stroke={t.color+"40"} strokeWidth="0.8"/>
              <text x="40" y={y+21} textAnchor="middle" fill={t.color} fontSize="7" fontWeight="900" fontFamily={F}>LV</text>
              <text x="40" y={y+33} textAnchor="middle" fill={t.color} fontSize="12" fontWeight="900" fontFamily={F}>{t.lv}</text>
              <text x="66" y={y+22} fill={isActive?"#111":"#555"} fontSize="13" fontWeight="700" fontFamily={F}>{t.label}</text>
              <text x="66" y={y+37} fill={isActive?t.color:"#888"} fontSize="10" fontFamily={F}>{t.perk}</text>
              <text x="370" y={y+28} textAnchor="end" fill={isActive?t.color:"#999"} fontSize="10" fontWeight="600" fontFamily={F}>{t.xp} XP</text>
              {isActive&&<rect x="16" y={y+2} width="4" height="44" rx="2" fill={t.color}/>}
            </g>
          );
        })}
      </svg>
    );
  }

  // ── CHALLENGE: White mode, compact for iPad (slide 6) ────────────────────
  if (scene === "challenge") {
    const vsOp     = Math.min(1, tick/10);
    const detailOp = Math.min(1, Math.max(0,(tick-16)/10));
    const resultOp = Math.min(1, Math.max(0,(tick-32)/10));
    return (
      <svg {...svgProps}>
        <rect width="390" height="340" fill="#fafafa"/>
        <path d="M20 84 L370 84" stroke="#eee" strokeWidth="1"/>
        <g opacity={vsOp}>
          <circle cx="195" cy="72" r={22+pulse*3} fill="none" stroke={PINK+"30"} strokeWidth="1.2"/>
          <circle cx="195" cy="72" r="18" fill={PINK+"15"} stroke={PINK+"50"} strokeWidth="0.8"/>
          <text x="195" y="77" textAnchor="middle" fill="#333" fontSize="14" fontWeight="900" fontFamily={F}>⚔️</text>
        </g>
        <g opacity={vsOp}>
          <line x1="182" y1="132" x2="208" y2="132" stroke={PINK+"60"} strokeWidth="1.4" strokeDasharray="3 3"/>
        </g>
        <g opacity={vsOp}>
          <rect x="14" y="108" width="168" height="52" rx="12" fill={PINK+"12"} stroke={PINK+"40"} strokeWidth="0.8"/>
          <text x="98" y="128" textAnchor="middle" fill="#111" fontSize="12" fontWeight="800" fontFamily={F}>East Side</text>
          <text x="98" y="142" textAnchor="middle" fill={PINK} fontSize="10" fontWeight="700" fontFamily={F}>Syndicate</text>
          <text x="98" y="152" textAnchor="middle" fill="#888" fontSize="8" fontFamily={F}>LV6 · YOU</text>
        </g>
        <g opacity={vsOp}>
          <rect x="208" y="108" width="168" height="52" rx="12" fill="#7C3AED12" stroke="#7C3AED50" strokeWidth="0.8"/>
          <text x="292" y="128" textAnchor="middle" fill="#111" fontSize="12" fontWeight="800" fontFamily={F}>Williamsburg</text>
          <text x="292" y="142" textAnchor="middle" fill="#7C3AED" fontSize="10" fontWeight="700" fontFamily={F}>Spinners</text>
          <text x="292" y="152" textAnchor="middle" fill="#888" fontSize="8" fontFamily={F}>LV5 · 3W streak</text>
        </g>
        <g opacity={detailOp}>
          <rect x="24" y="172" width="342" height="36" rx="10" fill="#fff" stroke="#eee" strokeWidth="0.8"/>
          <text x="195" y="188" textAnchor="middle" fill="#888" fontSize="9" fontFamily={F}>🏆 Winner gets</text>
          <text x="195" y="202" textAnchor="middle" fill={PINK} fontSize="12" fontWeight="800" fontFamily={F}>+500 Crew XP + Streak</text>
        </g>
        <g opacity={detailOp}>
          <rect x="58" y="218" width="274" height="38" rx="19" fill={PINK}/>
          <text x="195" y="242" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="800" fontFamily={F}>Challenge ⚔️</text>
        </g>
        <g opacity={resultOp}>
          <rect x="70" y="268" width="250" height="24" rx="12" fill="#10B98118" stroke="#10B98150" strokeWidth="0.8"/>
          <text x="195" y="284" textAnchor="middle" fill="#10B981" fontSize="11" fontWeight="700" fontFamily={F}>🎉 Win tonight — earn 500 XP</text>
        </g>
      </svg>
    );
  }

  return null;
}
