import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Container, Box, Grid, Alert } from '@mui/material';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State for showing success message
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const storedUser = JSON.parse(localStorage.getItem('registeredUser'));

      if (storedUser && storedUser.email === values.email && storedUser.password === values.password) {
        // Successful login
        setIsLoggedIn(true);
        setError(null);
        localStorage.setItem('auth', JSON.stringify({ email: values.email, loggedIn: true }));

        // Show success message for a brief period
        setShowSuccessMessage(true);

        // Automatically redirect to TodoList page after 2 seconds
        setTimeout(() => {
          setShowSuccessMessage(false); 
          navigate('/todos'); 
        }, 2000); 

        resetForm();

      } else {
        // Failed login
        setError('Invalid email or password.');
        setIsLoggedIn(false);
      }

      setSubmitting(false);
    },
  });

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Box
          sx={{
            p: { xs: 2, sm: 4 },  // responsive padding
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#161b22',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  sx={{ backgroundColor: '#0d1117', color: '#fff' }}
                  InputProps={{ style: { color: 'white' } }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  sx={{ backgroundColor: '#0d1117', color: '#fff' }}
                  InputProps={{ style: { color: 'white' } }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button color="primary" variant="contained" fullWidth type="submit" disabled={formik.isSubmitting}>
                  Login
                </Button>
              </Grid>
            </Grid>

            {error && (
              <Typography variant="body1" color="error.main" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </form>

          <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
            Don't have an account?{' '}
            <Link to="/signUp" style={{ color: 'blue', textDecoration: 'underline' }}>
              Sign up
            </Link>
          </Typography>
        </Box>
      </Container>

      
      {showSuccessMessage && (
        <Alert
          severity="success"
          sx={{
            mt: 2,
            width: '50%',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          Logged in successfully! Redirecting...
        </Alert>
      )}
    </>
  );
};

export default Login;
