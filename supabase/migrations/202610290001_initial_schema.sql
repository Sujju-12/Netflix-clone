create extension if not exists pgcrypto;
create table if not exists public.titles(id text primary key,title text not null,description text,genre text,release_year integer,rating text,poster_url text,backdrop_url text,featured boolean not null default false,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create table if not exists public.watchlist(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,title_id text not null,created_at timestamptz not null default now(),unique(user_id,title_id));
create index if not exists watchlist_user_id_idx on public.watchlist(user_id);
create index if not exists titles_featured_idx on public.titles(featured desc);
alter table public.titles enable row level security;
alter table public.watchlist enable row level security;
drop policy if exists "Anyone can read titles" on public.titles;
create policy "Anyone can read titles" on public.titles for select using(true);
drop policy if exists "Users can read their own watchlist" on public.watchlist;
create policy "Users can read their own watchlist" on public.watchlist for select to authenticated using(auth.uid()=user_id);
drop policy if exists "Users can add to their own watchlist" on public.watchlist;
create policy "Users can add to their own watchlist" on public.watchlist for insert to authenticated with check(auth.uid()=user_id);
drop policy if exists "Users can remove from their own watchlist" on public.watchlist;
create policy "Users can remove from their own watchlist" on public.watchlist for delete to authenticated using(auth.uid()=user_id);
insert into public.titles(id,title,description,genre,release_year,rating,poster_url,backdrop_url,featured) values
('redline','Redline Protocol','A burned intelligence analyst discovers a signal that could rewrite the balance of power.','Thriller',2025,'16+','https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1800&q=85',true),
('ocean-below','The Ocean Below','A deep-sea research crew finds an impossible structure beneath the Arctic shelf.','Sci-Fi',2024,'13+','https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1800&q=85',false),
('last-signal','The Last Signal','A radio astronomer receives a message that appears to be coming from tomorrow.','Mystery',2025,'13+','https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1800&q=85',false) on conflict(id) do nothing;
