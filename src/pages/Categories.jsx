import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCategoryAsync, fetchCategoriesAsync, updateCategoryAsync } from '../redux/app/features/categoriesThunk';
import { IoClose } from 'react-icons/io5';

function Categories() {

    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.categories)
    const [newCategory, setNewCategory] = useState("");
    const [kdv, setKdv] = useState("")
    const [editMode, setEditMode] = useState(false);
    const [editCategory, setEditCategory] = useState(null);
    const [editKdv, setEditKdv] = useState("");

    useEffect(() => {
        dispatch(fetchCategoriesAsync())
    }, [dispatch])

    const handleAddCategory = () => {
        if (newCategory.trim() === "") return;
        dispatch(addCategoryAsync({ name: newCategory, kdv: kdv }));
        setNewCategory("")
    }

    const handleEditClick = (category) => {
        setEditCategory(category);
        setEditKdv(category.kdv);
        setEditMode(true);
    }

    const handleUpdateCategory = () => {
        dispatch(updateCategoryAsync({ ...editCategory, kdv: editKdv }));
        setEditMode(false);
        setEditCategory(null);
        setEditKdv("");
    }
    return (
        <div className='container mx-auto'>
            <h2 className='text-2xl mb-4'>Categories</h2>
            <div className='flex gap-3'>
                <input
                    type="text"
                    placeholder='Add Category'
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className='border border-gray-300 rounded-md p-2 w-full focus:outline-none shadow-md  text-gray-400'
                />
                <input
                    type="number"
                    placeholder='Kdv'
                    value={kdv}
                    onChange={(e) => setKdv(e.target.value)}
                    className='border border-gray-300 rounded-md p-2 w-full focus:outline-none shadow-md  text-gray-400'
                />
                <button onClick={handleAddCategory} className='bg-blue-400 text-white rounded-md p-2'>Add</button>
            </div>
            <table className='min-w-full bg-white rounded-md p-2 w-full mt-5'>
                <thead>
                    <tr className='bg-blue-200 text-blue-800'>
                        <th>Category</th>
                        <th>KDV</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <tr key={category.id} className='border-t'>
                                <td className='border py-2 px-4'>{category.name}</td>
                                <td className='border py-2 px-4'>%{category.kdv}</td>
                                <td className='border py-2 px-4'>
                                    <button onClick={() => handleEditClick(category)} className='bg-blue-400 w-full text-white p-1 rounded'>Edit</button>
                                </td>
                            </tr>
                        ))
                    ) : (<tr>
                        <td>No Category Found</td>
                    </tr>)}
                </tbody>
            </table>
            {editMode && (
                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
                    <div className='bg-white p-6 rounded-md shadow-lg w-[300px]'>
                        <h3 className='text-lg font-semibold mb-4'>Edit KDV</h3>
                        <input
                            type="number"
                            value={editKdv}
                            onChange={(e) => setEditKdv(e.target.value)}
                            className='border border-gray-300 rounded-md p-2 w-full focus:outline-none shadow-md text-gray-800'
                        />
                        <div className='flex justify-between mt-4'>
                            <button onClick={handleUpdateCategory} className='bg-green-500 text-white p-2 rounded-md w-1/2'>Save</button>
                            <button onClick={() => setEditMode(false)} className='bg-red-500 text-white p-2 rounded-md w-1/2 ml-2'>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Categories