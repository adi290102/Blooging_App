import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="relative block transition-transform transform hover:scale-105">
      <div className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out">
        <div className="w-full mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl w-full object-cover"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 text-white text-lg font-bold rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-200 ease-in-out">
        Express your thoughts
      </div>
    </Link>
  );
}

export default PostCard;
