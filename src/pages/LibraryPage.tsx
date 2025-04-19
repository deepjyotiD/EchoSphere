import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookMarked, Clock, PlayCircle } from 'lucide-react';

interface Episode {
  id: string;
  title: string;
  duration: string;
  progress: number;
  imageUrl: string;
  lastPlayed: string;
}

const continueListening: Episode[] = [
  {
    id: '1',
    title: 'The Science of Sleep',
    duration: '45:30',
    progress: 65,
    imageUrl: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660',
    lastPlayed: '2 hours ago',
  },
  {
    id: '2',
    title: 'Future of Work',
    duration: '38:15',
    progress: 30,
    imageUrl: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc',
    lastPlayed: 'Yesterday',
  },
];

const savedEpisodes: Episode[] = [
  {
    id: '3',
    title: 'Mindfulness Meditation',
    duration: '32:45',
    progress: 0,
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
    lastPlayed: 'Not started',
  },
  {
    id: '4',
    title: 'Cryptocurrency Explained',
    duration: '41:20',
    progress: 0,
    imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d',
    lastPlayed: 'Not started',
  },
  {
    id: '5',
    title: 'Urban Agriculture',
    duration: '35:10',
    progress: 0,
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8',
    lastPlayed: 'Not started',
  },
];

export function LibraryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Library</h1>
      </div>

      <Tabs defaultValue="continue" className="space-y-6">
        <TabsList>
          <TabsTrigger value="continue" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Continue Listening
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <BookMarked className="h-4 w-4" />
            Saved Episodes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="continue" className="space-y-6">
          {continueListening.map((episode) => (
            <Card key={episode.id}>
              <div className="flex md:items-center flex-col md:flex-row gap-4 p-4">
                <div className="w-full md:w-48 h-48">
                  <img
                    src={episode.imageUrl}
                    alt={episode.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">{episode.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {episode.duration} • Last played {episode.lastPlayed}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{Math.round(episode.progress)}% completed</span>
                      <span>{episode.duration}</span>
                    </div>
                    <Progress value={episode.progress} className="h-2" />
                  </div>
                  <Button className="flex items-center gap-2">
                    <PlayCircle className="h-5 w-5" />
                    Resume Episode
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="saved" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedEpisodes.map((episode) => (
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
                      <CardDescription>{episode.duration}</CardDescription>
                    </div>
                    <Button size="icon" variant="ghost" className="rounded-full">
                      <PlayCircle className="h-6 w-6" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Start Listening
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}