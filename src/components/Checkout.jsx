import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsAsync } from '../redux/app/features/productSlice'
import { IoClose } from "react-icons/io5";
import { completeSale } from '../redux/app/features/checkoutSlice';

function Checkout() {
    const dispatch = useDispatch()
    dispatch(fetchProductsAsync())
    const checkoutProducts = useSelector((state) => state.checkout.checkoutProducts)
    const totalPrice = checkoutProducts.reduce((total, product) => total + product.quantity * parseFloat(product.price), 0);

    const handleCompleteSale = () => {
        if (checkoutProducts.length === 0) {
            alert('checkout is empty');
            return;
        }
        dispatch(completeSale(checkoutProducts));
        alert('sale completed')
    }

    return (
        <div className='text-white my-40 bg-slate-900 w-[500px] p-5 rounded-md'>
            <h2 className='text-4xl'>Checkout</h2>
            {checkoutProducts.length > 0 ? (
                <div className='my-4 text-white'>
                    {checkoutProducts.map((product) => (
                        <div key={product.id}>
                            <div className='flex gap-2 bg-slate-900 my-4 p-2 relative'>
                                <h2 className='text-3xl'>{product.name}</h2>
                                <p className='text-3xl'>{product.price} TL</p>
                                <div className='flex items-center justify-center'>
                                    <IoClose />
                                    <span>{product.quantity}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (<p className='text-white text-2xl'>Empty</p>)}
            <p className='text-2xl'>{totalPrice.toFixed(2)}</p>
            <button onClick={handleCompleteSale} className='bg-green-800 w-full h-10 rounded-sm text-2xl mt-10'>Sale</button>
        </div>
    )
}

export default Checkout