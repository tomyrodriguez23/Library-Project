import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import axios from 'axios';
import { url } from '../../utils.json'
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import { useGlobalStates } from '../../context/GlobalContext';

export default function AllOrdersCard({ id, bookName, authorName, imageUrl, issuedDate, returnDate, activeOrder }) {

  const navigate = useNavigate()
  const {user} = useGlobalStates()

  const handleReturn = async () => {
    try {
      await axios.put(`${url}/orders/${id}`, null, {
        headers: {
          "Authorization": `Bearer ${user?.token}`
        }
      })
      success()
    }
    catch (error) {
      console.log(error);
    }
  }

  const success = () => {
    Swal.fire({
      title: `${bookName}`,
      text: "Succesfully Returned",
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/')
      }
    })

  }

  return (

    activeOrder ?

      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: '#1976D2' }} aria-label="recipe">
              {id}
            </Avatar>
          }
          title={
            <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
              {bookName}
            </Typography>
          }
          subheader={
            <Typography variant="subtitle2" color="text.secondary" component="div" sx={{ color: '#666' }}>
              <span style={{ fontWeight: 'bold' }}>Author: </span>{authorName}
            </Typography>
          }
          sx={{ textAlign: 'center' }}
        />
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt="Book Image"
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
            Issued: {issuedDate}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', mt: 1 }}>
            Return: {returnDate}
          </Typography>
          <Button onClick={() => handleReturn()} variant='contained' sx={{ borderRadius: '20px', backgroundColor: '#038587', color: '#fff', fontWeight: 'bold', mt: 2 }}>
            Return<KeyboardReturnIcon sx={{ marginLeft: '10px' }} />
          </Button>
        </CardContent>
      </Card>

      :
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: '#1976D2' }} aria-label="recipe">
              {id}
            </Avatar>
          }
          title={
            <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
              {bookName}
            </Typography>
          }
          subheader={
            <Typography variant="subtitle2" color="text.secondary" component="div" sx={{ color: '#666' }}>
              <span style={{ fontWeight: 'bold' }}>Author: </span>{authorName}
            </Typography>
          }
          sx={{ textAlign: 'center' }}
        />
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt="Book Image"
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
            Issued: {issuedDate}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', mt: 1 }}>
            Return: {returnDate}
          </Typography>
          <Button onClick={() => handleReturn()} variant='contained' disabled sx={{ borderRadius: '20px', backgroundColor: '#038587', color: '#fff', fontWeight: 'bold', mt: 2 }}>Returned <CheckIcon /> </Button>
        </CardContent>
      </Card>


  );
}