import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HeaderSignUp from './HeaderSignUp';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { useGlobalStates } from '../../context/GlobalContext';
import axios from 'axios';
import { url } from '../../utils.json'
import Swal from 'sweetalert2';
import { MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';


const theme = createTheme();

const SignUpAdress = () => {

  const navigate = useNavigate()

  const { user, setUser } = useGlobalStates()
  const [options, setOptions] = useState([])

  const handleSubmit = async (values) => {
    const data = {
      name: user?.name,
      lastName: user?.lastName,
      email: user?.email,
      password: user?.password,
      address: {
        country: values.country,
        city: values.city,
        postCode: values.postCode,
        line: values.line
      }
    }
    try {
      await axios.post(`${url}/auth/signup`, data)
      success()
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object().shape({
    country: Yup.string()
      .required('Required'),
    city: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    line: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    postCode: Yup.string()
      .required('Required')
      .min(4, 'Post Code must be at least 4 characters')
  });

  const success = () => {
    Swal.fire({
      title: `${user?.lastName, user?.name}`,
      text: `Check your inbox: ${user?.email}`,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/login')
      }
    })
  }

  useEffect(() => {
    getCountries()
  }, [])


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


  return (
    <>
      <HeaderSignUp />
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
              Sign up Address
            </Typography>
            <Formik
              initialValues={{
                country: "",
                city: user?.city,
                line: user?.line,
                postCode: user?.postCode,
              }} onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ errors, touched }) => (
                <Form noValidate>
                  <Grid container spacing={2}>
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
                        required
                        fullWidth
                        id="city"
                        label="City"
                        name="city"
                        autoComplete="city"
                        error={touched.city && Boolean(errors.city)}
                        helperText={touched.city && errors.city}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        id="line"
                        label="Line"
                        name="line"
                        autoComplete="line"
                        error={touched.line && Boolean(errors.line)}
                        helperText={touched.line && errors.line}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        id="postCode"
                        label="Post Code"
                        name="postCode"
                        type="postCode"
                        autoComplete="Post Code"
                        error={touched.postCode && Boolean(errors.postCode)}
                        helperText={touched.postCode && errors.postCode}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive notificationes of new books"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: '#038587' }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/login" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
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

export default SignUpAdress;
