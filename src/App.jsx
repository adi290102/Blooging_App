import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <div className='min-h-screen flex flex-col bg-blue-50'>
      <header className='w-full bg-white border-b border-gray-200'>
        <Header />
      </header>
      <main className='flex-grow'>
        <div className='container mx-auto p-4'>
          <Outlet />
        </div>
      </main>
      <footer className='w-full bg-white border-t border-gray-200'>
        <Footer />
      </footer>
    </div>
  ) : null;
}

export default App;
