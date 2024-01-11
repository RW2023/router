//src
'use client'
import React, { useState } from 'react';
// Include other necessary imports here

const AuthForm = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Add login or registration logic here
    };

    return (
      <div
        className="flex justify-center items-center h-screen bg-base-100"
        style={{
          backgroundImage: `url(/img/hero3.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex justify-center items-center h-screen bg-base-300">
          <form
            onSubmit={handleSubmit}
            className="p-10 bg-base-100 rounded-lg shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-5 text-headline drop-shadow-md">
              {isLoginMode ? 'Login' : 'Register'}
            </h2>

            {!isLoginMode && (
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-headline text-sm font-bold mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-headline leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Choose a username"
                />
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-headline text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-headline leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your email"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-headline text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-base-300"
                placeholder="Your password"
              />
            </div>

            <button
              type="submit"
              className="w-full hover:bg-blue-500 bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isLoginMode ? 'Sign In' : 'Register'}
            </button>

            <p className="mt-4 text-sm text-center">
              {isLoginMode ? 'Need an account? ' : 'Already have an account? '}
              <button
                type="button"
                onClick={toggleMode}
                className="text-blue-500 hover:text-blue-700 font-bold"
              >
                {isLoginMode ? 'Register' : 'Login'}
              </button>
            </p>
          </form>
        </div>
      </div>
    );
};

export default AuthForm;
