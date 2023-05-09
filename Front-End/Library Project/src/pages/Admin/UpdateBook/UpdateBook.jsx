import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Grid, Button, Container, CssBaseline, Box, Avatar, Typography, MenuItem } from '@mui/material';
import { url } from '../../../utils.json'
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HeaderLogged from '../../../components/Header/HeaderLogged';
import Footer from '../../../components/Footer/Footer';
import CategoryIcon from '@mui/icons-material/Category';
import { useGlobalStates } from '../../../context/GlobalContext';
import Swal from 'sweetalert2';


const UpdateBook = () => {

    const [book, setBook] = useState();
    const [categories, setCategories] = useState([])
    const { id } = useParams()
    const { user } = useGlobalStates()
    const navigate = useNavigate()

    useEffect(() => {
        getBook()
        getCategories()
    }, []);

    const getBook = async () => {
        try {
            const response = await axios.get(`${url}/books/${id}`);
            setBook(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getCategories = async () => {
        try {
            const response = await axios.get(`${url}/categories`);
            setCategories(response.data)
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (values) => {
        const data = {
            id: id,
            bookName: values.bookName,
            authorName: values.authorName,
            description: values.description,
            pages: values.pages,
            imageUrl: values.imageUrl,
            category: {
                id: values.category
            }
        }
        await axios.put(`${url}/books`, data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user?.token}`
            }
        })
            .then(response => success())
            .catch(error => badRequest())

    };

    if (!book) {
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
                        Update Book
                    </Typography>
                    <Formik
                        initialValues={{
                            bookName: book?.bookName,
                            authorName: book?.authorName,
                            pages: book?.pages,
                            description: book?.description,
                            imageUrl: book?.imageUrl,
                            category: book?.category
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
                                            label="Image Url"
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
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Update Book
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

export default UpdateBook;