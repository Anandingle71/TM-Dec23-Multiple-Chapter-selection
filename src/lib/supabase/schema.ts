import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

export type ContentType = 'lesson-plan' | 'quiz' | 'worksheet' | 'presentation' | 'assessment';

export interface Content {
  id: string;
  user_id: string;
  type: ContentType;
  subject: string;
  grade: string;
  chapter: string;
  content: string;
  created_at: string;
}

// Create tables in Supabase:
/*
create table public.content (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  type text not null,
  subject text not null,
  grade text not null,
  chapter text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.content enable row level security;

-- Create policy to allow users to read their own content
create policy "Users can read own content"
  on public.content for select
  using (auth.uid() = user_id);

-- Create policy to allow users to insert their own content
create policy "Users can insert own content"
  on public.content for insert
  with check (auth.uid() = user_id);
*/

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);