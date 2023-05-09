import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {url} from "../../utils.json"
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import "./recomendations.css"
import { Pagination } from '@mui/material'
import { useGlobalStates } from '../../context/GlobalContext'
import HeaderLogged from '../../components/Header/HeaderLogged'
import BooksCard from '../../components/Home/BooksCard'

const AllBooks = () => {
    const [books, setBooks] = useState([])
    const [page, setPage] = useState()
    const [size, setSize] = useState()
    const [totalPages, setTotalPages] = useState()
    const {isLogged} = useGlobalStates()
    const {user} = useGlobalStates()

    useEffect(() => {
        getFirstBooks()
    }, [])

    useEffect(() => {
        getBooks()
    }, [page])

    const getFirstBooks = async () => {
        try {
            const response = await axios.get(`${url}/books/pages`);
            setBooks(response.data.content)
            setPage(response.data.number)
            setSize(response.data.size)
            setTotalPages(response.data.totalPages)
        }
        catch (error) {
            console.log(error);
        }
    }

    const getBooks = async () => {
        try {
            const response = await axios.get(`${url}/books/pages?page=${page}&size=${size}`);
            setBooks(response.data.content)
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e,p) => {
        setPage(p-1)
    }

    return (
        <div>
            {isLogged ? <HeaderLogged/> : <Header/>}
            <h1 className='booksTitle'>Popular Picks: Best-Selling Books</h1>
            <div className='books-section'>
                {books?.map((rec) => <BooksCard userRoles={user?.roles} key={rec?.id} id={rec?.id} bookName={rec?.bookName} authorName={rec?.authorName} pages={rec?.pages}
                    imageUrl={rec?.imageUrl} categoryName={rec?.category.name}
                />)}
                <Pagination count={totalPages} onChange={handleChange} color="primary"/>
            </div>
            <Footer/>
        </div>
    )
}

export default AllBooks