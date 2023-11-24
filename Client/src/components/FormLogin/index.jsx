import { useState } from 'react';
import PropTypes from 'prop-types';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const FormLogin = ({ onLogin, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const validateForm = (name, value) => {
    const errors = {};
    if (name === 'email') {
      if (!value) {
        errors.email = 'Email is required';
      }
    }
    if (name === 'password') {
      if (!value) {
        errors.password = 'Password is required';
      }
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      ...validateForm(name, value),
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {
      ...validateForm('email', formData.email),
      ...validateForm('password', formData.password),
    };
    if (Object.keys(newErrors).length === 0) {
      setFormErrors({});
      onLogin(formData);
    } else {
      setFormErrors(newErrors);
    }
  };

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            value={formData.email}
            onChange={handleChange}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={formData.password}
            onChange={handleChange}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="button" onClick={handleLogin} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register" variant="body2">
                Have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

FormLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
  error: PropTypes.string,
};
