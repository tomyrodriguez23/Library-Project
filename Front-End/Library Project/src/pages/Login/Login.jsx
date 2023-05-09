import * as React from 'react';
import * as Yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { Field, Formik, Form } from 'formik';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HeaderLogIn from './HeaderLogin';
import { useGlobalStates } from '../../context/GlobalContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import { url } from "../../utils.json"

const theme = createTheme();

export default function Login() {

  const navigate = useNavigate()

  const { setUserAndLocalStorage } = useGlobalStates()

  const handleSubmit = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
    }
    await axios.post(`${url}/auth/login`, data)
      .then(response => {
        setUserAndLocalStorage(response?.data)
        navigate('/')
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

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
      password: Yup.string()
      .required('Required')
      .min(4, 'Password must be at least 4 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{4,}$/, 'Must contain at least one lowercase letter, one uppercase letter, and one number'),
  });

  const userNotFound = () => {
    Swal.fire({
      title: `The account is not registrated`,
      text: `Please signUp`,
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/signup')
      }
    })
  }

  const userNotAuthorized = () => {
    Swal.fire({
      title: `The account is not enabled`,
      text: `Confirm to send email`,
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.get(`${url}/auth/send?email=${user?.email}`)
      }
    })
  }

  const userWrongCredentials = () => {
    Swal.fire({
      title: `Wrong Credentials`,
      text: `Please verify your email & password`,
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    })
  }

  return (
    <>
      <HeaderLogIn />
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
            <Avatar sx={{ m: 1, bgcolor: '#038587' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography sx={{ marginBottom: 3 }} component="h1" variant="h5">
              Sign In
            </Typography>
            <Formik
              initialValues={{
                email: "",
                password: ""
              }} onSubmit={handleSubmit}
              sx={{ mt: 3 }}
              validationSchema={validationSchema}
            >
              {({ errors, touched }) => (
                <Form noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} >
                      <Field
                        as={TextField}
                        autoComplete="given-email"
                        name="email"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        autoFocus
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        autoComplete="password"
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Login
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item >
                      <Link href='/signUp' variant="body2">
                        "Don't have an account? Sign Up"
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider >
      <Footer />
    </>
  );
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Library
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}