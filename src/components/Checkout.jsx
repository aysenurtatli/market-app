import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsAsync } from '../redux/app/features/productSlice'

function Checkout() {
    const dispatch = useDispatch()
    dispatch(fetchProductsAsync())
    const checkoutProducts = useSelector((state) => state.checkout.checkoutProducts)
    const totalPrice = checkoutProducts.reduce((total, product) => total + product.quantity * parseFloat(product.price), 0);

    return (
        <div className='text-white'>
            <h2 className='text-3xl'>Checkout</h2>
            {checkoutProducts.length > 0 ? (
                <div className='my-4 text-white'>
                    {checkoutProducts.map((product) => (
                        <div key={product.id}>
                            <div className='flex gap-2'>
                                <h2 className='text-4xl'>{product.name}</h2>
                                <p className='text-4xl'>{product.price} TL</p>
                                <span>{product.quantity}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (<p className='text-white'>Empty</p>)}
            <p>{totalPrice.toFixed(2)}</p>
        </div>
    )
}

export default Checkout