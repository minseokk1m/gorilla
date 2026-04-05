-- ══════════════════════════════════════════════════════════
-- Gorilla Game: Discussion Board & Signal Override Tables
-- ══════════════════════════════════════════════════════════

-- Members (lightweight profile for the 6-7 team members)
create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  email text unique,
  role text not null default 'member' check (role in ('admin', 'member')),
  created_at timestamptz not null default now()
);

-- Signal Overrides (externalized classification signals per firm)
create table if not exists signal_overrides (
  id uuid primary key default gen_random_uuid(),
  firm_id text not null unique,
  estimated_niche_market_share numeric,
  net_revenue_retention numeric,
  ecosystem_partner_count integer,
  is_defacto_standard boolean,
  competitor_count integer,
  has_proprietary_protocol boolean,
  updated_by uuid references members(id),
  updated_at timestamptz not null default now()
);

-- Signal Proposals (proposed change to a specific signal field)
create table if not exists signal_proposals (
  id uuid primary key default gen_random_uuid(),
  firm_id text not null,
  signal_field text not null,
  current_value text,
  proposed_value text not null,
  rationale text,
  proposed_by uuid references members(id),
  status text not null default 'open' check (status in ('open', 'accepted', 'rejected')),
  resolved_by uuid references members(id),
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

-- Discussions (comments on a firm, optionally linked to a proposal)
create table if not exists discussions (
  id uuid primary key default gen_random_uuid(),
  firm_id text not null,
  proposal_id uuid references signal_proposals(id) on delete set null,
  author_id uuid references members(id),
  author_name text not null default 'Anonymous',
  body text not null,
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_signal_overrides_firm on signal_overrides(firm_id);
create index if not exists idx_signal_proposals_firm on signal_proposals(firm_id);
create index if not exists idx_signal_proposals_status on signal_proposals(status);
create index if not exists idx_discussions_firm on discussions(firm_id);
create index if not exists idx_discussions_proposal on discussions(proposal_id);

-- Row Level Security: allow all operations for now (small trusted team)
alter table members enable row level security;
alter table signal_overrides enable row level security;
alter table signal_proposals enable row level security;
alter table discussions enable row level security;

-- Policies: allow public read/write (for the 6-7 member team, no auth yet)
create policy "Allow all on members" on members for all using (true) with check (true);
create policy "Allow all on signal_overrides" on signal_overrides for all using (true) with check (true);
create policy "Allow all on signal_proposals" on signal_proposals for all using (true) with check (true);
create policy "Allow all on discussions" on discussions for all using (true) with check (true);

-- Seed a default admin member
insert into members (display_name, role) values ('Admin', 'admin')
on conflict do nothing;
