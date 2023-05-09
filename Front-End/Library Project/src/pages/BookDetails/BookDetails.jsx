import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { url } from '../../utils.json'
import axios from 'axios'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import Swal from "sweetalert2";
import HeaderLogged from '../../components/Header/HeaderLogged'
import { useGlobalStates } from '../../context/GlobalContext'

export default function BookDetails() {

  const [book, setBook] = useState()
  const [expanded, setExpanded] = React.useState(false);
  const { id } = useParams()
  const navigate = useNavigate()
  const { isLogged, user } = useGlobalStates()


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
      member: { id: user?.id }
    }
    try {
      await axios.post(`${url}/orders`, data, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${user?.token}`
        }
      });
      success()
    }
    catch (error) {
      console.log(error);
    }
  }

  const success = () => {
    Swal.fire({
      title: `${book?.bookName}`,
      text: "PDF Succesfully sent",
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
      {isLogged ? <HeaderLogged /> : <Header />}
      <Grid
        container
        justifyContent="center"
        sx={{
          marginTop: "70px",
          "@media (max-width: 900px)": {
            marginTop: "0px",
            marginBottom: "50px"
          },
        }}
      >
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Card
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: { xs: "100%", md: "40%" } }}
              image={book?.imageUrl}
              alt={book?.bookName}
            />
            <CardContent sx={{ flex: "1", display: "flex", flexDirection: "column" }}>
              <Typography
                gutterBottom
                variant="h4"
                component="h2"
                sx={{ color: "#038587", mb: 2 }}
              >
                {book?.bookName}
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                sx={{ color: "#038587", mb: 1 }}
              >
                Author
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {book?.authorName}
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                sx={{ color: "#038587", mb: 1 }}
              >
                Pages
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {book?.pages}
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                sx={{ color: "#038587", mb: 1 }}
              >
                Category
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {book?.category.name}
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                sx={{ color: "#038587", mb: 1 }}
              >
                Description
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {book?.description}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!book?.available}
                  onClick={makeOrder}
                  sx={{
                    borderRadius: "20px",
                    backgroundColor: "#038587",
                    color: "#fff",
                    fontWeight: "bold",
                    textAlign: "center",
                    "@media (max-width: 600px)": {
                      fontSize: "12px",
                    },
                  }}
                >
                  Order Book
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}


