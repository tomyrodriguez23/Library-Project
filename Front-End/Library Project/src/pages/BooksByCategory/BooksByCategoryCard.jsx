import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2';

export default function BooksByCategoryCard({ idBook, bookName, authorName, imageUrl, categoryName, userRoles, onDeleteBook, categoryId }) {

    const navigate = useNavigate();

    const handleDelete = () => {
        Swal.fire({
            title: `Are you sure you want to delete ${bookName}?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                onDeleteBook();
                success();
            }
        });
    };

    const success = () => {
        Swal.fire({
            title: `Successfully Deleted`,
            text: `Confirm`,
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
        });
    };

    return (
        <Card sx={{
            display: 'flex', maxHeight: 220, maxWidth: 500, height: '100%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', borderRadius: '10px',
            '@media (max-width: 960px)': { maxHeight: 380, maxWidth: 800 }
        }}>
            <CardMedia
                component="img"
                sx={{ width: '50%', height: '100%' }}
                image={imageUrl}
                alt={bookName}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', ml: 2, textAlign: 'center' }}>
                <CardContent sx={{ flex: '1 0 auto', mb: 0 }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {bookName}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" component="div" sx={{ mb: 1, color: '#666' }}>
                        <span style={{ fontWeight: 'bold' }}>Author: </span>{authorName}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" component="div" sx={{ color: '#666' }}>
                        <span style={{ fontWeight: 'bold' }}>Category: </span>{categoryName.toUpperCase()}
                    </Typography>
                </CardContent>

                {
                    userRoles?.map((rol) => (
                        rol.name === "ROLE_ADMIN" || rol.name === "ROLE_MOD" ?
                            <Box key={rol.id}>
                                <Box sx={{ p: 1 }}>
                                    <Button onClick={() => navigate(`/books/category/${categoryId}/book/${idBook}`)} variant="contained" sx={{ borderRadius: '20px', backgroundColor: '#038587', color: '#fff', fontWeight: 'bold' }}>View Details</Button>
                                </Box>

                                <Grid container spacing={2} justifyContent="center">
                                    <Grid item sx={{ padding: 0 }}>
                                        <IconButton
                                            size="large"
                                            color="primary"
                                            onClick={() => navigate(`/admin/book/${idBook}/update`)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item sx={{ padding: 0 }}>
                                        <IconButton
                                            size="large"
                                            color="error"
                                            onClick={handleDelete}
                                        >
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </Grid>

                                </Grid>

                            </Box>
                            :
                            <Box key={rol.id} sx={{ p: 1 }}>
                                <Button onClick={() => navigate(`/books/category/${categoryId}/book/${idBook}`)} variant="contained" sx={{ borderRadius: '20px', backgroundColor: '#038587', color: '#fff', fontWeight: 'bold' }}>View Details</Button>
                            </Box>
                    ))
                }

            </Box>
        </Card>

    );
}