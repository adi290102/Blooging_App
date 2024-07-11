import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import appwriteService from "../appwrite/config";
import { useNavigate, useParams, Link } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((fetchedPost) => {
                if (fetchedPost) {
                    setPost(fetchedPost);
                }
            }).catch((error) => {
                console.error('Error fetching post:', error);
            });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    const handleDelete = async () => {
        if (post) {
            try {
                await appwriteService.deletePost(post.$id);
                navigate('/');
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
                <div className="mt-6 flex items-center">
                    <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2">
                        Delete
                    </button>
                    <Link to={`/edit/${post.$id}`} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Edit
                    </Link>
                </div>
            </Container>
        </div>
    ) : null;
}

export default EditPost;
