import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Input,
  Paper,
  Typography,
} from '@mui/material';
import { connect, useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { applyForJobRequest, checkApplicationRequest } from '@pages/Application/action';
import { selectIsLoggedIn, selectToken } from '@containers/Client/selectors';
import { selectApplyJobStatus } from '@pages/Application/selectors';
import { jwtDecode } from 'jwt-decode';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { fetchJobDetailRequest } from './action';
import { selectJobDetail } from './selectors';

export const DetailJobPage = ({ jobDetail, isLoggedIn, token, applyJobStatus }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const { id } = useParams();
  // console.log(id);
  // const jobDetail = useSelector(selectJobDetail);
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  // const token = useSelector(selectToken);
  let role = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      role = decodedToken.role; // Sesuaikan dengan struktur token Anda
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error decoding token:', error);
    }
  }

  useEffect(() => {
    dispatch(fetchJobDetailRequest(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(checkApplicationRequest(id));
    }
  }, [dispatch, isLoggedIn, id]);

  const hasApplied = applyJobStatus;
  // console.log(hasApplied, 'test');

  const [openDialog, setOpenDialog] = useState(false);
  const [cvFile, setCvFile] = useState(null);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFileChange = (event) => {
    setCvFile(event.target.files[0]);
  };

  const handleApply = () => {
    if (cvFile) {
      const formData = new FormData();
      formData.append('cv', cvFile); // Nama field 'cv' harus sesuai dengan yang backend harapkan
      dispatch(applyForJobRequest(id, formData));
      handleCloseDialog();
    }
    navigate('/');
  };

  const renderButtonContent = () => {
    if (!isLoggedIn) {
      return <FormattedMessage id="apply_mgs_no_login" />;
    }
    if (role === 1 || role === 2) {
      return <FormattedMessage id="apply_msg_wrong_role" />;
    }
    if (hasApplied) {
      return <FormattedMessage id="apply_msg_has_applied" />;
    }
    return <FormattedMessage id="apply_msg" />;
  };

  if (!jobDetail.data) {
    return <div>Loading...</div>; // atau tampilkan komponen loading lainnya
  }
  return (
    <Box sx={{ height: '85vh', marginTop: 10 }}>
      <Container sx={{ pt: '30px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Box sx={{ flex: 4, p: 2 }}>
                <Card sx={{ bgcolor: palette.primary.white }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h5" component="h3">
                        {jobDetail.data.Judul}
                      </Typography>
                      <Typography variant="h6" component="h3">
                        {jobDetail.data.Company}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        marginTop: 3,
                      }}
                    >
                      <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 700 }}>
                          <FormattedMessage id="detail_page_salary" />
                        </Box>
                        : {jobDetail.data.Gaji}
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 700 }}>
                          <FormattedMessage id="detail_page_kategori" />
                        </Box>
                        : {jobDetail.data.Kategori}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: { xs: 'column', sm: 'row' },
                      }}
                    >
                      <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 700 }}>
                          <FormattedMessage id="detail_page_location" />
                        </Box>
                        : {jobDetail.data.Lokasi}
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 700 }}>
                          <FormattedMessage id="detail_page_type" />
                        </Box>
                        : {jobDetail.data.Lokasi}
                      </Typography>
                    </Box>

                    <Typography variant="body2" sx={{ pt: 2 }}>
                      <div dangerouslySetInnerHTML={{ __html: jobDetail?.data.Deskripsi }} />
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ flex: 1, p: 2 }}>
              <Card sx={{ p: 2, bgcolor: palette.primary.white }}>
                <Button
                  sx={{ fontSize: '13px', width: '100%' }}
                  variant="contained"
                  onClick={handleOpenDialog}
                  disabled={!isLoggedIn || hasApplied || role === 1 || role === 2}
                >
                  {renderButtonContent()}
                </Button>
              </Card>
              <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Upload Your CV</DialogTitle>
                <DialogContent>
                  <FormControl fullWidth>
                    <Input type="file" onChange={handleFileChange} />
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog}>Cancel</Button>
                  <Button onClick={handleApply} disabled={!cvFile}>
                    Apply
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

DetailJobPage.propTypes = {
  jobDetail: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  token: PropTypes.string,
  applyJobStatus: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  jobDetail: selectJobDetail,
  isLoggedIn: selectIsLoggedIn,
  token: selectToken,
  applyJobStatus: selectApplyJobStatus,
});

export default connect(mapStateToProps)(DetailJobPage);
