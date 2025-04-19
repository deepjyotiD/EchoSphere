import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import {
  FastForward,
  MessageSquare,
  Pause,
  Play,
  Rewind,
  Send,
  Settings,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Comment {
  id: string;
  content: string;
  timestamp: number;
  user: string;
}

interface Slide {
  id: string;
  imageUrl: string;
  timestamp: number;
}

// Dummy data
const slides: Slide[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    timestamp: 0,
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679',
    timestamp: 30,
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e',
    timestamp: 60,
  },
];

const comments: Comment[] = [
  {
    id: '1',
    content: 'This part about quantum computing is fascinating!',
    timestamp: 15,
    user: 'Alice',
  },
  {
    id: '2',
    content: 'Great explanation of neural networks here.',
    timestamp: 45,
    user: 'Bob',
  },
];

export function EpisodePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(slides[0]);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: '1', content: 'Hi! I can help you understand this episode better. What would you like to know?', isAi: true },
  ]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Update current slide based on playback time
    const slide = slides.find((s, index) => {
      const nextSlide = slides[index + 1];
      return (
        s.timestamp <= currentTime &&
        (!nextSlide || nextSlide.timestamp > currentTime)
      );
    });
    if (slide && slide.id !== currentSlide.id) {
      setCurrentSlide(slide);
    }
  }, [currentTime, currentSlide.id]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handlePlaybackRateChange = (value: string) => {
    const rate = parseFloat(value);
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    // Add user message
    setChatMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), content: chatMessage, isAi: false },
    ]);

    // Simulate AI response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: "I'll help you understand that part of the episode. The main concept being discussed here is about advanced AI systems and their potential impact on society. The speaker emphasizes the importance of ethical considerations in AI development.",
          isAi: true,
        },
      ]);
    }, 1000);

    setChatMessage('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Episode Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">The Future of AI and Ethics</h1>
            <p className="text-muted-foreground">
              Episode 42 • March 15, 2025
            </p>
          </div>

          {/* Media Player */}
          <Card>
            <CardContent className="p-6">
              {/* Slides */}
              <motion.div
                className="aspect-video rounded-lg overflow-hidden mb-6"
                layoutId={currentSlide.id}
              >
                <img
                  src={currentSlide.imageUrl}
                  alt="Episode visual"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Audio Controls */}
              <div className="space-y-4">
                <audio
                  ref={audioRef}
                  src="https://example.com/podcast.mp3"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
                />

                {/* Progress Bar */}
                <div className="space-y-2">
                  <Slider
                    value={[currentTime]}
                    max={duration}
                    step={1}
                    onValueChange={(value) => seek(value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => seek(currentTime - 10)}
                    >
                      <Rewind className="h-5 w-5" />
                    </Button>

                    <Button
                      size="icon"
                      className="h-12 w-12"
                      onClick={togglePlay}
                    >
                      {isPlaying ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6" />
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => seek(currentTime + 10)}
                    >
                      <FastForward className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-4">
                    <Select
                      value={playbackRate.toString()}
                      onValueChange={handlePlaybackRateChange}
                    >
                      <SelectTrigger className="w-[110px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.5">0.5x</SelectItem>
                        <SelectItem value="1">1x</SelectItem>
                        <SelectItem value="1.5">1.5x</SelectItem>
                        <SelectItem value="2">2x</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="ghost" size="icon">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Episode Comments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/50"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => seek(comment.timestamp)}
                    >
                      {formatTime(comment.timestamp)}
                    </Button>
                    <div>
                      <p className="font-medium">{comment.user}</p>
                      <p className="text-muted-foreground">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Chatbot */}
        <Card className="h-[calc(100vh-2rem)] flex flex-col">
          <CardHeader>
            <CardTitle>Episode Assistant</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                <AnimatePresence>
                  {chatMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`flex ${
                        message.isAi ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.isAi
                            ? 'bg-muted'
                            : 'bg-primary text-primary-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>

            <form onSubmit={handleChatSubmit} className="mt-4 flex gap-2">
              <Input
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask about the episode..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}