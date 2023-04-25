// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import HeaderLogIn from './HeaderSignUp';
// import Footer from '../../components/Footer/Footer';
// import { Navigate } from 'react-router-dom';



// const theme = createTheme();

// export default function Login() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

//   const { user, setUser } = useGlobalStates()

//   const handleSubmit = (values) => {
//     setUser({
//       email: values.email,
//       password: values.password,
//       name: values.name,
//       lastName: values.lastName,
//     })
//     navigate('/signUpAdress')
//   };

//   const navigate = useNavigate()

//   const validationSchema = Yup.object().shape({
//     name: Yup.string()
//       .max(15, 'Must be 15 characters or less')
//       .required('Required'),
//     lastName: Yup.string()
//       .max(20, 'Must be 20 characters or less')
//       .required('Required'),
//     email: Yup.string()
//       .email('Invalid email address')
//       .required('Required'),
//     password: Yup.string()
//       .required('Required')
//       .min(8, 'Password must be at least 8 characters')
//   });


//   return (
//     <>
//     <HeaderLogIn/>
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: '#038587' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Login
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign In
//             </Button>
//             <Grid container>
//               <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid  item >
//                 <Link href='/signUp' variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 8, mb: 4 }} />
//       </Container>
//     </ThemeProvider>
//     <Footer/>
//     </>
//   );
// }

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

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

const theme = createTheme();

export default function Login() {

  const {isLogged, setIsLogged} = useGlobalStates()

  const handleSubmit = (values) => {
    const data = {
      email: values.email,
      password: values.password,
    }
    setIsLogged(true)
    navigate('/')
  };

  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .required('Required')
      .min(8, 'Password must be at least 8 characters')
  });

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