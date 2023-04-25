import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function CategoriesCard({ id, name, description, imageUrl }) {

  const navigate = useNavigate()

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 345, boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', borderRadius: '10px' }}>
      <CardMedia
        component="img"
        height="140"
        width="100%"
        image={imageUrl}
        alt="LOADING"
        sx={{ borderRadius: '10px 10px 0 0' }}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', p: 2 }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
          {description}
        </Typography>
        <Button onClick={() => navigate(`/books/category/${id}`)} variant="contained" sx={{ borderRadius: '20px', backgroundColor: '#038587', color: '#fff', fontWeight: 'bold' }}>
          View Books
        </Button>
      </CardContent>
    </Card>

  );
}