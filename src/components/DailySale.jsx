import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { ImMenu4 } from "react-icons/im";
function DailySale({ sales }) {

    const [isOpen, setIsOpen] = useState(false);



    const groupedSales = [];
    for (const sale of sales) {
        const date = new Date(sale.date).toLocaleDateString();
        const findDate = groupedSales.find((d) => d === date)
        if (!findDate) {
            groupedSales.push(date)
        }
    }

    const dailySales = {};

    for (const date in groupedSales) {
        const dailySale = groupedSales[date]
        const findSale = sales.filter((s) => {
            const findDate = new Date(s.date).toLocaleDateString();
            return dailySale === findDate;
        })

        if (findSale) {
            dailySales[dailySale] = findSale
        }
    }

    const dailyTotal = {};

    for (const date in dailySales) {
        const salesArray = dailySales[date]
        let total = 0;
        for (const sale of salesArray) {
            for (const product of sale.products) {
                total += parseFloat(product.price) * parseInt(product.quantity);
            }
        }
        dailyTotal[date] = total;
    }

    let allTotal = 0;

    Object.values(dailySales).forEach((salesArray) => {
        salesArray.forEach((sale) => {
            sale.products.forEach((product) => {
                allTotal += parseFloat(product.price) * product.quantity;
            });
        });
    });

    const products = [];

    for (const date in dailySales) {

        for (const sale of dailySales[date]) {

            for (const product of sale.products) {
                const sameProduct = products.find((p) => p.id === product.id)
                if (!sameProduct) {
                    products.push({
                        id: product.id,
                        name: product.name,
                        price: parseFloat(product.price),
                        quantity: parseInt(product.quantity)
                    })
                } else {
                    sameProduct.quantity += parseInt(product.quantity)
                }
            }
        }
    }

    const sortedProducts = products.sort((a, b) => b.quantity - a.quantity)
    const top5Products = sortedProducts.slice(0, 5)
    console.log(sortedProducts)

    return (
        <div>
            <div className='w-[500px] max-w-full'>
                <div className='flex items-center gap-5 bg-blue-700 rounded-sm p-3 my-4 justify-between'>
                    <h2 className='font-bold text-xl text-white'>Most Saled Products</h2>
                    <button className='inline-flex' onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <IoIosArrowUp size={30} className='text-white' /> : <IoIosArrowDown size={30} className='text-white' />}
                    </button>
                </div>
                <table className={`${isOpen ? 'block' : 'hidden'}  table-auto bg-white rounded-sm my-4 p-3`}>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {top5Products.map((product) => (
                            <tr key={product.id} className='border-t border-zinc-300'>
                                <td className='px-4 py-2'>{product.name}</td>
                                <td className='px-4 py-2'>{product.price} TL</td>
                                <td className='px-4 py-2'>{product.quantity} Pieces</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <h2 className='font-bold text-2xl text-blue-700 '>Total: {allTotal} TL</h2>
            {
                Object.entries(dailySales).map(([date, salesArray]) => (
                    <div key={date} className='border-b border-zinc-400 rounded-sm mb-5 p-3'>
                        <h3 className='font-bold'>{date}</h3>
                        <ul>
                            {salesArray.map((sale) => (
                                <li key={sale.id}>
                                    <ul className='text-gray-700'>
                                        {sale.products.map((product) => (
                                            <li key={product.id}>
                                                {product.name} - {product.price} x {product.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                        <p className='text-xl font-bold text-blue-700'>Daily Total: {dailyTotal[date]} TL</p>
                    </div>
                ))
            }
        </div >
    )
}

export default DailySale