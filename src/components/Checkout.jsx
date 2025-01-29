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
        <div className='my-10 mx-auto shadow-md bg-zinc-100 w-[500px] h-[500px] p-5 rounded-md overflow-scroll '>
            <h2 className='text-4xl text-blue-600'>Checkout</h2>
            {checkoutProducts.length > 0 ? (
                <div className='my-4 text-zinc-800'>
                    {checkoutProducts.map((product) => (
                        <div key={product.id}>
                            <div className='flex gap-2 my-4 p-2'>
                                <h2 className='text-xl'>{product.name}</h2>
                                <p className='text-xl'>{product.price} ₺</p>
                                <div className='flex items-center justify-center'>
                                    <IoClose size="20px" />
                                    <span className='text-xl'>{product.quantity}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (<p className='text-2xl'>Empty</p>)}
            <p className='text-2xl bg-white'>Total : {totalPrice.toFixed(2)} ₺</p>
            <button onClick={handleCompleteSale} className='bg-green-500 text-white w-full h-10 rounded-sm text-2xl mt-10'>Sale</button>
        </div>
    )
}

export default Checkout