// src/components/anime/AnimeDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAnimeDetails } from '../../utils/api';
import VideoPlayer from './VideoPlayer';

const AnimeDetails = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAnimeDetails();
  }, [id]);

  const loadAnimeDetails = async () => {
    try {
      const data = await fetchAnimeDetails(id);
      setAnime(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load anime details');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!anime) return <div>Anime not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <img
            src={anime.coverImage}
            alt={anime.title}
            className="w-full rounded-lg shadow-lg"
          />
          <div className="mt-4 space-y-4">
            <h1 className="text-2xl font-bold text-gray-900">{anime.title}</h1>
            <div className="space-y-2">
              <p className="text-gray-600"><span className="font-semibold">Status:</span> {anime.status}</p>
              <p className="text-gray-600"><span className="font-semibold">Episodes:</span> {anime.episodes}</p>
              <p className="text-gray-600"><span className="font-semibold">Genre:</span> {anime.genres.join(', ')}</p>
            </div>
            <p className="text-gray-700">{anime.description}</p>
          </div>
        </div>

        <div className="md:col-span-2">
          {selectedEpisode ? (
            <div className="mb-6">
              <VideoPlayer episode={selectedEpisode} />
              <button
                onClick={() => setSelectedEpisode(null)}
                className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Back to Episode List
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Episodes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {anime.episodes.map((episode) => (
                  <button
                    key={episode.id}
                    onClick={() => setSelectedEpisode(episode)}
                    className="p-4 border rounded-lg hover:bg-gray-50 text-left"
                  >
                    <p className="font-semibold">Episode {episode.number}</p>
                    <p className="text-sm text-gray-600">{episode.title}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;