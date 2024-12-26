"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { loginUser } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import store from '../store/store';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();


   const onSubmit = (data) => {
    const toastId = toast.loading("Logging in...");
    
    // Dispatch login action
    dispatch(loginUser(data));
    
    // Check for authentication success or failure
    const { error } = store.getState().auth;  // Assuming auth is your slice name
    
    if (!error) {
      // Success: Show success message and redirect
      toast.success("Login Successful!", { id: toastId });
      router.push("/"); // Redirect to the dashboard or home page
    } else {
      // Failure: Show error message
      toast.error(error || "Login failed", { id: toastId });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50">
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword ? (
             <span><FiEye /></span>
              ) : (
                 <span><FiEyeOff /></span>
              )}
            </button>
          </div>
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Login
