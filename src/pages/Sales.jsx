import React, { useEffect, useState } from 'react'
import DailySale from '../components/DailySale'
import axios from 'axios';
function Sales() {

    const [sales, setSales] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/sales")
            .then((response) => {
                setSales(response.data);
            })
            .catch((err) => console.error("Error fetching sales:", err));
    }, []);


    return (
        <div className='container mx-auto'>
            <h3 className='text-3xl my-5'>Daily Sales</h3>
            <DailySale sales={sales}></DailySale>
        </div>
    )
}

export default Sales