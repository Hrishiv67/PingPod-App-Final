// Crew reward tiers unlock at these crew levels.

export const TIER_STEPS = [1,3,5,7,10];

export const tierForCrewLevel = (lvl=1) => TIER_STEPS.filter(t=>lvl>=t).slice(-1)[0] || 1;
