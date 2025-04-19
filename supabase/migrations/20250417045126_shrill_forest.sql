/*
  # Add Podcasts and Episodes Tables

  1. New Tables
    - `podcasts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `feed_url` (text)
      - `user_id` (uuid, foreign key)
      - `created_at` (timestamptz)
    
    - `podcast_episodes`
      - `id` (uuid, primary key)
      - `podcast_id` (uuid, foreign key)
      - `title` (text)
      - `description` (text)
      - `audio_url` (text)
      - `publish_date` (timestamptz)
      - `duration` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create podcasts table
CREATE TABLE IF NOT EXISTS podcasts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  feed_url text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(feed_url, user_id)
);

-- Create podcast_episodes table
CREATE TABLE IF NOT EXISTS podcast_episodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  podcast_id uuid REFERENCES podcasts(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  audio_url text NOT NULL,
  publish_date timestamptz,
  duration text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE podcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcast_episodes ENABLE ROW LEVEL SECURITY;

-- Podcasts policies
CREATE POLICY "Users can view their podcasts"
  ON podcasts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add podcasts"
  ON podcasts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Episodes policies
CREATE POLICY "Users can view podcast episodes"
  ON podcast_episodes
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM podcasts
      WHERE podcasts.id = podcast_episodes.podcast_id
      AND podcasts.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can add podcast episodes"
  ON podcast_episodes
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM podcasts
      WHERE podcasts.id = podcast_episodes.podcast_id
      AND podcasts.user_id = auth.uid()
    )
  );