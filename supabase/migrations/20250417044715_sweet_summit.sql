/*
  # Add Sample Podcast Episodes

  1. Changes
    - Insert sample podcast episodes
    - Add realistic data for testing
*/

INSERT INTO episodes (id, title, duration, summary, audio_url, created_at)
VALUES 
  (
    gen_random_uuid(),
    'The Future of AI in 2025',
    '28:45',
    'An in-depth exploration of artificial intelligence advancements and their impact on society. We discuss machine learning breakthroughs, ethical considerations, and future predictions.',
    'https://example.com/podcasts/future-ai-2025.mp3',
    now()
  ),
  (
    gen_random_uuid(),
    'Space Exploration: Mars Colony',
    '35:20',
    'Join us on an exciting journey as we explore the latest developments in Mars colonization efforts. From habitat design to resource utilization, we cover it all.',
    'https://example.com/podcasts/mars-colony.mp3',
    now()
  ),
  (
    gen_random_uuid(),
    'Quantum Computing Explained',
    '42:15',
    'A beginner-friendly guide to quantum computing. Learn about qubits, quantum entanglement, and how this revolutionary technology will transform computing.',
    'https://example.com/podcasts/quantum-computing.mp3',
    now()
  ),
  (
    gen_random_uuid(),
    'The Rise of Sustainable Cities',
    '31:50',
    'Discover how cities are transforming to become more sustainable. From green architecture to smart energy systems, explore the future of urban living.',
    'https://example.com/podcasts/sustainable-cities.mp3',
    now()
  );