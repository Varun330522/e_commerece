"use client"
import { useState } from 'react';
export function Login({setIsSignedUp}){
    const [showPassword, setShowPassword] = useState(false)
    return (<div className=" flex items-center justify-center  overflow-hidden">
    <div className="mt-3 w-[500px] h-[500px] border-[#c1c1c1] rounded-lg border-[1px]	 ">
      <h2 className="mt-6 text-2xl font-semibold text-center">Login</h2>

      <h3 className="mt-6 text-xl font-medium text-center">Welcome back to ECOMMERCE</h3>
      <p className="text-center mt-6 font-normal">The next gen business marketplace</p>
      
      <form className="px-10 py-3">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 rounded-lg border-[1px] border-[#c1c1c1] focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 rounded-lg border-[1px]  border-[#c1c1c1]   focus:outline-none"
            id="password"
            type={showPassword?'text':'password'}
            placeholder="Enter your password"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="w-full px-4 py-2 font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:shadow-outline"
            type="button"
          > LOGIN
          </button>
        </div>
      </form>
      <p className="my-4 text-sm text-center">
        Don&apos;t have an Account? <a href="#"className="font-medium ml-2 " onClick={() => setIsSignedUp(true)}>SIGN UP</a>
      </p>
    </div>
  </div>
)
}