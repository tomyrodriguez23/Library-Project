import React, { useEffect, useState } from 'react'
import './orders.css'
import axios from 'axios'
import { url } from '../../utils.json'
import Header from '../../components/Header/Header'
import AllOrdersCard from './AllOrdersCard'
import { Button, Pagination } from '@mui/material'
import Footer from '../../components/Footer/Footer'
import { useGlobalStates } from '../../context/GlobalContext'
import HeaderLogged from '../../components/Header/HeaderLogged'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const AllOrders = () => {

    const [orders, setOrders] = useState([])
    const [showAll, setShowAll] = useState(false);
    const { isLogged, user } = useGlobalStates()
    const navigate = useNavigate()

    const handleToggle = () => {
        setShowAll(!showAll);
    };

    useEffect(() => {
        getOrders()
    }, [])

    const getOrders = async () => {
        try {
            const response = await axios.get(`${url}/orders/member/${user?.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${user?.token}`
                }
            });
            setOrders(response.data)
        }
        catch (error) {
            noOrders()
        }
    }

    const noOrders = () => {
        Swal.fire({
            icon: 'No orders',
            title: 'Oops...',
            text: 'Something went wrong!'
        })
    }

    const activeOrders = orders.filter((order) => order.active);
    const ordersToShow = showAll ? orders : activeOrders;

    return (
        <div style={{ textAlign: 'center' }}>
            {isLogged ? <HeaderLogged /> : <Header />}
            <div style={{marginBottom:"50px"}}>
                <h1 className='ordersTitle'>My Orders</h1>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant='contained'
                        sx={{ borderRadius: '20px', backgroundColor: '#038587', color: '#fff', fontWeight: 'bold', mt: 2 }}
                        onClick={handleToggle}
                    >
                        {showAll ? 'Show actives' : 'Show All'}
                    </Button>
                </div>
                <div className='orders'>
                    {ordersToShow?.map((order) => <AllOrdersCard key={order?.id} id={order?.id} bookName={order?.book.bookName} authorName={order?.book.authorName}
                        imageUrl={order?.book?.imageUrl} category={order?.category?.name} issuedDate={order?.issuedDate} returnDate={order?.returnDate} activeOrder={order?.active} />)}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AllOrders
