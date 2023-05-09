import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Grid, Button, Box, Avatar, Typography, Link, ThemeProvider, CssBaseline, createTheme, Container, MenuItem, } from '@mui/material';
import HeaderLogged from '../../../components/Header/HeaderLogged';
import Footer from '../../../components/Footer/Footer';
import CategoryIcon from '@mui/icons-material/Category';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useGlobalStates } from '../../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { url } from "../../../utils.json"

const AddBook = () => {

    const theme = createTheme();
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const { user } = useGlobalStates()

    const handleSubmit = async (values) => {
        const data = {
            bookName: values.bookName,
            authorName: values.authorName,
            pages: values.pages,
            description: values.description,
            imageUrl: values.imageUrl,
            category: {
                id: values.category
            }
        }
        await axios.post(`${url}/books`, data, {
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
    }

    const validationSchema = Yup.object().shape({
        bookName: Yup.string()
            .required('Required')
            .max(20, "The Book Name cant have 20+ characters"),
        authorName: Yup.string()
            .max(20, "The Author Name cant have 20+ characters")
            .required('Required'),
        pages: Yup.number()
            .required('Required')
            .positive('Pages must be a positive number')
            .integer('Pages must be a whole number'),
        description: Yup.string()
            .required('Required')
            .max(200, "The Description cant have 200+ characters")
            .min(100, 'The Description must be at least 100 characters'),
        imageUrl: Yup.string()
            .required('Required')
            .url('Invalid image URL'),
        category: Yup.string()
            .required('Required'),
    });

    const handleClick = () => {
        navigate('/admin/category')
    }

    const success = () => {
        Swal.fire({
            title: `Book`,
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

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = async () => {
        try {
            const response = await axios.get(`${url}/categories`);
            setCategories(response.data)
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <HeaderLogged />
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#038587' }}>
                            <CategoryIcon />
                        </Avatar>
                        <Typography sx={{ marginBottom: 3 }} component="h1" variant="h5">
                            Create Book
                        </Typography>
                        <Formik
                            initialValues={{
                                bookName: "",
                                authorName: "",
                                pages: "",
                                imageUrl: "",
                                category: ""
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
                                                name="bookName"
                                                required
                                                fullWidth
                                                id="bookName"
                                                label="Book Name"
                                                autoFocus
                                                error={touched.bookName && Boolean(errors.bookName)}
                                                helperText={touched.bookName && errors.bookName}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                as={TextField}
                                                autoComplete="off"
                                                name="authorName"
                                                required
                                                fullWidth
                                                id="authorName"
                                                label="Author Name"
                                                error={touched.authorName && Boolean(errors.authorName)}
                                                helperText={touched.authorName && errors.authorName}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                as={TextField}
                                                autoComplete="off"
                                                name="pages"
                                                required
                                                fullWidth
                                                id="pages"
                                                label="Pages"
                                                type="number"
                                                error={touched.pages && Boolean(errors.pages)}
                                                helperText={touched.pages && errors.pages}
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
                                        <Grid item xs={12}>
                                            <Field
                                                as={TextField}
                                                autoComplete="off"
                                                name="category"
                                                required
                                                fullWidth
                                                id="category"
                                                select
                                                label="Category"
                                                error={touched.category && Boolean(errors.category)}
                                                helperText={touched.category && errors.category}
                                            >
                                                {
                                                    categories?.map((c) => (
                                                        <MenuItem value={c.id}>{c.name}</MenuItem>
                                                    ))
                                                }
                                            </Field>
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3 }}
                                    >
                                        Create Book
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Container>
            </ThemeProvider>
            <Footer />
        </>
    );
};

export default AddBook;