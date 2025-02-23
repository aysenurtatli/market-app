import React, { useState } from 'react'
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
        <div className='container mx-auto my-10'>
            <div>
                <div className='mx-auto'>
                    <h2 className='text-3xl text-zinc-600'>Barcode</h2>
                    <input type="text" className='border shadow-md w-[500px] h-[100px] mt-2 rounded-md focus:outline-none px-3 text-3xl' value={idSearch} onChange={handleInputChange} onKeyDown={handleKeyDown} />
                    {notFound && (
                        <div className="bg-white h-[100px] flex items-center justify-center text-red-500 font-bold rounded-md text-4xl my-6">{notFound}</div>
                    )}
                </div>
                <Checkout />
            </div>
        </div>
    )
}

export default Home