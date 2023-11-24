import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { setLocale } from '@containers/App/actions';

import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import { selectIsLoggedIn, selectToken } from '@containers/Client/selectors';
import { jwtDecode } from 'jwt-decode';
import { setLogin, setToken } from '@containers/Client/actions';
import classes from './style.module.scss';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
const Navbar = ({ locale }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuPosition, setMenuPosition] = useState(null);
  const open = Boolean(menuPosition);
  const [openDialog, setOpenDialog] = React.useState(false);
  const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  let role = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      role = decodedToken.role; // Sesuaikan dengan struktur token Anda
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // console.log(role, "role")

  const handleLogout = () => {
    dispatch(setLogin(false));
    dispatch(setToken(null));
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSelectRecruiter = () => {
    navigate(`/register?roleId=${2}`); // Navigasi ke halaman register dengan state role
    setOpenDialog(false);
  };

  const handleSelectJobTalent = () => {
    navigate(`/register?roleId=${3}`); // Navigasi ke halaman register dengan state role
    setOpenDialog(false);
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  const goHome = () => {
    navigate('/');
  };

  // useEffect(() => {
  //   // Cek apakah role adalah 2 dan jika mereka berada di halaman tertentu
  //   if (role === 2 && location.pathname === '/dashboard/jobs') {
  //     toast.error('Anda tidak memiliki izin untuk mengakses halaman ini.');
  //     navigate('/'); // Redirect ke halaman utama atau lainnya
  //   }
  // }, [role, location.pathname, navigate]);

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

          <Typography
            onClick={goHome}
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <FormattedMessage id="app_title_header" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {role === 2 && (
                <>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Kelola Jobs</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Post Job</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            onClick={goHome}
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <FormattedMessage id="app_title_header" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'end' } }}>
            {role === 2 && (
              <>
                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                  <Link to="/dashboard/jobs" style={{ textDecoration: 'none', color: 'white', fontSize: 10 }}>
                    <FormattedMessage id="app_header_manage_job" />
                  </Link>
                </Button>
                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                  <Link to="/dashboard/createJob" style={{ textDecoration: 'none', color: 'white', fontSize: 10 }}>
                    <FormattedMessage id="app_header_post_job" />
                  </Link>
                </Button>
              </>
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              marginRight: 2,
            }}
            onClick={handleClick}
          >
            <Avatar
              className={classes.avatar}
              src={locale === 'id' ? '/id.png' : '/en.png'}
              sx={{ width: 20, height: 20 }}
            />
            <div className={classes.lang}>{locale}</div>
            <ExpandMoreIcon />
          </Box>

          <Menu open={open} anchorEl={menuPosition} onClose={handleClose}>
            <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'}>
              <div className={classes.menu}>
                <Avatar className={classes.menuAvatar} src="/id.png" />
                <div className={classes.menuLang}>
                  <FormattedMessage id="app_lang_id" />
                </div>
              </div>
            </MenuItem>
            <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'}>
              <div className={classes.menu}>
                <Avatar className={classes.menuAvatar} src="/en.png" />
                <div className={classes.menuLang}>
                  <FormattedMessage id="app_lang_en" />
                </div>
              </div>
            </MenuItem>
          </Menu>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!isLoggedIn ? (
                <MenuItem
                  onClick={() => {
                    handleClickOpenDialog();
                  }}
                >
                  <Typography textAlign="center">
                    <FormattedMessage id="app_header_login" />
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    handleLogout();
                  }}
                >
                  <Typography textAlign="center">
                    <FormattedMessage id="app_header_logout" />
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Dialog
            open={openDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialog}
            aria-describedby="alert-dialog-slide-description"
            sx={{ '& .MuiDialog-paper': { padding: '20px', minWidth: '300px', borderRadius: '10px' } }}
          >
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
              <FormattedMessage id="app_header_auth_description" />
            </DialogTitle>
            <DialogContentText id="alert-dialog-slide-description" sx={{ textAlign: 'center', margin: '20px 0' }}>
              <FormattedMessage id="app_header_not_have_account" />
            </DialogContentText>
            <DialogActions sx={{ flexDirection: 'column', gap: '10px' }}>
              <Button variant="contained" color="primary" sx={{ width: '100%' }} onClick={handleLogin}>
                <FormattedMessage id="app_header_login" />
              </Button>
              <Button variant="outlined" sx={{ width: '100%' }} onClick={handleSelectRecruiter}>
                <FormattedMessage id="app_header_signup_recruiter" />
              </Button>
              <Button variant="outlined" sx={{ width: '100%' }} onClick={handleSelectJobTalent}>
                <FormattedMessage id="app_header_signup_talent" />
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Navbar.propTypes = {
  locale: PropTypes.string.isRequired,
};

export default Navbar;
