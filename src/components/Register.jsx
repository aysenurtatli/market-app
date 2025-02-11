import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { register } from '../redux/app/features/registerSlice';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatpassword, setRepeatPassword] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null)
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password || !repeatpassword) {
            setError('Fill all fields');
            return;
        }
        if (password !== repeatpassword) {
            setError('Passwords do not match');
            return;
        }

        axios
            .get(`http://localhost:3000/users?email=${email}`)
            .then((response) => {
                if (response.data.length > 0) {
                    setError('User with this email already exists');
                    return;
                }

                // Yeni kullanıcıyı kaydet
                axios
                    .post('http://localhost:3000/users', { email, password })
                    .then((response) => {
                        dispatch(register(response.data));
                        setSuccessMessage("Registration Successful");
                        setTimeout(() => {
                            setSuccessMessage("");
                        }, 3000);

                        setEmail("");
                        setPassword("");
                        setRepeatPassword("");
                    })
                    .catch((error) => {
                        setError('Registration failed');
                    });
            })
            .catch((error) => {
                setError('Failed to check user existence');
            });
    }


    return (
        <div className='flex items-center justify-center h-[90vh] bg-zinc-100'>
            <div className='w-full max-w-md bg-white p-8 rounded shadow-sm'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor="email">
                            E-Mail:
                        </label>
                        <input
                            type="email"
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='block border border-zinc-200 w-full mt-2 rounded-md focus:outline-none p-2'
                        />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor="password">
                            Password:
                        </label>
                        <input
                            type="password"
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='block border border-zinc-200 w-full mt-2 p-2 rounded-md focus:outline-none' />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor="password">
                            Repeat Your Password:
                        </label>
                        <input
                            type="password"
                            id='repeatpassword'
                            value={repeatpassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            className='block border border-zinc-200 w-full mt-2 p-2 rounded-md focus:outline-none' />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    {successMessage && <p className='text-green-600 text-sm font-medium mb-4'>{successMessage}</p>}
                    <button
                        type='submit'
                        className='bg-blue-700 w-full rounded-md text-white py-2 px-4'>
                        Register
                    </button>
                    <span className='mt-6 block'>Already have an account ? <Link to="/login" className='text-blue-700 font-medium hover:underline'>Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Register