/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState } from 'react';
import { api } from "~/trpc/react";

export function SignUp({ onVerification, onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const createOtp = api.sign_up.create.useMutation({
    onSuccess: () => {
      onVerification({name,email,password})
      setName("");
      setEmail("");
      setPassword("")
    },
    onError:(error)=>{
      alert(error);
    }
  });


  return (
    <div className="flex items-center justify-center overflow-hidden">
      <div className="mt-3 w-[500px] h-[500px] border-[#c1c1c1] rounded-lg border-[1px]">
        <h2 className="mt-6 text-2xl font-bold text-center">Create your account</h2>
        <form className="px-10 py-3" 
        onSubmit={(e) => {
        e.preventDefault();
        createOtp.mutate({ name,email,password });
        }}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 rounded-lg border-[1px] border-[#c1c1c1] focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
              className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 rounded-lg border-[1px] border-[#c1c1c1] focus:outline-none focus:shadow-outline"
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
              CREATE ACCOUNT
            </button>
          </div>
        </form>
        <p className="my-4 text-sm text-center">
          Have an Account? <a href="#" className="font-medium" onClick={() => onLogin()}>LOGIN</a>
        </p>
      </div>
    </div>
  );
}


