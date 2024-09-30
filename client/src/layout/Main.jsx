import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthProvider';
import LoadingSpinner from '../components/LoadingSpinner';

const Main = () => {
  const { loading } = useContext(AuthContext);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Navbar />
          <div className='min-h-screen'>
            <Outlet />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Main;
