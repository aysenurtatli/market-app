import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductAsync, fetchProductsAsync } from '../redux/app/features/productSlice';
import { IoClose } from "react-icons/io5";
import Barcode from 'react-barcode';

function ProductPage() {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProductsAsync());
    }, [dispatch])


    const handleDelete = (id) => {
        dispatch(deleteProductAsync(id))
    }

    return (
        <div className='container m-auto'>
            <div className='max-w-full m-2 rounded-md'>
                <h1 className='text-4xl font-bold my-10 text-slate-400'>Products</h1>
                <ul className='flex flex-wrap gap-5 justify-center '>
                    {products?.map(product => (
                        <li key={product.id} className='bg-slate-800 p-5 rounded shadow-md w-[300px]'>
                            <h3 className='text-lg text-white font-semibold'>{product.name}</h3>
                            <Barcode value={product.id}></Barcode>
                            <p className='text-md text-slate-400'>{product.description}</p>
                            <p className='text-lg text-slate-400'>{product.stock}</p>
                            <div className='flex justify-between'>
                                <p className='text-xl font-semibold  bg-green-900 text-green-400 w-[120px] h-10 flex items-center px-2 rounded-sm'>Price: {product.price}₺</p>
                                <div className='text-white flex items-center justify-center bg-slate-700 w-[50px] h-10 cursor-pointer rounded-md hover:bg-slate-900 duration-200' onClick={() => handleDelete(product.id)}><IoClose /></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ProductPage