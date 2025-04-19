import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { FastForward, Pause, Play, Rewind } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string;
  onTimeUpdate?: (time: number) => void;
}

export function AudioPlayer({ audioUrl, onTimeUpdate }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

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
      onTimeUpdate?.(audioRef.current.currentTime);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-card p-4 rounded-lg shadow-sm">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
      />
      
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={() => seek(currentTime - 10)}>
          <Rewind className="h-5 w-5" />
        </Button>
        
        <Button size="icon" onClick={togglePlay}>
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
        
        <Button variant="ghost" size="icon" onClick={() => seek(currentTime + 10)}>
          <FastForward className="h-5 w-5" />
        </Button>
        
        <div className="flex-1 mx-4">
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={(value) => seek(value[0])}
          />
        </div>
        
        <span className="text-sm text-muted-foreground">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}