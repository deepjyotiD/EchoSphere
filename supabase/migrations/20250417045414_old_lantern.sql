/*
  # Update Podcast RLS Policies

  1. Changes
    - Drop existing policies before recreating them
    - Add missing policies for podcast management
    - Ensure consistent policy naming

  2. Security
    - Maintain existing security model
    - Ensure proper user access control
*/

-- Drop existing policies if they exist
DO $$ BEGIN
  -- Podcasts policies
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'podcasts' 
    AND policyname = 'Users can add podcasts'
  ) THEN
    DROP POLICY "Users can add podcasts" ON podcasts;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'podcasts' 
    AND policyname = 'Users can view their podcasts'
  ) THEN
    DROP POLICY "Users can view their podcasts" ON podcasts;
  END IF;

  -- Podcast episodes policies
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'podcast_episodes' 
    AND policyname = 'Users can add podcast episodes'
  ) THEN
    DROP POLICY "Users can add podcast episodes" ON podcast_episodes;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'podcast_episodes' 
    AND policyname = 'Users can view podcast episodes'
  ) THEN
    DROP POLICY "Users can view podcast episodes" ON podcast_episodes;
  END IF;
END $$;

-- Recreate policies with consistent naming
CREATE POLICY "Users can add podcasts"
  ON podcasts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their podcasts"
  ON podcasts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add podcast episodes"
  ON podcast_episodes
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1
    FROM podcasts
    WHERE podcasts.id = podcast_episodes.podcast_id
    AND podcasts.user_id = auth.uid()
  ));

CREATE POLICY "Users can view podcast episodes"
  ON podcast_episodes
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1
    FROM podcasts
    WHERE podcasts.id = podcast_episodes.podcast_id
    AND podcasts.user_id = auth.uid()
  ));