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
import HeaderSignUp from './HeaderSignUp';
import { useNavigate } from 'react-router-dom';
import { useGlobalStates } from '../../context/GlobalContext';
import { Field, Formik, Form } from 'formik';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function SignUp() {

  const { user, setUser } = useGlobalStates()

  const handleSubmit = (values) => {
    setUser({
      email: values.email,
      password: values.password,
      name: values.name,
      lastName: values.lastName,
    })
    navigate('/signUpAdress')
  };

  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
      password: Yup.string()
      .required('Required')
      .min(4, 'Password must be at least 4 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{4,}$/, 'Must contain at least one lowercase letter, one uppercase letter, and one number'),
    confirmPassword: Yup.string()
      .required('Required')
      .min(4, 'Password must be at least 4 characters')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{4,}$/, 'Must contain at least one lowercase letter, one uppercase letter, and one number')
  });

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
              Sign up
            </Typography>
            <Formik
              initialValues={user} onSubmit={handleSubmit}
              sx={{ mt: 3 }}
              validationSchema={validationSchema}
            >
              {({ errors, touched }) => (
                <Form noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        autoComplete="given-name"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="First Name"
                        autoFocus
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
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
                    sx={{ mt: 3, mb: 2 }}
                  >
                    NEXT
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