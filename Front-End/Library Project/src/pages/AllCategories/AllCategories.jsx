import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { url } from "../../utils.json"
import './categories.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { Pagination } from '@mui/material'
import HeaderLogged from '../../components/Header/HeaderLogged'
import { useGlobalStates } from '../../context/GlobalContext'
import CategoriesCard from '../../components/Home/CategoriesCard'

const AllCategories = () => {

    const [categories, setCategories] = useState([])
    const [page, setPage] = useState()
    const [size, setSize] = useState()
    const [totalPages, setTotalPages] = useState()
    const { isLogged } = useGlobalStates()
    const {user} = useGlobalStates()

    useEffect(() => {
        getFirstCategories()
    }, [])

    useEffect(() => {
        getCategories()
    }, [page])

    const getFirstCategories = async () => {
        try {
            const response = await axios.get(`${url}/categories/pages`);
            setCategories(response.data.content)
            setPage(response.data.number)
            setSize(response.data.size)
            setTotalPages(response.data.totalPages)
        }
        catch (error) {
            console.log(error);
        }
    }

    const getCategories = async () => {
        try {
            const response = await axios.get(`${url}/categories/pages?page=${page}&size=${size}`);
            setCategories(response.data.content)
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e, p) => {
        setPage(p - 1)
    }

    return (
        <div>
            {isLogged ? <HeaderLogged /> : <Header />}
            <div>
                <h1 className='categoryTitle'>Our categories!
                </h1>
                <div className='categories-section'>
                    {categories?.map((category) => <CategoriesCard key={category?.id} id={category?.id} userRoles={user?.roles} name={category?.name} description={category?.description} imageUrl={category?.imageUrl} />)}
                    <Pagination count={totalPages} onChange={handleChange} color="primary" />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AllCategories

