import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchRole } from '../state/slices/userSlice';

function Navbar() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.user.role);

  const handleSwitch = () => {
    dispatch(switchRole());
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg rounded-lg flex justify-between items-center">
      <div className="text-2xl font-semibold tracking-wide">Course Management</div>
      <div>
        <button
          onClick={handleSwitch}
          className="bg-white text-blue-600 px-5 py-2 rounded-full shadow-md hover:bg-blue-100 hover:shadow-lg transition duration-300"
        >
          Switch to {role === 'user' ? 'Admin' : 'User'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
