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


    return (
        <div className='container mx-auto text-white'>
            <h3 className='text-3xl my-5'>Daily Sales</h3>
            <div>
                {sales.length > 0 ? (
                    sales.map((sale, index) => (
                        <div key={index} className='my-10 bg-slate-900 p-3'>
                            <p>Date: {sale.date}</p>
                            <ul>
                                {sale.products.map((product, i) => (
                                    <li key={i}>
                                        {product.name} x {product.quantity} - {product.price} TL
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (<p>No sales found</p>)}

            </div>
        </div >
    )
}

export default Sales