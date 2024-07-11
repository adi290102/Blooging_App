import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import { Link } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full py-16 mt-8 text-center bg-[#e6ecf0]">
                <Container>
                    <div className="flex justify-center items-center min-h-screen">
                        <div className="p-6 w-full max-w-md bg-white rounded-xl shadow-lg">
                            <h1 className="text-3xl font-bold text-[#14171a]">No Posts Yet</h1>
                            <p className="mt-4 text-[#657786]">Login to read and create posts.</p>
                            <Link
                                to="/login"
                                className="mt-4 inline-block text-[#1da1f2] font-medium hover:underline"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8 bg-[#e6ecf0]">
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
