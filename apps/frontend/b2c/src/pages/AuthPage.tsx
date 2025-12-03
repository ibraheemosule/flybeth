import { useState, useEffect } from 'react';
import { AuthForm } from '../components/AuthForm';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  if (isLoggedIn && user) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600">Welcome!</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-600">Name: <span className="font-medium">{user.firstName} {user.lastName}</span></p>
          </div>
          <div>
            <p className="text-gray-600">Email: <span className="font-medium">{user.email}</span></p>
          </div>
          <div>
            <p className="text-gray-600">Account Type: <span className="font-medium">{user.userType}</span></p>
          </div>
          <div>
            <p className="text-gray-600">User ID: <span className="font-medium text-xs">{user.id}</span></p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AuthForm 
        mode={mode} 
        onToggle={() => setMode(prev => prev === 'login' ? 'register' : 'login')} 
      />
    </div>
  );
}