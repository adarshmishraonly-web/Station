import { useEffect, useState } from "react";
import { getSession, type Session } from "@/lib/session";

export function useSession() {
  const [session, setState] = useState<Session | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(getSession());
    setHydrated(true);
    const handler = () => setState(getSession());
    window.addEventListener("stationsense-session", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("stationsense-session", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return { session, hydrated };
}
