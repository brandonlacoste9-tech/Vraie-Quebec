-- Migration: Create AI generations table
-- Stores user-generated images from Nano Banana Pro

create table if not exists public.ai_generations (
  id                uuid primary key default gen_random_uuid(),
  
  -- User identification (nullable for guest users)
  user_id           text,
  user_email        text,
  
  -- Generation details
  prompt            text not null,
  image_url         text not null, -- Data URL or Supabase Storage URL
  mode              text not null check (mode in ('text-to-image', 'image-editing')),
  aspect_ratio      text,
  
  -- Optional metadata
  description       text, -- AI-generated description if available
  strength          numeric, -- For image-editing mode (0.0-1.0)
  
  -- Audit
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- Indexes for performance
create index ai_generations_user_email_idx on public.ai_generations(user_email);
create index ai_generations_user_id_idx on public.ai_generations(user_id);
create index ai_generations_created_at_idx on public.ai_generations(created_at desc);
create index ai_generations_mode_idx on public.ai_generations(mode);

-- Enable RLS
alter table public.ai_generations enable row level security;

-- Users can read their own generations
create policy "Read own ai generations"
on public.ai_generations
for select
using (
  auth.uid() is null 
  or user_id = auth.uid()::text
  or user_email = auth.jwt()->>'email'
);

-- Anyone can create generations (including guests)
create policy "Create ai generations"
on public.ai_generations
for insert
with check (true);

-- Users can update their own generations
create policy "Update own ai generations"
on public.ai_generations
for update
using (
  auth.uid() is null 
  or user_id = auth.uid()::text
  or user_email = auth.jwt()->>'email'
);

-- Users can delete their own generations
create policy "Delete own ai generations"
on public.ai_generations
for delete
using (
  auth.uid() is null 
  or user_id = auth.uid()::text
  or user_email = auth.jwt()->>'email'
);

-- Trigger for updated_at
create trigger set_ai_generations_updated_at
before update on public.ai_generations
for each row execute function public.handle_updated_at();

-- If handle_updated_at function doesn't exist, create it
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

