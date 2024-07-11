import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        // console.log(data); this will present in data.{email: 'four@gmail.com', password: 'aditya123'}
        setError(""); // clean the error.
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate("/"); // jese login hua usko navigate kara do, Link is click karne per navigate hota.
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
            <div className="mx-auto w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
                <div className="flex justify-center mb-6">
                    <Logo width="80px" />
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-gray-900">Sign in to Blogging App</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-500 hover:text-blue-700 transition-all duration-200"
                    >
                        Sign up
                    </Link>
                </p>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="space-y-6">
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email" // taki wo @ wagera add karde.
                        {...register("email", { // har baar register ko spread karna padega taki value override na ho jaye.
                            required: true,
                            validate: {
                                matchPattern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            },
                        })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", { // iske karan hi sync (data) data pass hota hai.
                            required: true,
                        })}
                    />
                    <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition-all duration-200">
                        Sign in
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;
