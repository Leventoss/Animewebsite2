import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import AnimeList from './components/anime/AnimeList';
import AnimeDetails from './components/anime/AnimeDetails';
import AdminPanel from './components/admin/AdminPanel';
import Dashboard from './components/admin/Dashboard';
import UserManagement from './components/admin/UserManagement';
import ContentManagement from './components/admin/ContentManagement';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            
            <Route path="/" element={<AnimeList />} />
            <Route 
              path="/anime/:id" 
              element={
                <ProtectedRoute>
                  <AnimeDetails />
                </ProtectedRoute>
              } 
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminPanel />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="content" element={<ContentManagement />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
