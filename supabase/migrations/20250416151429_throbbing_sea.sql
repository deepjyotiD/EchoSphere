/*
  # User Management and Saved Podcasts Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - Maps to auth.users.id
      - `email` (text, unique) - User's email address
      - `display_name` (text) - User's display name
      - `avatar_url` (text) - URL to user's avatar image
      - `created_at` (timestamptz) - Account creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

    - `saved_podcasts`
      - `id` (uuid, primary key)
      - `user_id` (uuid) - References users.id
      - `episode_id` (uuid) - References episodes.id
      - `created_at` (timestamptz) - When the podcast was saved
      - `notes` (text) - Optional user notes about the episode

  2. Security
    - Enable RLS on both tables
    - Add policies for user data access
    - Add policies for saved podcasts management

  3. Changes
    - Add foreign key constraints
    - Add indexes for performance
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  display_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create saved_podcasts table
CREATE TABLE IF NOT EXISTS saved_podcasts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  episode_id uuid REFERENCES episodes(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  notes text,
  UNIQUE(user_id, episode_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_podcasts ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_saved_podcasts_user_id ON saved_podcasts(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_podcasts_episode_id ON saved_podcasts(episode_id);

-- Users policies
CREATE POLICY "Users can read own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Saved podcasts policies
CREATE POLICY "Users can view their saved podcasts"
  ON saved_podcasts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save podcasts"
  ON saved_podcasts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their saved podcast notes"
  ON saved_podcasts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove saved podcasts"
  ON saved_podcasts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to handle user creation after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile after signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();