import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { selectAllJobs } from './selector';
import { deleteJobRequest, getAllJobsRequest } from './actions';
import NotFound from '@pages/NotFound';
import { selectToken } from '@containers/Client/selectors';

export const DashboardJobsPage = ({ jobs }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const jobs = useSelector(selectAllJobs);
  const [open, setOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const token = useSelector(selectToken);

  let role = null;
  if (token) {
    try {
      // eslint-disable-next-line no-undef
      const decodedToken = jwtDecode(token);
      role = decodedToken.role;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  console.log(role)

  // if (role !== 2) {
  //   navigate('/');
  // }

  const handleDeleteClick = (jobId) => {
    setSelectedJobId(jobId);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedJobId) {
      dispatch(deleteJobRequest(selectedJobId));
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllJobsRequest()); // Dispatch action tanpa parameter
  }, [dispatch]);

  return (
    <TableContainer component={Paper} elevation={3} sx={{ boxShadow: 3 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>
                J<FormattedMessage id="detail_page_title" />
              </b>
            </TableCell>
            <TableCell align="right">
              <b>
                <FormattedMessage id="detail_page_location" />
              </b>
            </TableCell>
            <TableCell align="right">
              <b>
                <FormattedMessage id="detail_page_type" />
              </b>
            </TableCell>
            <TableCell align="right">
              <b>
                <FormattedMessage id="detail_page_salary" />
              </b>
            </TableCell>
            <TableCell align="right">
              <b>
                <FormattedMessage id="dashboard_action" />
              </b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell component="th" scope="row">
                {job.Judul}
              </TableCell>
              <TableCell align="right">{job.Lokasi}</TableCell>
              <TableCell align="right">{job.TipePekerjaan}</TableCell>
              <TableCell align="right">{job.Gaji}</TableCell>
              <TableCell align="right">
                <IconButton color="primary" component={Link} to={`update/${job.id}`}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDeleteClick(job.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <FormattedMessage id="title_dialog_delete" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormattedMessage id="confirmation_msg_delete" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <FormattedMessage id="btn_cancel" />
          </Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            <FormattedMessage id="btn_delete" />
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

DashboardJobsPage.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = createStructuredSelector({
  jobs: selectAllJobs,
  // loading: selectJobsLoading, // Jika Anda ingin menggunakan state loading
});

export default connect(mapStateToProps)(DashboardJobsPage);
