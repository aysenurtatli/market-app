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
        <div className='border bg-white my-10 shadow-md p-5 rounded-md '>
            <h2 className='text-4xl text-blue-600 mb-4'>Checkout</h2>
            <div className='h-auto overflow-auto max-h-80'>
                {checkoutProducts.length > 0 ? (
                    <table className='w-full'>
                        <thead>
                            <tr className='bg-blue-100 text-blue-700 font-bold'>
                                <td className='p-2'>Product Name</td>
                                <td className='p-2'>Price</td>
                                <td className='p-2'>Quantity</td>
                                <td className='p-2'></td>
                            </tr>
                        </thead>
                        <tbody className='overflow-scroll'>
                            {checkoutProducts.map((product) => (
                                <tr key={product.id}>
                                    <td className='text-xl border py-2 px-4'>{product.name}</td>
                                    <td className='text-xl border  py-2 px-4'>{product.price} ₺</td>
                                    <td className='text-xl border py-2 px-4'>{product.quantity}</td>
                                    <td className='border py-2 px-4 text-center'><IoClose size="20px" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (<p className='text-2xl'>Empty</p>)}
            </div>
            <p className='text-2xl bg-white mt-4'>Total : {totalPrice.toFixed(2)} ₺</p>
            <button onClick={handleCompleteSale} className='bg-green-500 text-white w-40 h-10 rounded-sm text-2xl mt-10'>Sale</button>
        </div>
    )
}

export default Checkout