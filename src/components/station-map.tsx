import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import type { Facility, Station } from "@/lib/stations";
import { facilityColor } from "@/components/facility-meta";

// Fix default icon (we use CircleMarker so this isn't strictly needed, but safe)
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], 17);
    } else {
      map.fitBounds(L.latLngBounds(points), { padding: [40, 40] });
    }
  }, [map, points]);
  return null;
}

type Props = {
  station: Station;
  facilities: Facility[];
  highlightId?: string | null;
};

export default function StationMap({ station, facilities, highlightId }: Props) {
  const target = highlightId ? facilities.find((f) => f.id === highlightId) : null;
  const points: [number, number][] = target
    ? [[station.lat, station.lng], [target.lat, target.lng]]
    : [[station.lat, station.lng], ...facilities.map((f) => [f.lat, f.lng] as [number, number])];

  return (
    <MapContainer
      center={[station.lat, station.lng]}
      zoom={17}
      scrollWheelZoom
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds points={points} />

      {/* Station marker */}
      <CircleMarker
        center={[station.lat, station.lng]}
        radius={10}
        pathOptions={{ color: "var(--deep)", fillColor: "var(--deep)", fillOpacity: 0.9, weight: 2 }}
      >
        <Popup>
          <div className="space-y-0.5">
            <div className="font-semibold">{station.name}</div>
            <div className="text-xs opacity-70">{station.code} · {station.city}</div>
          </div>
        </Popup>
      </CircleMarker>

      {/* Facility markers */}
      {facilities.map((f) => {
        const isTarget = target?.id === f.id;
        const dim = target && !isTarget;
        return (
          <CircleMarker
            key={f.id}
            center={[f.lat, f.lng]}
            radius={isTarget ? 12 : 9}
            pathOptions={{
              color: facilityColor[f.type],
              fillColor: facilityColor[f.type],
              fillOpacity: dim ? 0.25 : 0.85,
              weight: isTarget ? 3 : 2,
            }}
          >
            <Popup>
              <div className="space-y-1">
                <div className="font-semibold">{f.name}</div>
                <div className="text-xs uppercase tracking-wide opacity-60">{f.type}</div>
                <div className="text-sm">
                  <strong>{f.available_units}</strong> / {f.total_capacity} available
                </div>
                <div className="text-xs">₹{Number(f.price).toFixed(0)} · {f.distance_m} m away</div>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}

      {/* Navigation line */}
      {target && (
        <Polyline
          positions={[[station.lat, station.lng], [target.lat, target.lng]]}
          pathOptions={{ color: "var(--lounge)", weight: 4, dashArray: "8 6" }}
        />
      )}
    </MapContainer>
  );
}
