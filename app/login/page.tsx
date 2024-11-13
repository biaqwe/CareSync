"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import '../globals.css';

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Server response:', result);

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong.');
      }
      const { id } = result;
      localStorage.setItem('user', JSON.stringify({ id }));
      console.log(id);

      router.push('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || 'An error occurred while logging in. Please try again.');
      } else {
        setError('An unknown error occurred. Please try again.');
      }
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-backgr bg-opacity-20">
      <div className="fade-in w-full max-w-md p-8 space-y-8 bg-white bg-opacity-75 rounded-xl shadow-lg">

        <div className="flex justify-center">
          <Image
            src="/images/CareSync.png"
            alt="Logo"
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-two">Log in</h2>

        {error && (
          <p className="text-sm text-center text-red-500">
            {error}
          </p>
        )}

        <form className="space-y-6 flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="w-full flex justify-center">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="custom-input"
            />
          </div>
          <div className="w-full flex justify-center">
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="custom-input"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-one rounded-full hover:bg-two focus:outline-none transition-colors duration-200 animated-button"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <Link href="/signup" className="font-medium text-one hover:text-two hover:underline transition-colors duration-200">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
