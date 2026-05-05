
CREATE TABLE public.stations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL UNIQUE,
  city text NOT NULL,
  lat double precision NOT NULL,
  lng double precision NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.facilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  station_id uuid NOT NULL REFERENCES public.stations(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('Lounge','Locker','Washroom','Seating')),
  name text NOT NULL,
  total_capacity integer NOT NULL CHECK (total_capacity > 0),
  available_units integer NOT NULL CHECK (available_units >= 0),
  price numeric NOT NULL DEFAULT 0,
  distance_m integer NOT NULL DEFAULT 0,
  lat double precision NOT NULL,
  lng double precision NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON public.facilities(station_id);

CREATE TABLE public.app_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.app_users(id) ON DELETE SET NULL,
  message text NOT NULL,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Public read for stations & facilities
CREATE POLICY "stations read" ON public.stations FOR SELECT USING (true);
CREATE POLICY "facilities read" ON public.facilities FOR SELECT USING (true);
CREATE POLICY "facilities update anon" ON public.facilities FOR UPDATE USING (true) WITH CHECK (true);

-- app_users: anyone can insert/select by email (custom non-auth login per spec)
CREATE POLICY "app_users insert" ON public.app_users FOR INSERT WITH CHECK (true);
CREATE POLICY "app_users select" ON public.app_users FOR SELECT USING (true);

-- feedback: anyone can insert
CREATE POLICY "feedback insert" ON public.feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "feedback select" ON public.feedback FOR SELECT USING (true);
