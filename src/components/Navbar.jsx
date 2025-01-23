import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../redux/app/features/loginSlice';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }
    return (
        <div className='bg-slate-800 bg-opacity-20 shadow-sm'>
            <nav className='flex items-center justify-between p-5 container m-auto'>
                <div className='text-xl font-bold text-blue-300'>Market App</div>
                <div className='flex gap-5 items-center text-purple-200 text-lg'>
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/addproduct">Add Product</Link>
                    <button onClick={handleLogout} className='bg-blue-600 rounded-md w-16 text-white'>Logout</button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar