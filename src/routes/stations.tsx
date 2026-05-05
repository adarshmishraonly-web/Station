import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Input } from "@/components/ui/input";
import { listStations, type Station } from "@/lib/stations";

export const Route = createFileRoute("/stations")({
  head: () => ({
    meta: [
      { title: "Stations — StationSense" },
      { name: "description", content: "Browse Indian railway stations and check live facility availability." },
    ],
  }),
  loader: () => listStations(),
  component: StationsPage,
  errorComponent: ({ error }) => (
    <div className="p-8 text-center text-sm text-destructive">{error.message}</div>
  ),
});

function StationsPage() {
  const { stations } = Route.useLoaderData();
  const [q, setQ] = useState("");
  const filtered = (stations as Station[]).filter((s) =>
    `${s.name} ${s.code} ${s.city}`.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Stations</h1>
          <p className="mt-2 text-muted-foreground">Pick a station to see facilities, availability and the map.</p>
        </div>

        <div className="mb-6 flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm">
          <Search className="ml-2 h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by station name, code or city"
            className="border-0 bg-transparent shadow-none focus-visible:ring-0"
          />
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {filtered.map((s: Station) => (
            <li key={s.id}>
              <Link
                to="/station/$id"
                params={{ id: s.id }}
                className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div>
                  <div className="text-lg font-semibold">{s.name}</div>
                  <div className="text-sm text-muted-foreground">{s.code} · {s.city}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="col-span-full rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              No stations match "{q}".
            </li>
          )}
        </ul>
      </main>
    </div>
  );
}
