// src/components/anime/AnimeList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAnimeList } from '../../utils/api';

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadAnimeList();
  }, []);

  const loadAnimeList = async () => {
    try {
      const response = await fetchAnimeList();
      if (response.error) {
        throw new Error(response.error);
      }
      setAnimeList(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load anime list');
      setLoading(false);
    }
  };

  const filteredAnime = animeList.filter((anime) => {
    const matchesSearch = anime.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || anime.status === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search anime..."
          className="flex-1 p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAnime.map((anime) => (
          <Link
            key={anime.id}
            to={`/anime/${anime.id}`}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={anime.coverImage}
              alt={anime.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{anime.title}</h3>
              <p className="text-sm text-gray-600 mb-2">Episodes: {anime.episodes}</p>
              <span className={`px-2 py-1 rounded text-xs ${
                anime.status === 'ongoing' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {anime.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AnimeList;