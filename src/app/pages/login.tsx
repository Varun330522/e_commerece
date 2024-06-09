"use client";
import { useState } from 'react';
import { api } from "~/trpc/react";
import Cookies from 'js-cookie';

export function Login({ onSignUp, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = api.login.create.useMutation({
    onSuccess: (data) => {
      Cookies.set('jwt_token', data.token, { expires: 1 });
      onLogin();
    },
    onError: (error) => {
      alert(error);
    },
  });
  

  return (
    <div className="flex items-center justify-center overflow-hidden">
      <div className="mt-3 w-[500px] h-[500px] border-[#c1c1c1] rounded-lg border-[1px]">
        <h2 className="mt-6 text-2xl font-semibold text-center">Login</h2>
        <h3 className="mt-6 text-xl font-medium text-center">Welcome back to ECOMMERCE</h3>
        <p className="text-center mt-6 font-normal">The next gen business marketplace</p>

        <form
          className="px-10 py-3"
          onSubmit={(e) => {
            e.preventDefault();
            login.mutate({ email, password });
          }}
        >
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 rounded-lg border-[1px] border-[#c1c1c1] focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 rounded-lg border-[1px] border-[#c1c1c1] focus:outline-none"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full px-4 py-2 font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              LOGIN
            </button>
          </div>
        </form>
        <p className="my-4 text-sm text-center">
          Don&apos;t have an Account? <a href="#" className="font-medium ml-2" onClick={() => onSignUp(true)}>SIGN UP</a>
        </p>
      </div>
    </div>
  );
}
