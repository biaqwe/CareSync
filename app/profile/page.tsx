"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaHistory, FaCalendarAlt, FaUserMd, FaNotesMedical, FaUserAlt, FaCog, FaSignOutAlt, FaPhone, FaBirthdayCake, FaHome, FaVenusMars } from 'react-icons/fa';
import '../globals.css';

export default function Profile() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    address: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const user_id = user.id;

    console.log("User ID from localStorage:", user_id);

    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const user_id = user.id;

        const response = await fetch('http://localhost:8000/api/profile', {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        console.log("Profile data:", data);
        const formattedBirthDate = new Date(data.birthDate).toLocaleDateString('en-CA');

        setUserData({
          firstName: data.first_name,
          lastName: data.last_name,
          phoneNumber: data.phoneNumber,
          birthDate: formattedBirthDate,
          gender: data.gender,
          address: data.address
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };


    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });

  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };



  const handleSave = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const user_id = user.id;

      const response = await fetch('http://localhost:8000/api/profile/update', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userData, user_id })
      });

      const responseBody = await response.json();
      console.log('Response status:', response.status);
      console.log('Response body:', responseBody);

      if (!response.ok) {
        throw new Error(responseBody.message || 'Failed to save profile data');
      }

      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    }
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
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

      <div className="flex-1 p-16 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <h2 className="text-two text-3xl font-bold text-center text-gray-700 mb-4">Your Profile</h2>

          <div className="w-full bg-white p-6 rounded-lg shadow-md">
            <table className="w-full table-auto">
              <tbody>
                <tr>
                  <td className="text-two font-semibold py-6 pr-6 text-left text-lg">
                    <FaUserAlt className="mr-2 inline-block text-xl text-one" /> First Name
                  </td>
                  <td className="text-right">
                    <input
                      type="text"
                      name="firstName"
                      value={userData.firstName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="px-4 py-2 rounded-full border w-1/2 text-two text-lg text-center custom-input"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="text-two font-semibold py-6 pr-6 text-left text-lg">
                    <FaUserAlt className="mr-2 inline-block text-xl text-one" /> Last Name
                  </td>
                  <td className="text-right">
                    <input
                      type="text"
                      name="lastName"
                      value={userData.lastName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="px-4 py-2 rounded-full border w-1/2 text-two text-lg text-center custom-input"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="text-two font-semibold py-6 pr-6 text-left text-lg">
                    <FaPhone className="mr-2 inline-block text-xl text-one" /> Phone Number
                  </td>
                  <td className="text-right">
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={userData.phoneNumber}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="px-4 py-2 rounded-full border w-1/2 text-two text-lg text-center custom-input"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="text-two font-semibold py-6 pr-6 text-left text-lg">
                    <FaBirthdayCake className="mr-2 inline-block text-xl text-one" /> Birth Date
                  </td>
                  <td className="text-right">
                    <input
                      type="date"
                      name="birthDate"
                      value={userData.birthDate}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="px-4 py-2 rounded-full border w-1/2 text-two text-lg text-center custom-input"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="text-two font-semibold py-6 pr-6 text-left text-lg">
                    <FaVenusMars className="mr-2 inline-block text-xl text-one" /> Gender
                  </td>
                  <td className="text-right">
                    <select
                      name="gender"
                      value={userData.gender}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="px-4 py-2 rounded-full border w-1/2 text-two text-lg text-center custom-input"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </td>
                </tr>

                <tr>
                  <td className="text-two font-semibold py-6 pr-6 text-left text-lg">
                    <FaHome className="mr-2 inline-block text-xl text-one" /> Address
                  </td>
                  <td className="text-right">
                    <textarea
                      name="address"
                      value={userData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="px-4 py-2 rounded-full border w-1/2 text-two text-lg text-center custom-input"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-center mt-6">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="w-[380px] px-12 py-3 bg-one text-white rounded-full hover:bg-two transition-colors text-lg"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={toggleEdit}
                  className="w-[380px] px-12 py-3 bg-one text-white rounded-full hover:bg-two transition-colors text-lg"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 