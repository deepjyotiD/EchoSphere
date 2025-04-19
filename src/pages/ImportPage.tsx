import { ImportPodcast } from '@/components/ImportPodcast';

export function ImportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Import Podcast</h1>
      </div>
      <ImportPodcast />
    </div>
  );
}