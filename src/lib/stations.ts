export type FacilityType = "Lounge" | "Locker" | "Washroom" | "Seating";

export type Facility = {
  id: string;
  station_id: string;
  type: FacilityType;
  name: string;
  total_capacity: number;
  available_units: number;
  price: number;
  distance_m: number;
  lat: number;
  lng: number;
  updated_at: string;
};

export type Station = {
  id: string;
  name: string;
  code: string;
  city: string;
  lat: number;
  lng: number;
};

export type CrowdLevel = "Low" | "Medium" | "High";

export type RegisteredUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

type RegisterInput = Omit<RegisteredUser, "id">;
type FeedbackInput = {
  message: string;
  rating: number;
  userId?: string | null;
};

const USERS_KEY = "stationsense.mock-users";
const FEEDBACK_KEY = "stationsense.mock-feedback";
const now = new Date("2026-05-06T00:00:00.000Z").toISOString();

const stations: Station[] = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    name: "New Delhi Railway Station",
    code: "NDLS",
    city: "New Delhi",
    lat: 28.6429,
    lng: 77.2195,
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    name: "Chhatrapati Shivaji Maharaj Terminus",
    code: "CSMT",
    city: "Mumbai",
    lat: 18.9402,
    lng: 72.8356,
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    name: "Howrah Junction",
    code: "HWH",
    city: "Kolkata",
    lat: 22.5839,
    lng: 88.3422,
  },
  {
    id: "44444444-4444-4444-8444-444444444444",
    name: "Chennai Central",
    code: "MAS",
    city: "Chennai",
    lat: 13.0827,
    lng: 80.2755,
  },
];

const facilities: Facility[] = [
  {
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1",
    station_id: "11111111-1111-4111-8111-111111111111",
    type: "Lounge",
    name: "Executive Lounge - Platform 16",
    total_capacity: 40,
    available_units: 12,
    price: 220,
    distance_m: 120,
    lat: 28.6434,
    lng: 77.2201,
    updated_at: now,
  },
  {
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2",
    station_id: "11111111-1111-4111-8111-111111111111",
    type: "Locker",
    name: "Cloak Room - Ajmeri Gate",
    total_capacity: 32,
    available_units: 9,
    price: 30,
    distance_m: 85,
    lat: 28.6424,
    lng: 77.2188,
    updated_at: now,
  },
  {
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3",
    station_id: "11111111-1111-4111-8111-111111111111",
    type: "Washroom",
    name: "Paid Washroom - Main Concourse",
    total_capacity: 18,
    available_units: 6,
    price: 10,
    distance_m: 60,
    lat: 28.6431,
    lng: 77.2191,
    updated_at: now,
  },
  {
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa4",
    station_id: "11111111-1111-4111-8111-111111111111",
    type: "Seating",
    name: "Waiting Hall - Platform 1",
    total_capacity: 120,
    available_units: 44,
    price: 0,
    distance_m: 140,
    lat: 28.6421,
    lng: 77.2203,
    updated_at: now,
  },
  {
    id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb1",
    station_id: "22222222-2222-4222-8222-222222222222",
    type: "Lounge",
    name: "Heritage Lounge - Main Hall",
    total_capacity: 30,
    available_units: 11,
    price: 180,
    distance_m: 90,
    lat: 18.9406,
    lng: 72.8361,
    updated_at: now,
  },
  {
    id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb2",
    station_id: "22222222-2222-4222-8222-222222222222",
    type: "Locker",
    name: "Parcel Cloak Room",
    total_capacity: 24,
    available_units: 5,
    price: 25,
    distance_m: 110,
    lat: 18.9398,
    lng: 72.8351,
    updated_at: now,
  },
  {
    id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb3",
    station_id: "22222222-2222-4222-8222-222222222222",
    type: "Washroom",
    name: "Washroom - Suburban Side",
    total_capacity: 20,
    available_units: 8,
    price: 10,
    distance_m: 70,
    lat: 18.9401,
    lng: 72.8363,
    updated_at: now,
  },
  {
    id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb4",
    station_id: "22222222-2222-4222-8222-222222222222",
    type: "Seating",
    name: "General Waiting Area",
    total_capacity: 95,
    available_units: 35,
    price: 0,
    distance_m: 130,
    lat: 18.9395,
    lng: 72.8358,
    updated_at: now,
  },
  {
    id: "cccccccc-cccc-4ccc-8ccc-ccccccccccc1",
    station_id: "33333333-3333-4333-8333-333333333333",
    type: "Lounge",
    name: "Retiring Room Lounge",
    total_capacity: 36,
    available_units: 7,
    price: 200,
    distance_m: 150,
    lat: 22.5842,
    lng: 88.3417,
    updated_at: now,
  },
  {
    id: "cccccccc-cccc-4ccc-8ccc-ccccccccccc2",
    station_id: "33333333-3333-4333-8333-333333333333",
    type: "Locker",
    name: "Cloak Room - Old Complex",
    total_capacity: 40,
    available_units: 13,
    price: 35,
    distance_m: 95,
    lat: 22.5835,
    lng: 88.3428,
    updated_at: now,
  },
  {
    id: "cccccccc-cccc-4ccc-8ccc-ccccccccccc3",
    station_id: "33333333-3333-4333-8333-333333333333",
    type: "Washroom",
    name: "Washroom - Platform 8",
    total_capacity: 22,
    available_units: 4,
    price: 10,
    distance_m: 65,
    lat: 22.5841,
    lng: 88.3425,
    updated_at: now,
  },
  {
    id: "cccccccc-cccc-4ccc-8ccc-ccccccccccc4",
    station_id: "33333333-3333-4333-8333-333333333333",
    type: "Seating",
    name: "AC Waiting Hall",
    total_capacity: 110,
    available_units: 22,
    price: 0,
    distance_m: 115,
    lat: 22.5837,
    lng: 88.3418,
    updated_at: now,
  },
  {
    id: "dddddddd-dddd-4ddd-8ddd-ddddddddddd1",
    station_id: "44444444-4444-4444-8444-444444444444",
    type: "Lounge",
    name: "Premium Lounge - Concourse",
    total_capacity: 28,
    available_units: 14,
    price: 190,
    distance_m: 80,
    lat: 13.0831,
    lng: 80.2759,
    updated_at: now,
  },
  {
    id: "dddddddd-dddd-4ddd-8ddd-ddddddddddd2",
    station_id: "44444444-4444-4444-8444-444444444444",
    type: "Locker",
    name: "Digital Locker Bay",
    total_capacity: 30,
    available_units: 18,
    price: 30,
    distance_m: 100,
    lat: 13.0824,
    lng: 80.2751,
    updated_at: now,
  },
  {
    id: "dddddddd-dddd-4ddd-8ddd-ddddddddddd3",
    station_id: "44444444-4444-4444-8444-444444444444",
    type: "Washroom",
    name: "Washroom - Platform 5",
    total_capacity: 18,
    available_units: 10,
    price: 10,
    distance_m: 55,
    lat: 13.0829,
    lng: 80.2749,
    updated_at: now,
  },
  {
    id: "dddddddd-dddd-4ddd-8ddd-ddddddddddd4",
    station_id: "44444444-4444-4444-8444-444444444444",
    type: "Seating",
    name: "Family Waiting Area",
    total_capacity: 85,
    available_units: 41,
    price: 0,
    distance_m: 125,
    lat: 13.0822,
    lng: 80.276,
    updated_at: now,
  },
];

function computeCrowd(stationFacilities: Facility[]): CrowdLevel {
  const total = stationFacilities.reduce((sum, facility) => sum + facility.total_capacity, 0);
  const available = stationFacilities.reduce((sum, facility) => sum + facility.available_units, 0);

  if (total === 0) return "Low";

  const usage = 1 - available / total;
  if (usage > 0.7) return "High";
  if (usage >= 0.4) return "Medium";
  return "Low";
}

function withClientAvailability(stationFacilities: Facility[]) {
  const minute = Math.floor(Date.now() / 60_000);

  return stationFacilities.map((facility, index) => {
    const delta = ((minute + index) % 5) - 2;
    const available_units = Math.min(
      facility.total_capacity,
      Math.max(0, facility.available_units + delta),
    );

    return {
      ...facility,
      available_units,
      updated_at: new Date().toISOString(),
    };
  });
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

function createLocalId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export async function listStations() {
  return {
    stations: [...stations].sort((a, b) => a.name.localeCompare(b.name)),
  };
}

export async function getStationDetail(id: string) {
  const station = stations.find((candidate) => candidate.id === id) ?? null;

  if (!station) {
    return {
      station: null,
      facilities: [] as Facility[],
      crowd: "Low" as CrowdLevel,
    };
  }

  const stationFacilities = withClientAvailability(
    facilities
      .filter((facility) => facility.station_id === id)
      .sort((a, b) => a.type.localeCompare(b.type)),
  );

  return {
    station,
    facilities: stationFacilities,
    crowd: computeCrowd(stationFacilities),
  };
}

export async function registerUser(input: RegisterInput) {
  const users = readJson<RegisteredUser[]>(USERS_KEY, []);
  const existing = users.find((user) => user.email === input.email);
  const user = existing ? { ...existing, ...input } : { id: createLocalId(), ...input };
  const nextUsers = existing
    ? users.map((candidate) => (candidate.id === existing.id ? user : candidate))
    : [...users, user];

  writeJson(USERS_KEY, nextUsers);

  return { user };
}

export async function submitFeedback(input: FeedbackInput) {
  const feedback = readJson<Array<FeedbackInput & { id: string; created_at: string }>>(
    FEEDBACK_KEY,
    [],
  );

  writeJson(FEEDBACK_KEY, [
    ...feedback,
    {
      ...input,
      id: createLocalId(),
      created_at: new Date().toISOString(),
    },
  ]);

  return { ok: true };
}
