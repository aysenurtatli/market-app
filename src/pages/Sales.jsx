import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

function Sales() {

    const [sales, setSales] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:3000/sales")
            .then((response) => {
                console.log("Sales Data:", response.data);
                setSales(response.data);
            })
            .catch((err) => console.error("Error fetching sales:", err));

    }, []);

    const groupedSales = sales.reduce((acc, sale) => {
        const date = new Date(sale.date).toLocaleDateString();

        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(sale);
        return acc;
    }, {})

    const dailyTotals = Object.keys(groupedSales).map((date) => {
        const dailySales = groupedSales[date];

        const dailyTotal = dailySales.reduce((dailyAcc, sale) => {
            const totalForSale = sale.products.reduce((productAcc, product) => {
                const price = parseFloat(product.price) || 0;
                return productAcc + (price * product.quantity);
            }, 0);
            return dailyAcc + totalForSale;
        }, 0);

        return { date, total: dailyTotal };
    });


    const totalSales = dailyTotals.reduce((acc, daily) => acc + daily.total, 0);

    return (
        <div className='container mx-auto'>
            <h3 className='text-3xl my-5'>Daily Sales</h3>
            <div>
                {dailyTotals.length > 0 ? (
                    dailyTotals.map((daily, index) => (
                        <div key={index} className='my-10 bg-zinc-100 p-3'>
                            <p className='text-2xl font-semibold'>Date: {daily.date}</p>
                            {groupedSales[daily.date].map((sale, saleIndex) => {
                                // Toplam fiyat hesaplama
                                const totalPrice = sale.products.reduce((acc, product) => {
                                    const price = parseFloat(product.price) || 0;
                                    return acc + (price * product.quantity);
                                }, 0);

                                return (
                                    <div key={saleIndex} className='my-5'>
                                        <ul>
                                            {sale.products.map((product, i) => (
                                                <li key={i}>
                                                    {product.name} x {product.quantity} - {product.price} TL
                                                </li>
                                            ))}
                                        </ul>
                                        <p>Total Price: {totalPrice.toFixed(2)} TL</p>
                                    </div>
                                );
                            })}
                            <p className='font-semibold'>Daily Total: {daily.total.toFixed(2)} TL</p>
                        </div>
                    ))
                ) : (
                    <p>No sales found</p>
                )}
            </div>

            <div className="my-5 text-2xl">
                <p><strong>Total Sales of All Days: {totalSales.toFixed(2)} TL</strong></p>
            </div>
        </div>
    )
}

export default Sales