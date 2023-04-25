import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AllBooksCard({ id, bookName, authorName, pages, imageUrl, categoryName }) {

    const navigate = useNavigate()

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
                        <span style={{ fontWeight: 'bold' }}>Category: </span>{categoryName.toUpperCase()}
                    </Typography>
                </CardContent>
                <Box sx={{ p: 1 }}>
                    <Button onClick={() => navigate(`/books/${id}`)} variant="contained" sx={{ borderRadius: '20px', backgroundColor: '#038587', color: '#fff', fontWeight: 'bold' }}>View Details</Button>
                </Box>
            </Box>
        </Card>


    );
}