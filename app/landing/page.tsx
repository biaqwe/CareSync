"use client";

import Link from "next/link";
import Image from "next/image";
import '../globals.css';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-backgr bg-opacity-20">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">

        <div className="flex justify-center">
          <Image
            src="/images/CareSync.png"
            alt="Logo"
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-700">Welcome to CareSync</h2>
        <p className="text-center text-gray-600">
          Your health management platform, always by your side.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/login"
            className="px-4 py-2 text-white bg-one rounded-lg hover:bg-two focus:outline-none transition-colors duration-200"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 text-white bg-one rounded-lg hover:bg-two focus:outline-none transition-colors duration-200"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
