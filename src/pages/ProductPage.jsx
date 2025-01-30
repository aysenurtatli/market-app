import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductAsync, fetchProductsAsync } from '../redux/app/features/productSlice';
import Barcode from 'react-barcode';
import { IoClose } from 'react-icons/io5';
import { fetchBrandsAsync } from '../redux/app/features/brandThunks';


function ProductPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchBrand, setSearchBrand] = useState("");
    const dispatch = useDispatch();
    const { brands } = useSelector((state) => state.brands)
    const { products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProductsAsync());
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchBrandsAsync());
    }, [dispatch])


    const handleDelete = (id) => {
        dispatch(deleteProductAsync(id))
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleBrandSearch = (e) => {
        setSearchBrand(e.target.value)
    }

    const uniqueBrands = [...new Set(brands.map(brand => brand.name))];

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm) &&
        (searchBrand === "" || product.brand === searchBrand)
    );


    return (
        <div className="container mx-auto">
            <div className='sticky top-10 z-10 mb-6 p-2 rounded-md'>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none shadow-md"
                />
                <select value={searchBrand} onChange={handleBrandSearch} className='border border-gray-300 rounded-md p-2 w-full focus:outline-none shadow-md my-2 text-gray-400'>
                    <option value="">All Brands</option>
                    {uniqueBrands.map((brand) => (
                        <option value={brand} key={brand}>{brand}</option>
                    ))}
                </select>
            </div>
            <div className="overflow-x-auto mt-8">
                <table className='min-w-full bg-white rounded-md p-2 w-full mb-4'>
                    <thead>
                        <tr className='bg-blue-200 text-blue-800'>
                            <th>Barcode</th>
                            <th>Brand</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <tr key={product.id} className='border-t'>
                                    <td className='py-2 px-4 border'><Barcode value={product.id} /></td>
                                    <td className='py-2 px-4 border'>{product.brand}</td>
                                    <td className='py-2 px-4 border'>{product.name}</td>
                                    <td className='py-2 px-4 border'>{product.price}</td>
                                    <td className='py-2 px-4 border'>{product.stock}</td>
                                    <td className='py-2 px-4 border'>{product.description}</td>
                                    <td className='py-2 px-4 border text-center'>
                                        <button onClick={() => handleDelete(product.id)}>
                                            <IoClose size={30} className='text-red-600' />
                                        </button>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6}>No products match your search</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductPage