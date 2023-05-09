import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Grid, Button, Container, CssBaseline, Box, Avatar, Typography } from '@mui/material';
import { url } from '../../../utils.json'
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HeaderLogged from '../../../components/Header/HeaderLogged';
import Footer from '../../../components/Footer/Footer';
import CategoryIcon from '@mui/icons-material/Category';
import { useGlobalStates } from '../../../context/GlobalContext';
import Swal from 'sweetalert2';


const UpdateCategory = () => {

  const [category, setCategory] = useState();
  const { id } = useParams()
  const { user } = useGlobalStates()
  const navigate = useNavigate()

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const response = await axios.get(`${url}/categories/${id}`);
      setCategory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (values) => {
    const data = {
      id: id,
      name: values.name,
      description: values.description,
      imageUrl: values.imageUrl
    }
    await axios.put(`${url}/categories`, data, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${user?.token}`
      }
    })
      .then(response => success())
      .catch(error => badRequest())

  };

  if (!category) {
    return <div>Loading...</div>;
  }

  const success = () => {
    Swal.fire({
      title: `Successfully updated`,
      text: `Confirm`,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/')
      }
    })
  }

  const badRequest = () => {
    Swal.fire({
      title: `Wrong information`,
      text: `Please check`,
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/signup')
      }
    })
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Required')
      .max(20, "The Book Name cant have 20+ characters"),
    description: Yup.string()
      .required('Required')
      .max(200, "The Description cant have 200+ characters")
      .min(100, 'The Description must be at least 100 characters'),
    imageUrl: Yup.string()
      .required('Required')
      .url('Invalid image URL')
  });

  return (
    <>
      <HeaderLogged />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#038587' }}>
            <CategoryIcon />
          </Avatar>
          <Typography sx={{ marginBottom: 3 }} component="h1" variant="h5">
            Update Category
          </Typography>
          <Formik
            initialValues={{
              name: category?.name,
              description: category?.description,
              imageUrl: category?.imageUrl,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ errors, touched }) => (
              <Form noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      autoComplete="off"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      autoFocus
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      autoComplete="off"
                      name="description"
                      required
                      fullWidth
                      id="description"
                      label="Description"
                      error={touched.description && Boolean(errors.description)}
                      helperText={touched.description && errors.description}
                      multiline
                      rows={3}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      autoComplete="off"
                      name="imageUrl"
                      required
                      fullWidth
                      id="imageUrl"
                      label="Image URL"
                      error={touched.imageUrl && Boolean(errors.imageUrl)}
                      helperText={touched.imageUrl && errors.imageUrl}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Update Category
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default UpdateCategory;