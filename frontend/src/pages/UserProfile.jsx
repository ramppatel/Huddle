import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Calendar, Mail, User2, Edit2 } from "lucide-react";
import Loader from "../components/Loader";
import axios from "axios";
import useAPI from "../hooks/useAPI";
import { useSelector } from "react-redux";
import { selectUser } from "../store/authSlice";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const activeUser = useSelector(selectUser);

  const { GET } = useAPI();

  const fetchUserData = async () => {
    const res = await axios.get(
      `http://localhost:3001/api/user/${activeUser.username}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white pb-12">
      <div className="relative bg-gradient-to-b from-purple-500/10 to-transparent">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative max-w-3xl mx-auto px-4 pt-16 pb-24">
          <div className="flex flex-col items-center gap-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-purple-500/30 backdrop-blur-sm">
                <img
                  src={user.imageUrl}
                  alt={user.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 p-2 rounded-full bg-purple-500 hover:bg-purple-600 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* User Info */}
            <div className="text-center">
              <h1 className="text-3xl font-bold">{user.fullName}</h1>
              <p className="text-purple-400 mt-1">{user.role}</p>
            </div>

            {/* Action Button */}
            <button
              onClick={() => navigate("edit")}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className="max-w-3xl mx-auto px-4 -mt-12">
        <div className="bg-gray-800/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-6">Personal Info</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User2 className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">Bio</p>
                <p>{user.bio}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">Birthday</p>
                <p>{new Date(user.dateOfBirth).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
