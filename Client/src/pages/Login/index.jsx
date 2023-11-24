import PropTypes from 'prop-types';
import { selectError, selectIsLoggedIn } from '@containers/Client/selectors';
import { Avatar, Box, Button, CssBaseline, Grid, Paper, TextField, Typography } from '@mui/material';
import { connect, useDispatch } from 'react-redux';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginRequest } from '@containers/Client/actions';
import { selectLoading } from '@containers/App/selectors';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '@components/Loader';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

export const LoginPage = ({ isLoggedIn, error, loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const tempErrors = {};
    tempErrors.email = credentials.email ? '' : 'Email is required';
    tempErrors.password = credentials.password ? '' : 'Password is required';
    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors) {
      toast.error(errors);
    }
    const tempErrors = validate();
    if (Object.values(tempErrors).every((x) => x === '')) {
      dispatch(loginRequest(credentials));
    } else {
      setErrors(tempErrors);

      if (tempErrors.email) {
        toast.error(tempErrors.email);
      }
      if (tempErrors.password) {
        toast.error(tempErrors.password);
      }
    }
  };

  useEffect(() => {
    if (errors) {
      toast.error(errors);
    }
  }, [errors]);

  useEffect(() => {
    if (isLoggedIn) {
      toast.success('Login successful');
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      {/* <Toaster /> */}
      <Loader isLoading={loading} />
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?signin)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
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
            <FormattedMessage id="form_auth_login_title_page" />
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={<FormattedMessage id="form_auth_email" />}
              name="email"
              autoComplete="email"
              value={credentials.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={<FormattedMessage id="form_auth_password" />}
              type="password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              autoComplete="current-password"
            />
            {/* {error && <Typography color="error">{error}</Typography>} */}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              <FormattedMessage id="form_auth_button_login" />
            </Button>
            <Grid container>
              <Grid>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'nowrap',
                    // gap: 21,
                    justifyContent: 'space-between',
                    mt: 2,
                  }}
                >
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>
                    <Link to="/" style={{ color: 'inherit', fontSize: 16 }}>
                    <FormattedMessage id="form_auth_login_back_to_home" />
                    </Link>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

LoginPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: selectIsLoggedIn,
  error: selectError,
  loading: selectLoading,
});

export default connect(mapStateToProps)(LoginPage);
