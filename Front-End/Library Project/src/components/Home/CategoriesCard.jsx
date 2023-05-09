import * as React from 'react';
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


export default function CategoriesCard({ id, name, description, imageUrl, onDeleteCategory, userRoles }) {

  const navigate = useNavigate();

  const handleDelete = () => {
    Swal.fire({
      title: `Are you sure you want to delete ${name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteCategory();
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


        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item md={6} sx={{ textAlign: 'center' }}>
            <Button onClick={() => navigate(`/books/category/${id}`)} variant="contained" sx={{ borderRadius: '20px', backgroundColor: '#038587', color: '#fff', fontWeight: 'bold' }}>
              View Books
            </Button>
          </Grid>


          {
            userRoles?.map((rol) => (
              rol?.name === "ROLE_ADMIN" || rol?.name === "ROLE_MOD" ?
                <Grid key={rol.id} justifyContent="center" display="flex" alignContent="center" >
                  <Grid item sx={{ padding: 0 }}>
                    <IconButton
                      size="large"
                      color="primary"
                      onClick={() => navigate(`/admin/category/${id}/update`)}
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

                :
                null
            ))
          }

        </Grid>
      </CardContent>
    </Card>
  );
}