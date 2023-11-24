import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Box, Button, CssBaseline, Grid, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useEffect, useState } from 'react';
import { registerRequest } from '@pages/Register/actions';

import toast, { Toaster } from 'react-hot-toast';
import Loader from '@components/Loader';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { makeSelectError, makeSelectLoading } from './selectors';

const defaultTheme = createTheme();

export const RegisterPage = ({ loading, error }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  console.log(error)

  const getRoleIdFromQueryString = () => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get('roleId');
  };

  const roleId = getRoleIdFromQueryString();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: roleId,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const tempErrors = {};
    tempErrors.name = formData.name ? '' : 'Name is required';
    tempErrors.email = formData.email ? '' : 'Email is required';
    tempErrors.password = formData.password ? '' : 'Password is required';
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData)
    if (error) {
      toast.error(error);
      // navigate('/register')
    }
    const tempErrors = validate();
    if (Object.values(tempErrors).every((x) => x === '')) {
      dispatch(registerRequest(formData)); // Kirim data registrasi
      toast.success('silahkan login');
      // navigate('/login');
    } else {
      setErrors(tempErrors);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Toaster />
      <Loader isLoading={loading} />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
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
              <FormattedMessage id="form_auth_title_page" />
            </Typography>
            <Box sx={{ mt: 1 }}>
              <form onSubmit={handleSubmit} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  type="text"
                  label={<FormattedMessage id="form_auth_name" />}
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={formData.name}
                  onChange={handleChange}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label={<FormattedMessage id="form_auth_email" />}
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={<FormattedMessage id="form_auth_password" />}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  <FormattedMessage id="form_auth_button_register" />
                </Button>
              </form>
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
                      <Link to="/login" style={{ color: 'inherit', fontSize: 16 }}>
                        <FormattedMessage id="form_auth_back_to_login" />
                      </Link>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?signup)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </ThemeProvider>
  );
};

RegisterPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: makeSelectLoading(),
});

export default connect(mapStateToProps)(RegisterPage);
