-- ============================================================
-- THE AI EDGE — Supabase Setup
-- Run this once in: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Create the leads table
create table if not exists leads (
  id          uuid        default gen_random_uuid() primary key,
  created_at  timestamptz default now(),
  name        text        not null,
  email       text        not null,
  phone       text,
  role        text,
  company     text,
  challenge   text
);

-- 2. Enable Row Level Security
alter table leads enable row level security;

-- 3. Allow anyone (no login required) to INSERT a lead
create policy "Public can insert leads"
  on leads
  for insert
  to anon
  with check (true);

-- 4. (Optional) Only authenticated users can read leads
-- Uncomment when you add an admin dashboard later:
-- create policy "Authenticated users can read leads"
--   on leads
--   for select
--   to authenticated
--   using (true);
