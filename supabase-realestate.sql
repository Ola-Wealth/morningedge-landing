-- ============================================================
-- THE AI EDGE — Real Estate Edition: Supabase Setup
-- Run this once in: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Create the real-estate leads table
create table if not exists leads_realestate (
  id           uuid        default gen_random_uuid() primary key,
  created_at   timestamptz default now(),
  name         text        not null,
  email        text        not null,
  phone        text,
  role         text,
  company      text,
  challenge    text,
  inquiry_type text        default 'individual',
  team_size    text
);

-- 2. Enable Row Level Security
alter table leads_realestate enable row level security;

-- 3. Allow anyone (no login required) to INSERT a lead
create policy "Public can insert realestate leads"
  on leads_realestate
  for insert
  to anon
  with check (true);

-- 4. (Optional) Only authenticated users can read leads
-- Uncomment when you add an admin dashboard later:
-- create policy "Authenticated users can read realestate leads"
--   on leads_realestate
--   for select
--   to authenticated
--   using (true);

-- ============================================================
-- GOOGLE SHEETS SETUP REMINDER
-- In the Google Sheet (ID: 1iRrJzDangjtuV4m6vKl_ikpT8dimdZaIWZ78fFxmbvQ),
-- add a new tab named exactly: RealEstate
-- Column headers (A–I): Timestamp | Name | Email | Phone | Role | Company | Challenge | Inquiry Type | Team Size
-- ============================================================
