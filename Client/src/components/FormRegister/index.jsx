import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const FormRegister = () => {
  const [name, onNameChange] = useState('');
  const [email, onEmailChange] = useState('');
  const [password, onPasswordChange] = useState('');

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
          Sign Up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            value={name}
            onChange={onNameChange}
            id="name"
            type="text"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={email}
            onChange={onEmailChange}
            id="email"
            type="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={onPasswordChange}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <TextField
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirmation Password"
            type="password"
            id="confirm-password"
            autoComplete="current-password"
          /> */}
          <Button
            type="submit"
            // onClick={() => register({ name, email, password })}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/login" variant="body2">
                Already Have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};
