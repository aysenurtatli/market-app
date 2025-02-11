import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../redux/app/features/loginSlice';
import logo from '../assets/logo.png'

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }
    return (
        <nav className='flex flex-wrap max-w-screen-2xl items-center justify-between p-5 mx-auto'>
            <a href='#'><img src={logo} className="w-44" alt="" /></a>
            <button
                onClick={() => setIsOpen(!isOpen)}
                type='button'
                className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
                aria-expanded={isOpen}
            >
                <span className='sr-only'>Open Main Menu</span>
                <svg className='w-5 h-5' aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
            </button>
            <div className={`${isOpen ? `block bg-white md:bg-transparent rounded-md my-2` : "hidden"} w-full md:block md:w-auto`}>
                <ul className='font-medium flex flex-col gap-3 md:gap-0 p-4 md:p-0 mt-4 rounded-lg   md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 '>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/brands">Brands</Link></li>
                    <li><Link to="/categories">Categories</Link></li>
                    <li><Link to="/addproduct">Add Product</Link></li>
                    <li><Link to="/sales">Sales</Link></li>
                    <button onClick={handleLogout} className='bg-blue-600 rounded-md w-16 text-white'>Logout</button>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar