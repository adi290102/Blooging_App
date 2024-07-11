import React from 'react';
import { Login as LoginComponent } from '../components';

function Login() {
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
        <LoginComponent />
      </div>
    </div>
  );
}

export default Login;
