import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { url } from '../../utils.json'
import axios from 'axios'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './booksCategory.css'
import { Pagination } from '@mui/material'
import { useGlobalStates } from '../../context/GlobalContext'
import HeaderLogged from '../../components/Header/HeaderLogged'
import BooksByCategoryCard from './BooksByCategoryCard'

const BooksByCategory = () => {

    const { id } = useParams()

    const [books, setBooks] = useState([])
    const [page, setPage] = useState()
    const [size, setSize] = useState()
    const [totalPages, setTotalPages] = useState()
    const { isLogged, user } = useGlobalStates()

    useEffect(() => {
        getFirstBooks()
    }, [])

    useEffect(() => {
        getBooks()
    }, [page])

    const getFirstBooks = async () => {
        try {
            const response = await axios.get(`${url}/books/category/${id}/pages`);
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
            const response = await axios.get(`${url}/books/category/${id}/pages?page=${page}&size=${size}`);
            setBooks(response.data.content)
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
            <h1 className='booksTitle'>{books[0]?.category.name}</h1>
            <div className='books-section'>
                {books?.map((book) => (
                    <BooksByCategoryCard
                        userRoles={user?.roles}
                        key={book?.id}
                        idBook={book?.id}
                        bookName={book?.bookName}
                        authorName={book?.authorName}
                        imageUrl={book?.imageUrl}
                        categoryName={book?.category.name}
                        pages={book?.pages}
                        categoryId={book?.category.id}
                    />
                ))}
                {totalPages === 1 ? null : <Pagination count={totalPages} onChange={handleChange} color="primary" />}
            </div>
            <Footer />
        </div>
    )
}

export default BooksByCategory