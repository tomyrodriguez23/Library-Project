import React, { useEffect, useState } from 'react'
import './recomendations.css'
import RecomendationsCard from './RecomendationsCard'
import axios from 'axios'
import { url } from '../../utils.json'

const Recomendations = () => {

    const [recomendations, setRecomendations] = useState()

    useEffect(() => {
        getRecomendations()
    }, [])

    const getRecomendations = async () => {
        try {
            const response = await axios.get(`${url}/books/random`);
            setRecomendations(response.data)
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1 className='recommendationTitle'>Recommendations</h1>
            <div className='recomendations'>
                {recomendations?.map((rec) => <RecomendationsCard key={rec?.id} id={rec?.id} bookName={rec?.bookName} authorName={rec?.authorName} pages={rec?.pages}
                    imageUrl={rec?.imageUrl} categoryName={rec?.category.name}
                />)}
            </div>
        </div>
    )
}

export default Recomendations