"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaHistory, FaCalendarAlt, FaUserMd, FaNotesMedical, FaUserAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
import '../globals.css';

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userLoggedIn = true;
    setIsAuthenticated(userLoggedIn);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-backgr bg-opacity-20">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-700">You need to log in first</h2>
          <Link href="/login" className="mt-4 px-6 py-2 text-white bg-one rounded-lg hover:bg-two focus:outline-none transition-colors duration-200">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-backgr bg-opacity-20">
      <div className="w-64 bg-white shadow-lg p-6 flex flex-col items-center">
        <Link href="/dashboard">
          <div className="flex justify-center mb-8">
            <Image
              src="/images/CareSync.png"
              alt="Logo"
              width={200}
              height={200}
              className="rounded-full cursor-pointer"
            />
          </div>
        </Link>

        <div className="space-y-6 flex flex-col items-center w-full">
          <Link
            href="/medical-history"
            className="flex items-center justify-center w-full px-4 py-3 text-white bg-one rounded-full hover:bg-two focus:outline-none transition-colors duration-200"
          >
            <FaHistory className="w-5 h-5 mr-2" />
            Medical History
          </Link>
          <Link
            href="/appointments"
            className="flex items-center justify-center w-full px-4 py-3 text-white bg-one rounded-full hover:bg-two focus:outline-none transition-colors duration-200"
          >
            <FaCalendarAlt className="w-5 h-5 mr-2" />
            Appointments
          </Link>
          <Link
            href="/doctor-list"
            className="flex items-center justify-center w-full px-4 py-3 text-white bg-one rounded-full hover:bg-two focus:outline-none transition-colors duration-200"
          >
            <FaUserMd className="w-5 h-5 mr-2" />
            Doctor List
          </Link>
          <Link
            href="/log-symptoms"
            className="flex items-center justify-center w-full px-4 py-3 text-white bg-[#D32F6D] rounded-full hover:bg-[#A12A58] focus:outline-none transition-colors duration-200"
          >
            <FaNotesMedical className="w-5 h-5 mr-2" />
            Log Symptoms
          </Link>
          <Link
            href="/profile"
            className="flex items-center justify-center w-full px-4 py-3 text-white bg-one rounded-full hover:bg-two focus:outline-none transition-colors duration-200"
          >
            <FaUserAlt className="w-5 h-5 mr-2" />
            Profile
          </Link>
          <Link
            href="/settings"
            className="flex items-center justify-center w-full px-4 py-3 text-white bg-one rounded-full hover:bg-two focus:outline-none transition-colors duration-200"
          >
            <FaCog className="w-5 h-5 mr-2" />
            Settings
          </Link>
          <Link
            href="/login"
            className="flex items-center justify-center w-full px-4 py-3 text-white bg-one rounded-full hover:bg-two focus:outline-none transition-colors duration-200"
          >
            <FaSignOutAlt className="w-5 h-5 mr-2" />
            Log Out
          </Link>
        </div>
      </div>

      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-4">Welcome to Your Dashboard</h2>
        <p className="text-center text-gray-600">
          Here you can manage your account and settings.
        </p>
      </div>
    </div>
  );
}
