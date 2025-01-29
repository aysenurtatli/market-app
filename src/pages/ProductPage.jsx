import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductAsync, fetchProductsAsync } from '../redux/app/features/productSlice';
import { IoClose } from "react-icons/io5";
import Barcode from 'react-barcode';

function ProductPage({ product }) {
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProductsAsync());
    }, [dispatch])


    const handleDelete = (id) => {
        dispatch(deleteProductAsync(id))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const updateData = {
            name,
            price,
            stock
        };

        dispatch(updateProductAsync({ id: product.id, updateData }))
            .then(() => {
                alert('product updated')
            })
            .catch((err) => {
                console.error('failed', err)
            });
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
    );


    return (
        <div className="container mx-auto">
            <h3 className="text-3xl my-5">Products</h3>
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none "
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <Barcode value={product.id}></Barcode>
                            <h4 className="text-xl font-bold">{product.name}</h4>
                            <p className='text-xl font-semibold  bg-green-300 text-green-900   h-10 flex items-center px-2 rounded-sm'>Price: {product.price}₺</p>
                            <p className="text-gray-700">Stock: {product.stock}</p>
                            <p className='text-lg'>{product.description}</p>
                            <div className='text-white flex items-center justify-center float-right bg-zinc-300 w-[50px] h-10 cursor-pointer rounded-md hover:bg-zinc-400 duration-200' onClick={() => handleDelete(product.id)}><IoClose /></div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full">
                        No products match your search.
                    </p>
                )}
            </div>
        </div>
    );
}

export default ProductPage