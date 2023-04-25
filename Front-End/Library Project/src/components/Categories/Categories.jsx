import React, { useEffect, useState } from 'react'
import { url } from '../../utils.json'
import axios from 'axios'
import CategoriesCard from './CategoriesCard'
import './categories.css'

const Categories = () => {

    const [categories, setCategories] = useState()

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = async () => {
        try {
            const response = await axios.get(`${url}/categories/random`);
            setCategories(response.data)
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1 className='categoryTitle'>Discover new book categories</h1>
            <div className='categories'>
                {categories?.map((category) => <CategoriesCard key={category?.id} id={category?.id} name={category?.name} description={category?.description} imageUrl={category?.imageUrl} />)}
            </div>
        </div>
    )
}

export default Categories