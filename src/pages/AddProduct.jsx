import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct } from '../redux/app/features/productSlice';
import { fetchBrandsAsync } from '../redux/app/features/brandThunks';
import { fetchCategoriesAsync } from '../redux/app/features/categoriesThunk';


function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const products = useSelector((state) => state.products.products)
    const brands = useSelector((state) => state.brands.brands)
    const categories = useSelector((state) => state.categories.categories)
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const numberId = products.length ? (Number(products[products.length - 1].id) + 1) : 1;
        const id = String(numberId)
        const newProduct = { name, price, description, id, stock, brand, category }

        if (Object.entries(newProduct).some(([key, value]) => key !== id && value.trim() === "")) {
            alert('please fill all fields')
            return;
        }

        dispatch(addNewProduct(newProduct));
        alert('product added')
        setName('');
        setPrice('');
        setStock('');
        setDescription('')
        setBrand('')
    }

    useEffect(() => {
        dispatch(fetchBrandsAsync())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchCategoriesAsync())
    }, [dispatch])

    const handleBrandChange = (e) => {
        setBrand(e.target.value)
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
    }



    return (
        <div className='container m-auto  flex items-center justify-center'>
            <div className='shadow-md w-[1000px] p-6 bg-zinc-100 rounded-md'>
                <h1 className='my-4 font-bold text-xl'>Add Product</h1>
                <form onSubmit={handleSubmit}>
                    <div className='flex  gap-3'>
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
                        <label htmlFor="category" className='block'>Category</label>
                        <select
                            name="category"
                            value={category}
                            onChange={handleCategoryChange}
                            className='my-4 w-full p-2 focus:outline-none border-zinc-100 rounded-md'
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="brand" className='block'>Brand:</label>
                        <select
                            name='brand'
                            value={brand}
                            onChange={handleBrandChange}
                            className='my-4 w-full p-2 focus:outline-none border-zinc-100 rounded-md'
                        >
                            <option value="">Select a brand</option>
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.name}>{brand.name}</option>
                            ))}
                        </select>
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