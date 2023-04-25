import React from 'react'
import { Box, Button, Card, CardMedia, Typography } from '@mui/material'
import CardContent from '@mui/material/CardContent';
import { useNavigate, useParams } from 'react-router-dom';

const BooksByCategoryCards = ({ bookName, authorName, imageUrl, category, idBook }) => {

    const navigate = useNavigate()
    const { id } = useParams()

    return (
        <Card sx={{ display: 'flex', height: 200 }}>
            <CardMedia
                component="img"
                sx={{ width: '50%', height: '100%' }}
                image={imageUrl}
                alt={bookName}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', ml: 2 }}>
                <CardContent sx={{ flex: '1 0 auto', mb: 0 }}>
                    <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', mb: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {bookName}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" component="div" sx={{ mb: 1, color: '#666' }}>
                        <span style={{ fontWeight: 'bold' }}>Author: </span>{authorName}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" component="div" sx={{ color: '#666' }}>
                        <span style={{ fontWeight: 'bold' }}>Category: </span>{category.toUpperCase()}
                    </Typography>
                </CardContent>
                <Box sx={{ p: 1 }}>
                    <Button onClick={() => navigate(`/books/category/${id}/book/${idBook}`)} variant="contained" sx={{ borderRadius: '20px', backgroundColor: '#038587', color: '#fff', fontWeight: 'bold' }}>View Details</Button>
                </Box>
            </Box>
        </Card>

    )
}

export default BooksByCategoryCards