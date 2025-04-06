// src/components/admin/ContentManagement.jsx
import React, { useState, useEffect } from 'react';
import { fetchAnimeList, updateAnime, deleteAnime, addAnime } from '../../utils/api';

const ContentManagement = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAnime, setNewAnime] = useState({
    title: '',
    description: '',
    episodes: 0,
    status: 'ongoing',
  });

  useEffect(() => {
    loadAnimeList();
  }, []);

  const loadAnimeList = async () => {
    try {
      const data = await fetchAnimeList();
      setAnimeList(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load anime list');
      setLoading(false);
    }
  };

  const handleAddAnime = async (e) => {
    e.preventDefault();
    try {
      await addAnime(newAnime);
      setShowAddForm(false);
      setNewAnime({ title: '', description: '', episodes: 0, status: 'ongoing' });
      await loadAnimeList();
    } catch (err) {
      setError('Failed to add anime');
    }
  };

  const handleUpdateAnime = async (id, updatedData) => {
    try {
      await updateAnime(id, updatedData);
      await loadAnimeList();
    } catch (err) {
      setError('Failed to update anime');
    }
  };

  const handleDeleteAnime = async (id) => {
    if (!window.confirm('Are you sure you want to delete this anime?')) return;
    
    try {
      await deleteAnime(id);
      await loadAnimeList();
    } catch (err) {
      setError('Failed to delete anime');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        {showAddForm ? 'Cancel' : 'Add New Anime'}
      </button>

      {showAddForm && (
        <form onSubmit={handleAddAnime} className="space-y-4 bg-white p-6 rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={newAnime.title}
              onChange={(e) => setNewAnime({ ...newAnime, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={newAnime.description}
              onChange={(e) => setNewAnime({ ...newAnime, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows="3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Episodes</label>
            <input
              type="number"
              value={newAnime.episodes}
              onChange={(e) => setNewAnime({ ...newAnime, episodes: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              min="0"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={newAnime.status}
              onChange={(e) => setNewAnime({ ...newAnime, status: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Anime
          </button>
        </form>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Episodes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {animeList.map((anime) => (
              <tr key={anime.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{anime.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{anime.episodes}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={anime.status}
                    onChange={(e) => handleUpdateAnime(anime.id, { status: e.target.value })}
                    className="text-sm text-gray-900 border rounded p-1"
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDeleteAnime(anime.id)}
                    className="text-red-600 hover:text-red-900 mr-4"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentManagement;