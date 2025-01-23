import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Sales() {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/sales')
            .then((response) => setSales(response.data))
            .catch((err) => console.error(err))
    })
  return (
    <div>
        <h3>Daily Sales</h3>
        <ul>
            {sales?.map((sale, index) => {
                <li key={index}>
                    <span>Date: {new Date(sale.date).toLocaleString()}</span>
                    <ul>
                        {sale.products.map((product) => (
                            <li key={product.id}>
                                {product.name} - ${product.price} x {product.quantity}
                            </li>
                        ))}
                    </ul>
                </li>
            })}
        </ul>
    </div>
  )
}

export default Sales