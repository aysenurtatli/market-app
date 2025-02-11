import React, { useState } from 'react'
import { login } from '../redux/app/features/loginSlice'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3000/users?email=${email}&password=${password}`)
            console.log(response)
            if (response.data.length > 0) {
                const user = response.data[0];
                if (user.password === password && user.email === email) {
                    dispatch(login(user))
                    setError('');
                    navigate('/')
                } else {
                    setError('Please Fill all')
                }
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='flex items-center justify-center h-[90vh] bg-zinc-100'>
            <div className='w-full max-w-md bg-white p-8 rounded shadow-sm'>
                <form onSubmit={handleLogin}>
                    <div className='mb-4'>
                        <label htmlFor="email">
                            E-Mail:
                        </label>
                        <input
                            type="email"
                            id='email'
                            value={email}
                            className='block border border-zinc-200 w-full mt-2 rounded-md focus:outline-none p-2'
                            onChange={(e) => setEmail(e.target.value)}
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
                            className='block border border-zinc-200 w-full mt-2 p-2 rounded-md focus:outline-none'
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button
                        type='submit'
                        className='bg-blue-700 w-full rounded-md text-white py-2 px-4'>
                        Login
                    </button>
                    <span className='mt-6 block'>You don't have an account ? <Link to="/register" className='text-blue-700 font-medium hover:underline'>Register</Link></span>
                </form>
            </div>
        </div>
    )
}

export default LoginPage