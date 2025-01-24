import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Barcode from 'react-barcode';
import { useDispatch, useSelector } from 'react-redux'
import Checkout from '../components/Checkout';
import { addToCheckout } from '../redux/app/features/checkoutSlice';

function Home() {
    const [notFound, setNotFound] = useState('');
    const dispatch = useDispatch();
    const [idSearch, setIdSearch] = useState('')
    const { products } = useSelector((state) => state.products)

    const handleInputChange = (e) => {
        setIdSearch(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const foundProduct = products.find((product) => product.id === idSearch);
            if (foundProduct) {
                dispatch(addToCheckout(foundProduct));
                setIdSearch('');
                setNotFound('')
            } else {
                setNotFound('Product Not Found')
                setTimeout(() => {
                    setNotFound('')
                }, 3000)

            }
        }
    }



    return (
        <div className='container m-auto flex justify-between h-screen'>
            <div className='my-40'>
                <h2 className='text-3xl text-zinc-600'>Barcode</h2>
                <input type="text" className=' shadow-md bg-zinc-100 w-[500px] h-[100px] mt-2 rounded-md focus:outline-none p-2 text-3xl' value={idSearch} onChange={handleInputChange} onKeyDown={handleKeyDown} />
                {notFound && (
                    <div className="bg-white h-[100px] flex items-center justify-center text-red-500 font-bold rounded-md text-4xl my-6">{notFound}</div>
                )}
            </div>
            <Checkout />
        </div>
    )
}

export default Home