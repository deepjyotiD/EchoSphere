import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Plus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Auth } from '@/components/Auth';
import { HomePage } from '@/pages/HomePage';
import { LibraryPage } from '@/pages/LibraryPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ImportPage } from '@/pages/ImportPage';
import { EpisodePage } from '@/pages/EpisodePage';

function App() {
  const [session, setSession] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Auth onAuthSuccess={() => {}} />
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'library':
        return <LibraryPage />;
      case 'profile':
        return <ProfilePage />;
      case 'import':
        return <ImportPage />;
      case 'episode':
        return <EpisodePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">EchoSphere</h1>
          </div>
          <nav className="flex gap-6 items-center">
            <Button
              variant="link"
              className={currentPage === 'home' ? 'text-foreground' : 'text-foreground/80 hover:text-foreground'}
              onClick={() => setCurrentPage('home')}
            >
              Home
            </Button>
            <Button
              variant="link"
              className={currentPage === 'library' ? 'text-foreground' : 'text-foreground/80 hover:text-foreground'}
              onClick={() => setCurrentPage('library')}
            >
              Library
            </Button>
            <Button
              variant="link"
              className={currentPage === 'profile' ? 'text-foreground' : 'text-foreground/80 hover:text-foreground'}
              onClick={() => setCurrentPage('profile')}
            >
              Profile
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setCurrentPage('import')}
            >
              <Plus className="h-4 w-4" />
              Import Podcast
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;