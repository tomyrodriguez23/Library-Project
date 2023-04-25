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
// import Header from '../../components/Header/Header';
// import Footer from '../../components/Footer/Footer';
// import HeaderSignUp from './HeaderSignUp';
// import { useGlobalStates } from '../../context/GlobalContext';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {url} from '../../utils.json'
// import Swal from 'sweetalert2';

// const theme = createTheme();

// export default function SignUpAdress() {

//   const navigate = useNavigate()
//   const { user, setUser } = useGlobalStates()

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const dataForm = new FormData(event.currentTarget);
//     const data = {
//       name: user.name,
//       lastName: user.lastName,
//       email: user.email,
//       password: user.password,
//       address: {
//         country: dataForm.get('country'),
//         city: dataForm.get('city'),
//         postCode: dataForm.get('postCode'),
//         line: dataForm.get('line'),
//       }
//     }
//     try {
//       await axios.post(`${url}/members`, data)
//       success()
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const success = () => {
//     Swal.fire({
//       title: `${user?.lastName, user?.name}`,
//       text: "Succesfully Signed Up",
//       icon: 'success',
//       confirmButtonColor: '#3085d6',
//       confirmButtonText: 'OK'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         navigate('/login')
//       }
//     })

//   }


//   return (
//     <>
//       <HeaderSignUp />
//       <ThemeProvider theme={theme}>
//         <Container component="main" maxWidth="xs">
//           <CssBaseline />
//           <Box
//             sx={{
//               marginTop: 8,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: '#038587' }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Sign up Adress
//             </Typography>
//             <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>

//                 </Grid>
//                 <Grid item xs={12}>
//                   <FormControlLabel
//                     control={<Checkbox value="allowExtraEmails" color="primary" />}
//                     label="I want to receive notifications from new books"
//                   />
//                 </Grid>
//               </Grid>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Sign Up
//               </Button>
//               <Grid container justifyContent="flex-end">
//                 <Grid item>
//                   <Link href="#" variant="body2">
//                     Already have an account? Sign in
//                   </Link>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//           <Copyright sx={{ mt: 5 }} />
//         </Container>
//       </ThemeProvider>
//       <Footer />
//     </>
//   );
// }

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Library
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }


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


const theme = createTheme();

const SignUpAdress = () => {

  const navigate = useNavigate()

  const { user, setUser } = useGlobalStates()

  const handleSubmit = async (values) => {

    const data = {
      name: user?.name,
      lastName: user?.lastName,
      email: user?.email,
      password: user?.password,
      address:{
        country: values.country,
        city: values.city,
        postCode: values.postCode,
        line: values.line
      }
    }
    try {
      await axios.post(`${url}/members`, data)
      success()
    } catch (error) {
      console.log(error);
    }
  };



  const validationSchema = Yup.object().shape({
    country: Yup.string()
      .max(15, 'Must be 20 characters or less')
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
      text: "Succesfully Signed Up",
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/login')
      }
    })

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
            <Typography component="h1" variant="h5">
              Sign up {user?.name}
            </Typography>
            <Formik
              initialValues={{
                country: user?.country,
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
                        autoComplete="given-country"
                        name="country"
                        required
                        fullWidth
                        id="country"
                        label="Country"
                        autoFocus
                        error={touched.country && Boolean(errors.country)}
                        helperText={touched.country && errors.country}

                      />
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

