'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Updated import
import { supabase } from '@/utils/supabaseClient';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session) {
        setError('Already logged in. Redirecting to dashboard...');
        setTimeout(() => {
          router.push('/devdash');
        }, 7000); // Redirect after 7 seconds
      }
    };
    checkSession();
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');

    try {
      if (isLogin) {
        // Handle login
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        // Handle registration
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage(
          'Registration successful, please check your email to verify.',
        );
      }
    } catch (error) {
      setMessage((error as Error).message);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Logged out successfully.');
      router.push('/login');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-base-100">
      <div className="flex justify-center items-center h-screen bg-base-300 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
        <form
          onSubmit={handleSubmit}
          className="p-5 bg-base-100 rounded-lg shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-5 text-headline drop-shadow-md">
            {isLogin ? 'Login' : 'Register'}
          </h2>

          {message && <p className="mb-4 text-red-500">{message}</p>}

          <div className="mb-4">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              required
            />
            bash Copy code
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            {isLogin ? 'Sign In' : 'Register'}
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="btn btn-error w-full mt-4"
          >
            Logout
          </button>

          <p className="mt-4 text-sm text-center">
            {isLogin ? 'Need an account? ' : 'Already have an account? '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 hover:text-blue-700"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
