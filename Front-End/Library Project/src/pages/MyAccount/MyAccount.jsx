import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { useGlobalStates } from '../../context/GlobalContext';
import axios from 'axios';
import { url } from '../../utils.json'
import Swal from 'sweetalert2';
import HeaderLogged from '../../components/Header/HeaderLogged';
import { useEffect, useState } from 'react';
import { MenuItem } from '@mui/material';


const MyAccount = () => {

    const navigate = useNavigate()
    const { user, setUserAndLocalStorage } = useGlobalStates()
    const [userSearched, setUserSearched] = useState({})
    const [options, setOptions] = useState([])

    const getCountries = async () => {
        try {
            const response = await axios.get(`https://api.countrystatecity.in/v1/countries`, {
                headers: {
                    'X-CSCAPI-KEY': 'RGxsa1FtQ1RpR2RqVmJmYWxuaTdOZXM5aHRnMERtTzJtSnhMZVcwQQ=='
                }
            });
            setOptions(response.data)
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser()
        getCountries()
    }, [])


    const getUser = async () => {
        try {
            const response = await axios.get(`${url}/members/${user?.id}`);
            setUserSearched(response.data)
        }
        catch (error) {
            console.log(error);
        }
    }

    if (!user || !userSearched?.id) {
        return <div>Loading...</div>;
    }

    const handleSubmit = async (values) => {
        const data = {
            id: user?.id,
            name: values.name,
            lastName: values.lastName,
            email: user?.email,
            password: values.password,
            token: user?.token,
            roles: user?.roles,
            address: {
                country: values.country,
                city: values.city,
                postCode: values.postCode,
                line: values.line
            }
        }
        try {
            console.log(data);
            await axios.put(`${url}/members`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${user?.token}`
                }
            })
            await setUserAndLocalStorage(data)
            success(data.name, data.lastName)
        } catch (error) {
            console.log(error);
        }
    };


    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Name must be at least 3 characters'),
        lastName: Yup.string()
            .min(3, 'Last Name must be at least 3 characters'),
        password: Yup.string()
            .required('Required')
            .min(4, 'Password must be at least 4 characters')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{4,}$/, 'Must contain at least one lowercase letter, one uppercase letter, and one number'),
        confirmPassword: Yup.string()
            .required('Required')
            .min(4, 'Password must be at least 4 characters')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{4,}$/, 'Must contain at least one lowercase letter, one uppercase letter, and one number'),
        country: Yup.string()
            .min(2, 'Country must be at least 2 characters'),
        city: Yup.string()
            .min(2, 'City must be at least 2 characters'),
        line: Yup.string()
            .min(2, 'Line must be at least 2 characters'),
        postCode: Yup.string()
            .min(4, 'Post Code must be at least 4 characters')
    });

    const success = (name, lastName) => {
        Swal.fire({
            title: `${lastName}, ${name}`,
            text: `successfully updated`,
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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography sx={{ marginBottom: 3 }} component="h1" variant="h5">
                        Update Member
                    </Typography>
                    <Formik
                        initialValues={{
                            name: userSearched?.name,
                            lastName: userSearched?.lastName,
                            password: "",
                            confirmPassword: "",
                            country: userSearched?.address?.country,
                            city: userSearched?.address?.city,
                            line: userSearched?.address?.line,
                            postCode: userSearched?.address?.postCode
                        }} onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        {({ errors, touched }) => (
                            <Form noValidate>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            as={TextField}
                                            name="name"
                                            fullWidth
                                            id="name"
                                            label="Name"
                                            autoFocus
                                            required
                                            error={touched.name && Boolean(errors.name)}
                                            helperText={touched.name && errors.name}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            as={TextField}
                                            name="lastName"
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            error={touched.lastName && Boolean(errors.lastName)}
                                            helperText={touched.lastName && errors.lastName}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            autoComplete="off"
                                            name="country"
                                            required
                                            id="country"
                                            select
                                            label="Country"
                                            error={touched.country && Boolean(errors.country)}
                                            helperText={touched.country && errors.country}
                                        >
                                            {
                                                options?.map((c) => (
                                                    <MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>
                                                ))
                                            }
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            as={TextField}
                                            name="city"
                                            fullWidth
                                            id="city"
                                            label="City"
                                            error={touched.city && Boolean(errors.city)}
                                            helperText={touched.city && errors.city}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            as={TextField}
                                            name="line"
                                            fullWidth
                                            id="line"
                                            label="Line"
                                            error={touched.line && Boolean(errors.line)}
                                            helperText={touched.line && errors.line}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            id="postCode"
                                            label="Post Code"
                                            name="postCode"
                                            error={touched.postCode && Boolean(errors.postCode)}
                                            helperText={touched.postCode && errors.postCode}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            id="password"
                                            label="Password"
                                            name="password"
                                            type="password"
                                            error={touched.password && Boolean(errors.password)}
                                            helperText={touched.password && errors.password}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            id="confirmPassword"
                                            label="Confirm Password"
                                            name="confirmPassword"
                                            type="password"
                                            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                            helperText={touched.confirmPassword && errors.confirmPassword}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, bgcolor: '#038587' }}
                                >
                                    Update
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

export default MyAccount;

