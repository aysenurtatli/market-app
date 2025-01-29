import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct } from '../redux/app/features/productSlice';


function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const products = useSelector((state) => state.products.products)
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const numberId = products.length ? (Number(products[products.length - 1].id) + 1) : 1;
        const id = String(numberId)
        const newProduct = { name, price, description, id, stock }
        dispatch(addNewProduct(newProduct));
        alert('product added')
        setName('');
        setPrice('');
        setDescription('')
    }


    return (
        <div className='container m-auto h-[90vh] flex items-center justify-center'>
            <div className='shadow-md w-[450px] p-6 bg-zinc-100 rounded-md'>
                <h1 className='my-4 font-bold text-xl'>Add Product</h1>
                <form onSubmit={handleSubmit}>
                    <div className='flex justify-between gap-3'>
                        <div>
                            <label htmlFor="name" className='block'>Name:</label>
                            <input
                                type="text"
                                id='name'
                                value={name}
                                className='my-4 w-full p-2 focus:outline-none border-zinc-100 rounded-md'
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="price" className='block'>Price:</label>
                            <input
                                type="number"
                                id='price'
                                value={price}
                                className=' my-4 w-full p-2 focus:outline-none border-zinc-100 rounded-md'
                                onChange={(e) => setPrice(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="stock">Stock:</label>
                        <input
                            type="number"
                            id='stock'
                            value={stock}
                            className=' my-4 w-full p-2 focus:outline-none border-zinc-100 rounded-md'
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className='block'>Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            className='my-4 w-full h-20 p-2 focus:outline-none border-zinc-100 rounded-md'
                            onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <button type='submit' className='bg-green-400 text-slate-800 w-full my-4 rounded-md p-2'>Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct