import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle, Star, Timer, TrendingUp } from 'lucide-react';

interface Episode {
  id: string;
  title: string;
  duration: string;
  summary: string;
  imageUrl: string;
}

const topPicks: Episode[] = [
  {
    id: '1',
    title: 'The Future of AI',
    duration: '45:30',
    summary: 'Exploring the latest developments in artificial intelligence and its impact on society.',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
  },
  {
    id: '2',
    title: 'Space Exploration 2025',
    duration: '32:15',
    summary: 'What lies ahead for human space exploration in the coming years.',
    imageUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2',
  },
  {
    id: '3',
    title: 'Climate Solutions',
    duration: '38:45',
    summary: 'Innovative approaches to addressing climate change and environmental challenges.',
    imageUrl: 'https://images.unsplash.com/photo-1440342359743-84fcb8c21f21',
  },
];

const trendingEpisodes: Episode[] = [
  {
    id: '4',
    title: 'Tech Breakthroughs',
    duration: '41:20',
    summary: 'The most significant technological advances of the year.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
  },
  {
    id: '5',
    title: 'Digital Privacy',
    duration: '35:10',
    summary: 'Understanding and protecting your digital privacy in the modern age.',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3',
  },
];

const interactiveStories: Episode[] = [
  {
    id: '6',
    title: 'Mystery in the Arctic',
    duration: '52:00',
    summary: 'An interactive story where your choices shape the investigation.',
    imageUrl: 'https://images.unsplash.com/photo-1517783999520-f068d7431a60',
  },
  {
    id: '7',
    title: 'Startup Journey',
    duration: '48:30',
    summary: 'Navigate the challenges of building a successful startup.',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd',
  },
];

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative h-[400px] bg-gradient-to-r from-primary/90 to-primary">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome to EchoSphere
            </h1>
            <p className="text-xl text-white/90 mb-6">
              Discover stories that move you. Interactive podcasts that adapt to your choices.
            </p>
            <Button size="lg" variant="secondary">
              Start Listening
            </Button>
          </div>
        </div>
      </section>

      {/* Top Picks */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Star className="h-6 w-6 text-primary" />
            Top Picks for You
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topPicks.map((episode) => (
            <Card key={episode.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={episode.imageUrl}
                  alt={episode.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{episode.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Timer className="h-4 w-4" />
                      {episode.duration}
                    </CardDescription>
                  </div>
                  <Button size="icon" variant="ghost" className="rounded-full">
                    <PlayCircle className="h-6 w-6" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{episode.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Trending Now
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {trendingEpisodes.map((episode) => (
              <Card key={episode.id} className="flex overflow-hidden">
                <div className="w-40 h-40">
                  <img
                    src={episode.imageUrl}
                    alt={episode.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 p-4">
                  <h3 className="text-xl font-semibold mb-2">{episode.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{episode.summary}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm flex items-center gap-1">
                      <Timer className="h-4 w-4" />
                      {episode.duration}
                    </span>
                    <Button size="sm" variant="ghost">
                      <PlayCircle className="h-5 w-5 mr-2" />
                      Play Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Stories */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Interactive Stories</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {interactiveStories.map((episode) => (
            <Card key={episode.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={episode.imageUrl}
                  alt={episode.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Button
                  className="absolute bottom-4 right-4"
                  variant="secondary"
                >
                  Start Story
                </Button>
              </div>
              <CardHeader>
                <CardTitle>{episode.title}</CardTitle>
                <CardDescription>{episode.duration}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{episode.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}