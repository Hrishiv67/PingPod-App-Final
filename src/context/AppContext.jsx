import { createContext, useContext } from "react";

// App-wide state and actions, provided by <PingPodApp /> in App.jsx.
export const AppContext = createContext(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp() must be used inside <AppContext.Provider>");
  return ctx;
}
