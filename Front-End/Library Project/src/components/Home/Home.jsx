import React, { useEffect, useRef, useState } from 'react'
import { url } from '../../utils.json'
import axios from 'axios'
import './home.css'
import CategoriesCard from './CategoriesCard'
import BooksCard from './BooksCard'
import { useGlobalStates } from '../../context/GlobalContext';
import Swal from 'sweetalert2'

import {
    AppBar,
    Toolbar,
    Typography,
    TextField,
    Button,
    CssBaseline,
    Container,
    Grid,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
} from "@mui/material";

const Home = () => {

    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([])
    const [bookName, setBookName] = useState('');
    const bestRecommendationsRef = useRef(null);
    const { user } = useGlobalStates()

    useEffect(() => {
        getCategories();
        getBooks()
    }, []);

    useEffect(() => {

    }, [bookName]);

    const getCategories = async () => {
        try {
            const response = await axios.get(`${url}/categories/random`);
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getBooks = async () => {
        try {
            const response = await axios.get(`${url}/books/random`);
            setBooks(response.data)
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.get(`${url}/books/name/${bookName}/pages`);
            console.log(response);
            setBooks(response.data.content);
            const element = bestRecommendationsRef.current;
            window.scrollTo({
                top: element.offsetTop,
                behavior: "smooth"
            });
        } catch (error) {
            booksNotFound()
        }
    };


    const handleInputChange = (event) => {
        setBookName(event.target.value);
    };

    const onDeleteCategory = async (categoryId) => {
        axios.delete(`${url}/categories/${categoryId}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user?.token}`
            }
        })
            .then((response) => {
                setCategories(categories.filter((category) => category.id !== categoryId));
                setBooks(books.filter((book) => !book.category || book.category.id !== categoryId));
            })
            .catch(error => console.log(error))
    }

    const onDeleteBook = async (bookId) => {
        axios.delete(`${url}/books/${bookId}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user?.token}`
            }
        })
            .then((response) => {
                setBooks(books.filter((book) => book.id !== bookId));
            })
            .catch(error => console.log(error))
    }

    const booksNotFound = () => {
        Swal.fire({
            title: `No books found`,
            text: `Sorry`,
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            timer: 1500
        })
    }

    return (
        <div>
            <div className='categories-wrapper'>
                <h1 className='title'>Discover new books</h1>
                <div className='search-bar'>
                    <input
                        type='text'
                        className='search-input'
                        placeholder='Enter a Book Name'
                        onChange={handleInputChange}
                    />
                    <button className='search-button' onClick={handleSubmit}>
                        Search
                    </button>
                </div>

                <div className='categories-section'>
                    {categories?.map((category) => (
                        <CategoriesCard
                            userRoles={user?.roles}
                            key={category?.id}
                            id={category?.id}
                            name={category?.name}
                            description={category?.description}
                            imageUrl={category?.imageUrl}
                            onDeleteCategory={() => onDeleteCategory(category.id)}
                        />
                    ))}
                </div>

            </div>

            <div ref={bestRecommendationsRef} className='books-wrapper'>
                <h1 className='title'>Our best recommendations</h1>
                <div className='books-section'>
                    {books?.map((book) =>
                        <BooksCard
                            userRoles={user?.roles}
                            key={book?.id}
                            id={book?.id}
                            bookName={book?.bookName}
                            authorName={book?.authorName}
                            pages={book?.pages}
                            imageUrl={book?.imageUrl}
                            categoryName={book?.category.name}
                            onDeleteBook={() => onDeleteBook(book.id)}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home


