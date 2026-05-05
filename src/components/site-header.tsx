import { Link } from "@tanstack/react-router";
import { Train, MapPin, LogOut } from "lucide-react";
import { useSession } from "@/hooks/use-session";
import { clearSession } from "@/lib/session";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const { session, hydrated } = useSession();
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Train className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <div className="text-base font-semibold">StationSense</div>
            <div className="text-[11px] text-muted-foreground">Know your station before you wait</div>
          </div>
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            to="/stations"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            activeProps={{ className: "rounded-lg px-3 py-2 text-sm font-medium text-foreground bg-muted" }}
          >
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />Stations</span>
          </Link>
          <Link
            to="/safety"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            activeProps={{ className: "rounded-lg px-3 py-2 text-sm font-medium text-foreground bg-muted" }}
          >
            Safety
          </Link>
          {hydrated && session ? (
            <div className="ml-2 flex items-center gap-2">
              <div className="hidden text-right sm:block">
                <div className="text-xs font-semibold leading-tight">{session.name}</div>
                <div className="text-[11px] text-muted-foreground leading-tight">{session.email}</div>
              </div>
              <Button variant="ghost" size="icon" onClick={clearSession} aria-label="Sign out">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : hydrated ? (
            <Link to="/login" className="ml-2">
              <Button size="sm">Sign in</Button>
            </Link>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
