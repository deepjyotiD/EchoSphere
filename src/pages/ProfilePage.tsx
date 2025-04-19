import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Clock, LogOut, MessageSquare, Settings, Timer } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Comment {
  id: string;
  episodeTitle: string;
  content: string;
  timestamp: string;
  date: string;
}

const recentComments: Comment[] = [
  {
    id: '1',
    episodeTitle: 'The Future of AI',
    content: 'Really interesting perspective on machine learning!',
    timestamp: '15:30',
    date: '2 days ago',
  },
  {
    id: '2',
    episodeTitle: 'Space Exploration 2025',
    content: 'The part about Mars colonization was fascinating.',
    timestamp: '23:45',
    date: '4 days ago',
  },
];

export function ProfilePage() {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Jane Doe</h1>
            <p className="text-muted-foreground">jane@example.com</p>
          </div>
        </div>

        {/* Listening Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Time Listened
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127 hours</div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Episodes Completed
              </CardTitle>
              <Timer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">
                12 this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Top Genre
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Technology</div>
              <p className="text-xs text-muted-foreground">
                15 episodes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Comments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Comments</CardTitle>
            <CardDescription>Your latest episode comments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentComments.map((comment) => (
                <div key={comment.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{comment.episodeTitle}</h4>
                    <span className="text-sm text-muted-foreground">
                      {comment.date}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "{comment.content}"
                  </p>
                  <div className="text-xs text-muted-foreground">
                    at {comment.timestamp}
                  </div>
                  <Separator className="my-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
              </div>
              <Settings className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input id="name" defaultValue="Jane Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="jane@example.com" />
            </div>
            <div className="flex justify-between">
              <Button variant="outline">Update Profile</Button>
              <Button 
                variant="destructive" 
                className="flex items-center gap-2"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}