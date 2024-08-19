import React from 'react';
import { useSelector } from 'react-redux';
import AdminDashboard from './Components/AdminDashboard';
import UserDashboard from './Components/UserDashboard';
import Navbar from './Components/Navbar';

function App() {
 
  const role = useSelector((state) => state.user.role);

  return (
    <div>
      <Navbar />
      
      {role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
}

export default App;
