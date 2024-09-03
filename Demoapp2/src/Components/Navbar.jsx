import React from "react";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../state/slices/userSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(logoutUser());

      if (logoutUser.fulfilled.match(resultAction)) {
        message.success("Logged out successful");
        navigate("/login");
      } else {
        message.error(resultAction.payload || "Logout failed");
      }
    } catch (error) {
      message.error("An error occurred");
      console.error("Error:", error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg rounded-lg flex justify-between items-center">
      <div className="text-2xl font-semibold tracking-wide">
        Course Management
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-5 py-2 rounded-full shadow-md hover:bg-blue-100 hover:shadow-lg transition duration-300"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
