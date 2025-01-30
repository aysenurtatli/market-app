import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBrandAsync, deleteBrandAsync, fetchBrandsAsync } from '../redux/app/features/brandThunks';
import { IoClose } from 'react-icons/io5';

function Brands() {
    const dispatch = useDispatch();
    const { brands } = useSelector((state) => state.brands);
    const [newBrand, setNewBrand] = useState("");

    useEffect(() => {
        dispatch(fetchBrandsAsync());
    }, [dispatch]);

    const handleAddBrand = () => {
        if (newBrand.trim() === "") return;
        dispatch(addBrandAsync({ name: newBrand }));
        setNewBrand("")
    }

    const handleDeleteBrand = (id) => {
        dispatch(deleteBrandAsync(id))
    }

    return (
        <div className='container mx-auto'>
            <h2 className='text-2xl mb-4'>Brands</h2>
            <div className='flex gap-3'>
                <input
                    type="text"
                    placeholder='Add Brand'
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    className='border border-gray-300 rounded-md p-2 w-full focus:outline-none shadow-md  text-gray-400'
                />
                <button onClick={handleAddBrand} className='bg-blue-400 text-white rounded-md p-2'>Add</button>
            </div>
            <table className='min-w-full bg-white rounded-md p-2 w-full mt-5'>
                <thead>
                    <tr className='bg-blue-200 text-blue-800'>
                        <th>Brand Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {brands.length > 0 ? (
                        brands.map((brand) => (
                            <tr key={brand.id} className='border-t'>
                                <td className='border py-2 px-4'>{brand.name}</td>
                                <td className='py-2 px-4 border text-center'>
                                    <button onClick={() => handleDeleteBrand(brand.id)}><IoClose size={30} className='text-red-600' /></button>
                                </td>
                            </tr>
                        ))
                    ) : (<tr>
                        <td>No Brand Found</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default Brands