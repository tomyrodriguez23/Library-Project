import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Grid, Button, Box, Avatar, Typography, Link, ThemeProvider, CssBaseline, createTheme, Container, } from '@mui/material';
import HeaderLogged from '../../../components/Header/HeaderLogged';
import Footer from '../../../components/Footer/Footer';
import CategoryIcon from '@mui/icons-material/Category';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useGlobalStates } from '../../../context/GlobalContext';
import { url } from '../../../utils.json'
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {

    const theme = createTheme();
    const { user } = useGlobalStates()
    const navigate = useNavigate()


    const handleSubmit = async (values) => {
        const data = {
            name: values.name,
            description: values.description,
            imageUrl: values.imageUrl
        }
        await axios.post(`${url}/categories`, data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user?.token}`
            }
        })
            .then(response => {
                success()
            })
            .catch(error => {
                if (error.response?.status === 404) {
                    userNotFound()
                }
                if (error.response?.status === 401) {
                    userNotAuthorized()
                }
                if (error.response?.status === 400) {
                    userWrongCredentials()
                } else {
                    console.log(error);
                }
            })
    };

    const success = () => {
        Swal.fire({
            title: `Category`,
            text: `Succesfully created`,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/')
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

    const handleClick = () => {
        navigate('/admin/book')
    }

    return (
        <>
            <HeaderLogged />
            <ThemeProvider theme={theme}>
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
                        <Avatar sx={{ m: 1, bgcolor: '#038587', marginTop: 5 }}>
                            <CategoryIcon />
                        </Avatar>
                        <Typography sx={{ marginBottom: 3 }} component="h1" variant="h5">
                            Create Category
                        </Typography>
                        <Formik
                            initialValues={{
                                name: "",
                                description: "",
                                imageUrl: "",
                            }}
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
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
                                        sx={{ mt: 3 }}
                                    >
                                        Create Category
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Container>
            </ThemeProvider >
            <Footer />
        </>
    )
}

export default AddCategory;