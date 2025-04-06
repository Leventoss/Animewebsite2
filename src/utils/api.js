// Mock data store (in a real application, this would be replaced with actual API calls)
const mockAnimeData = [
  {
    id: 1,
    title: 'Demon Slayer',
    description: 'A boy becomes a demon slayer after his family is slaughtered.',
    episodes: 26,
    status: 'Completed',
    imageUrl: '/assets/images/demo-anime.jpg'
  }
];

const mockUsers = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin'
  }
];

// Anime Management Functions
export const fetchAnimeList = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: mockAnimeData, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch anime list' };
  }
};

export const addAnime = async (animeData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newAnime = {
      id: mockAnimeData.length + 1,
      ...animeData
    };
    mockAnimeData.push(newAnime);
    return { data: newAnime, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to add anime' };
  }
};

export const updateAnime = async (id, updatedData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockAnimeData.findIndex(anime => anime.id === id);
    if (index === -1) {
      throw new Error('Anime not found');
    }
    mockAnimeData[index] = { ...mockAnimeData[index], ...updatedData };
    return { data: mockAnimeData[index], error: null };
  } catch (error) {
    return { data: null, error: 'Failed to update anime' };
  }
};

export const deleteAnime = async (id) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockAnimeData.findIndex(anime => anime.id === id);
    if (index === -1) {
      throw new Error('Anime not found');
    }
    mockAnimeData.splice(index, 1);
    return { data: true, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to delete anime' };
  }
};

// User Management Functions
export const fetchUsers = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: mockUsers, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch users' };
  }
};

export const updateUserRole = async (userId, newRole) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockUsers.findIndex(user => user.id === userId);
    if (index === -1) {
      throw new Error('User not found');
    }
    mockUsers[index].role = newRole;
    return { data: mockUsers[index], error: null };
  } catch (error) {
    return { data: null, error: 'Failed to update user role' };
  }
};

export const deleteUser = async (userId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockUsers.findIndex(user => user.id === userId);
    if (index === -1) {
      throw new Error('User not found');
    }
    mockUsers.splice(index, 1);
    return { data: true, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to delete user' };
  }
};

// Stats for Admin Dashboard
export const fetchStats = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      data: {
        totalAnime: mockAnimeData.length,
        totalUsers: mockUsers.length,
        activeUsers: mockUsers.filter(u => u.status !== 'inactive').length,
        recentUploads: mockAnimeData.slice(-5)
      },
      error: null
    };
  } catch (error) {
    return { data: null, error: 'Failed to fetch stats' };
  }
};

// Anime Details
export const fetchAnimeDetails = async (id) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const anime = mockAnimeData.find(a => a.id === id);
    if (!anime) {
      throw new Error('Anime not found');
    }
    return { data: anime, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch anime details' };
  }
};

// Authentication Functions
export const login = async (credentials) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Mock authentication logic
    const user = mockUsers.find(u => u.email === credentials.email);
    if (!user) {
      throw new Error('User not found');
    }
    const token = 'mock-jwt-token';
    localStorage.setItem('token', token);
    return { data: { user, token }, error: null };
  } catch (error) {
    return { data: null, error: 'Invalid credentials' };
  }
};

export const register = async (userData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      role: 'user' // Default role for new users
    };
    mockUsers.push(newUser);
    return { data: newUser, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to register user' };
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem('token');
    return { data: true, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to logout' };
  }
};

export const verifyToken = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    // In a real app, this would verify with the backend
    return { data: true, error: null };
  } catch (error) {
    return { data: null, error: 'Invalid token' };
  }
};