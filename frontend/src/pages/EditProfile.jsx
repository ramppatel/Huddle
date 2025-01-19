import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Camera,
  User2,
  Mail,
  Calendar,
  FileText,
  Lock,
  Save,
  ArrowLeft,
} from "lucide-react";
import Loader from "../components/Loader";
import axios from "axios";
import InputField from "../components/userProfile/InputField";
import { store } from "../store/store";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  const userName = localStorage.getItem("username");

  const fetchUserData = async () => {
    const res = await axios.get(`http://localhost:3001/profile/${userName}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res.data.user);

    if (!res.data) {
      isLoading(false);
      console.log("No data found");
      navigate("/login");
    } else {
      setUser(res.data.user);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.put(
        `http://localhost:3001/profile/${userName}/editprofile`,
        {
          fullName: user.fullName,
          email: user.email,
          // imageUrl: user.imageUrl,
          dateOfBirth: user.dateOfBirth,
          bio: user.bio,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data) {
        setUser(res.data.user);
        setIsLoading(false);
        navigate("/profile");
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Error saving changes:", err);
      navigate("/login");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white pb-12">
      <div className="relative bg-gradient-to-b from-purple-500/10 to-transparent">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative max-w-3xl mx-auto px-4 pt-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Profile
          </button>

          <h1 className="text-3xl font-bold text-center mb-4">Edit Profile</h1>
          <p className="text-gray-400 text-center mb-8">
            Update your personal information and profile settings
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-6">
        <div className="bg-gray-800/30 rounded-xl backdrop-blur-sm border border-gray-700/50 p-6 md:p-8">
          <form onSubmit={handleSaveChanges} className="space-y-8">
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-purple-500/30">
                  <img
                    src={user.imageUrl}
                    alt={user.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 p-2 rounded-full bg-purple-500 hover:bg-purple-600 transition-colors group-hover:scale-110 transform duration-200"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-400">
                Click the camera icon to update your profile picture
              </p>
            </div>

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="Full Name"
                icon={User2}
                type="text"
                name="fullName"
                value={user.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
              <InputField
                label="Email"
                icon={Mail}
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              <InputField
                label="Date of Birth"
                icon={Calendar}
                type="date"
                name="dateOfBirth"
                value={user.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Bio
              </label>
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleChange}
                className="w-full bg-gray-800/50 text-white p-4 rounded-lg border border-gray-700/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none backdrop-blur-sm transition-all h-32 resize-none"
                placeholder="Write something about yourself..."
              />
            </div>

            {/* Password Reset Link */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2 text-sm"
              >
                <Lock className="w-4 h-4" />
                Change Password
              </Link>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
