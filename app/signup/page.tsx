"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import '../globals.css';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);
        router.push('/login');
      } else {
        alert(data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup. Please try again.");
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

        <h2 className="text-2xl font-bold text-center text-two">Sign Up</h2>

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
              placeholder="Create your password"
              className="custom-input"
            />
          </div>
          <div className="w-full flex justify-center">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              className="custom-input"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-one rounded-full hover:bg-two focus:outline-none transition-colors duration-200 animated-button"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-one hover:text-two hover:underline transition-colors duration-200">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
