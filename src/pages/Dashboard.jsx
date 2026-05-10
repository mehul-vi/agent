import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, {user?.name || user?.email}!</p>
          </div>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors font-medium"
          >
            Logout
          </button>
        </div>
        
        <div className="p-8">
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-indigo-900 mb-2">Profile Information</h2>
            <div className="space-y-3 mt-4">
              <div className="flex">
                <span className="w-32 text-indigo-700 font-medium">Name:</span>
                <span className="text-gray-800">{user?.name || 'N/A'}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-indigo-700 font-medium">Email:</span>
                <span className="text-gray-800">{user?.email}</span>
              </div>
              <div className="flex items-center">
                <span className="w-32 text-indigo-700 font-medium">Role:</span>
                <span className="text-gray-800 bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded text-sm font-medium">{user?.role || 'USER'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
