import React from 'react';
import { Container, PostForm } from '../components';

function AddPost() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Container className="w-full max-w-3xl">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Add New Post</h1>
            <PostForm />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AddPost;
