import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Container, Box,Grid  } from '@mui/material';
import { Link } from 'react-router-dom'; 

const SignUp = () => {
  // Local state for storing user registration status
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  // Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      try {
        
        localStorage.setItem('registeredUser', JSON.stringify(values));
        setUser(values); 
        setError(null); 
        setShowMessage(true); 

        resetForm(); // Reset the form after successful sign up

      } catch (err) {
        setError('Registration failed! Please try again.');
        setUser(null); 
        setShowMessage(true); 
      }
      
      // Set timeout to hide the message after 2 seconds
      setTimeout(() => {
        setShowMessage(false);
      }, 2000); // 
      
      setSubmitting(false);
    },
  });

  return (
<Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#161b22',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                sx={{
                  backgroundColor: '#0d1117',
                  input: { color: 'white' },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#AAB8C2', 
                    opacity: 1,
                  },
                }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>

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
                sx={{
                  backgroundColor: '#0d1117',
                  input: { color: 'white' },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#AAB8C2', 
                    opacity: 1,
                  },
                }}
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
                sx={{
                  backgroundColor: '#0d1117',
                  input: { color: 'white' },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#AAB8C2',
                    opacity: 1,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button color="primary" variant="contained" fullWidth type="submit" disabled={formik.isSubmitting}>
                Sign Up
              </Button>
            </Grid>
          </Grid>

          <Typography variant="body1" sx={{ mt: 2 }}>
            Already signed up?{' '}
            <Link to="/login" style={{ color: 'blue', textDecoration: 'underline' }}>
              Login
            </Link>
          </Typography>

          {user && (
            <Typography variant="body1" color="success.main" sx={{ mt: 2 }}>
              Welcome, {user.name}! You have successfully signed up.
            </Typography>
          )}

          {error && (
            <Typography variant="body1" color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
