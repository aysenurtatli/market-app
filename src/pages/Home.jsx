import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Barcode from 'react-barcode';
import { useDispatch, useSelector } from 'react-redux'
import Checkout from '../components/Checkout';
import { addToCheckout } from '../redux/app/features/checkoutSlice';

function Home() {
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
            } else {
                console.log('Product not found')
            }
        }
    }


    return (
        <div className='container m-auto flex justify-between'>
            <div>
                <input type="text" className='border border-zinc-200 w-[500px] h-[100px] mt-2 rounded-md focus:outline-none p-2 text-3xl' value={idSearch} onChange={handleInputChange} onKeyDown={handleKeyDown} />
            </div>
            <Checkout />
        </div>
    )
}

export default Home