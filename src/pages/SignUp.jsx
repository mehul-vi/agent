import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to register');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 bg-white">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an account</h2>
            <p className="text-gray-500">Start your 14-day free trial. No credit card required.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="name">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User size={20} />
                </div>
                <input 
                  type="text" 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors outline-none" 
                  placeholder="Enter your full name" 
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="email">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={20} />
                </div>
                <input 
                  type="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors outline-none" 
                  placeholder="Enter your email" 
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="password">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={20} />
                </div>
                <input 
                  type="password" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors outline-none" 
                  placeholder="Create a password (min 8 characters)" 
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Get Started'}
              {!isSubmitting && <ArrowRight size={18} />}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Image/Branding Section */}
      <div className="hidden lg:flex w-1/2 bg-gray-50 p-12 relative items-center justify-center border-l border-gray-200">
        <div className="relative w-full max-w-lg">
          {/* Abstract geometric illustration */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative z-10">
            <div className="flex gap-4 items-center mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Lightning Fast</h3>
                <p className="text-sm text-gray-500">Deploy in seconds</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-2 bg-gray-100 rounded w-full"></div>
              <div className="h-2 bg-gray-100 rounded w-5/6"></div>
              <div className="h-2 bg-gray-100 rounded w-4/6"></div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 absolute -right-8 -bottom-12 w-64 z-20">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Total Users</p>
                <p className="font-bold text-2xl text-gray-900">24.5K</p>
              </div>
              <div className="text-green-500 flex items-center text-sm font-medium">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                12%
              </div>
            </div>
            <div className="h-12 flex items-end gap-2">
              <div className="w-1/5 bg-indigo-100 rounded-t h-1/3"></div>
              <div className="w-1/5 bg-indigo-200 rounded-t h-1/2"></div>
              <div className="w-1/5 bg-indigo-300 rounded-t h-3/4"></div>
              <div className="w-1/5 bg-indigo-400 rounded-t h-full"></div>
              <div className="w-1/5 bg-indigo-600 rounded-t h-5/6"></div>
            </div>
          </div>
          
          {/* Decorative dots */}
          <div className="absolute top-10 -left-10 w-24 h-24 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:10px_10px] opacity-70"></div>
          <div className="absolute -bottom-6 right-20 w-32 h-32 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:10px_10px] opacity-70 z-0"></div>
        </div>
      </div>
    </div>
  );
}
