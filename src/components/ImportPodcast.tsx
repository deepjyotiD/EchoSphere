import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface PodcastData {
  title: string;
  description: string;
  episodes: {
    title: string;
    description: string;
    audioUrl: string;
    publishDate: string;
    duration?: string;
  }[];
}

interface ImportError {
  message: string;
}

export function ImportPodcast() {
  const [feedUrl, setFeedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [podcastData, setPodcastData] = useState<PodcastData | null>(null);
  const { toast } = useToast();

  const fetchAndParseFeed = async (url: string) => {
    try {
      const response = await fetch(url);
      const text = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'text/xml');

      const channel = xml.querySelector('channel');
      if (!channel) throw new Error('Invalid RSS feed');

      const title = channel.querySelector('title')?.textContent || '';
      const description = channel.querySelector('description')?.textContent || '';

      const episodes = Array.from(xml.querySelectorAll('item')).map(item => ({
        title: item.querySelector('title')?.textContent || '',
        description: item.querySelector('description')?.textContent || '',
        audioUrl: item.querySelector('enclosure')?.getAttribute('url') || '',
        publishDate: item.querySelector('pubDate')?.textContent || '',
        duration: item.querySelector('duration')?.textContent || item.querySelector('itunes\\:duration')?.textContent || undefined
      }));

      return { title, description, episodes };
    } catch (error) {
      console.error('Error parsing feed:', error);
      throw new Error('Failed to parse RSS feed');
    }
  };

  const savePodcastToDatabase = async (data: PodcastData) => {
    try {
      // Insert podcast
      const { data: podcastData, error: podcastError } = await supabase
        .from('podcasts')
        .insert({
          title: data.title,
          description: data.description,
          feed_url: feedUrl,
        })
        .select()
        .single();

      if (podcastError) throw podcastError;

      // Insert episodes
      const episodes = data.episodes.map(episode => ({
        podcast_id: podcastData.id,
        title: episode.title,
        description: episode.description,
        audio_url: episode.audioUrl,
        publish_date: new Date(episode.publishDate),
        duration: episode.duration,
      }));

      const { error: episodesError } = await supabase
        .from('podcast_episodes')
        .insert(episodes);

      if (episodesError) throw episodesError;

      toast({
        title: 'Success!',
        description: 'Podcast imported successfully',
      });
    } catch (error) {
      console.error('Error saving podcast:', error);
      throw new Error('Failed to save podcast');
    }
  };

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedUrl.trim()) return;

    try {
      setLoading(true);
      const data = await fetchAndParseFeed(feedUrl);
      setPodcastData(data);
      await savePodcastToDatabase(data);
    } catch (error) {
      const importError = error as ImportError;
      toast({
        title: 'Error',
        description: importError.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Import Podcast</CardTitle>
          <CardDescription>
            Enter a podcast RSS feed URL to import episodes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleImport} className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="https://feeds.simplecast.com/54nAGcIl"
                value={feedUrl}
                onChange={(e) => setFeedUrl(e.target.value)}
                required
              />
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Fetch Podcast
              </Button>
            </div>
          </form>

          {podcastData && (
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-lg font-semibold">{podcastData.title}</h3>
                <p className="text-muted-foreground mt-1">{podcastData.description}</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Episodes</h4>
                {podcastData.episodes.map((episode, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-base">{episode.title}</CardTitle>
                      {episode.duration && (
                        <CardDescription>Duration: {episode.duration}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{episode.description}</p>
                      <audio src={episode.audioUrl} controls className="w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}