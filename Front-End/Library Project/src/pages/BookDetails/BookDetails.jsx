import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { url } from '../../utils.json'
import axios from 'axios'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import Swal from "sweetalert2";

export default function BookDetails() {

  const [book, setBook] = useState()
  const [expanded, setExpanded] = React.useState(false);
  const { id } = useParams()
  const navigate = useNavigate()

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    getDetails()
  }, [])

  const getDetails = async () => {
    try {
      const response = await axios.get(`${url}/books/${id}`);
      setBook(response.data)
    }
    catch (error) {
      console.log(error);
    }
  }

  const makeOrder = async () => {
    const data = {
      book: { id: `${id}` },
      member: { id: '1' }
    }
    try {
      await axios.post(`${url}/orders`, data);
      success()
    }
    catch (error) {
      console.log(error);
    }
  }

  const success = () => {
    Swal.fire({
      title: `${book?.bookName}`,
      text: "Succesfully ordered",
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/orders')
      }
    })

  }


  return (
    <div>
      <Header />
      <Grid>
        <Grid item xs={6}>
          <Card style={{ backgroundColor: 'whitesmoke', maxWidth: "%70", margin: '0 auto', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Grid container>
              <Grid item xs={6}>
                <CardMedia
                  style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                  image={book?.imageUrl}
                  title={book?.bookName}
                />
              </Grid>
              <Grid item xs={6} style={{ padding: '16px' }}>
                <Typography gutterBottom variant="h4" component="h2" style={{ color: '#038587', marginBottom: 16, textAlign: 'center' }}>
                  {book?.bookName}
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p" style={{ color: '#038587', marginBottom: 8 }}>
                  Author
                </Typography>
                <Typography variant="body1" component="p" style={{ marginBottom: 16 }}>
                  {book?.authorName}
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p" style={{ color: '#038587', marginBottom: 8 }}>
                  Pages
                </Typography>
                <Typography variant="body1" component="p" style={{ marginBottom: 16 }}>
                  {book?.pages}
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p" style={{ color: '#038587', marginBottom: 8 }}>
                  Category
                </Typography>
                <Typography variant="body1" component="p" style={{ marginBottom: 16 }}>
                  {book?.category.name}
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p" style={{ color: '#038587', marginBottom: 8 }}>
                  Description
                </Typography>

                <Typography variant="body1" component="p" >
                  A book description is a short summary of a book's story or content that is designed to “hook” a reader and lead to a sale. Typically, the book's description conveys important information about its topic or focus in nonfiction or the plot and tone for a novel or any other piece of fiction.
                </Typography>
                <CardActions style={{ justifyContent: 'center', marginTop: 'auto' }}>
                  {book?.available ?
                    <Button onClick={() => makeOrder()} size="large" color="primary" variant="contained" sx={{ borderRadius: '20px', backgroundColor: '#038587', color: '#fff', fontWeight: 'bold' }} style={{ backgroundColor: '#038587' }}>Order Book</Button>
                    :
                    <Button onClick={() => makeOrder()} size="large" variant="contained" sx={{ borderRadius: '20px' }} disabled> Order Book</Button>
                  }
                </CardActions>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}


