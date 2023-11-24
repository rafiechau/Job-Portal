import PropTypes from 'prop-types';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { selectJobDetail } from '@pages/DetailJob/selectors';
import { fetchJobDetailRequest } from '@pages/DetailJob/action';
import { selectToken } from '@containers/Client/selectors';
import { jwtDecode } from 'jwt-decode';
import ReactQuill from 'react-quill';
import { FormattedMessage } from 'react-intl';
import toast, { Toaster } from 'react-hot-toast';
import { createJob, updateJob } from './actions';

import 'react-quill/dist/quill.snow.css';

const EditJobPage = ({ job }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Asumsi menggunakan React Router
  const token = useSelector(selectToken);
  const [errors, setErrors] = useState({});
  const { data } = job;

  let EmployerID = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      EmployerID = decodedToken.id; // Sesuaikan dengan struktur token Anda
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  // if (token !== 2) {
  //   navigate('/');
  // }

  const [inputForm, setInputForm] = useState({
    EmployerID,
    Company: data.Company || '',
    Judul: data.Judul || '',
    Deskripsi: data.Deskripsi || '',
    Lokasi: data.Lokasi || '',
    TipePekerjaan: data.TipePekerjaan || '',
    Gaji: data.Gaji || '',
    Kategori: data.Kategori || '',
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchJobDetailRequest(id));
    } else {
      setInputForm({
        Company: '',
        Judul: '',
        Deskripsi: '',
        Lokasi: '',
        TipePekerjaan: '',
        Gaji: '',
        Kategori: '',
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (data && id) {
      setInputForm({
        Company: data.Company || '',
        Judul: data.Judul || '',
        Deskripsi: data.Deskripsi || '',
        Lokasi: data.Lokasi || '',
        TipePekerjaan: data.TipePekerjaan || '',
        Gaji: data.Gaji || '',
        Kategori: data.Kategori || '',
      });
    }
    return () => {
      setInputForm({
        EmployerID,
        Company: data.Company || '',
        Judul: data.Judul || '',
        Deskripsi: data.Deskripsi || '',
        Lokasi: data.Lokasi || '',
        TipePekerjaan: data.TipePekerjaan || '',
        Gaji: data.Gaji || '',
        Kategori: data.Kategori || '',
      });
    };
  }, [id, data]);

  const handleDescriptionChange = useCallback((description) => {
    setInputForm((prevForm) => ({
      ...prevForm,
      Deskripsi: description,
    }));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validate = () => {
    const tempErrors = {};
    tempErrors.Company = inputForm.Company ? '' : 'Company is required';
    tempErrors.Judul = inputForm.Judul ? '' : 'Job title is required';
    tempErrors.Deskripsi = inputForm.Deskripsi ? '' : 'Description is required';
    tempErrors.Lokasi = inputForm.Lokasi ? '' : 'Location is required';
    tempErrors.Gaji = inputForm.Gaji ? '' : 'Salary is required';
    tempErrors.TipePekerjaan = inputForm.TipePekerjaan ? '' : 'Job type is required';
    tempErrors.Kategori = inputForm.Kategori ? '' : 'Category is required';

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // if (validate()) {
      const jobData = {
        Company: inputForm.Company,
        Judul: inputForm.Judul,
        Deskripsi: inputForm.Deskripsi,
        Lokasi: inputForm.Lokasi,
        TipePekerjaan: inputForm.TipePekerjaan,
        Gaji: inputForm.Gaji,
        Kategori: inputForm.Kategori,
      };
      // console.log(id);
      if (id) {
        console.log('Submitting update for job ID:', id);
        dispatch(updateJob(id, jobData));
        toast.success('Behasil Update Data');
        navigate('/dashboard/jobs');
      } else {
        toast.success('Behasil Menambahkan Data');
        navigate('/dashboard/jobs');
        dispatch(createJob(jobData));
      }
      // }
    }
  };

  const tipePekerjaanOptions = ['Full-time', 'Part Time', 'Contract'];
  const kategoriOptions = ['IT', 'Marketing', 'Accounting'];

  // console.log('Form values', inputForm.TipePekerjaan);
  return (
    <Paper style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <Toaster />
      <Typography variant="h6" align="center">
        {id ? <FormattedMessage id="app_header_edit" /> : <FormattedMessage id="app_header_add" />}
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <input type="hidden" name="EmployerID" value={inputForm.EmployerID} />
        {/* <TextField
          label="ID User"
          name="EmployerID"
          fullWidth
          margin="normal"
          value={inputForm.EmployerID}
          onChange={handleChange}
        /> */}
        <Grid container spacing={2} style={{ marginTop: '10px' }}>
          <Grid item xs={12}>
            <TextField
              label={<FormattedMessage id="add_page_name_company" />}
              name="Company"
              fullWidth
              margin="normal"
              value={inputForm.Company}
              onChange={handleChange}
              error={!!errors.Company}
              helperText={errors.Company}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={<FormattedMessage id="detail_page_title" />}
              name="Judul"
              fullWidth
              margin="normal"
              value={inputForm.Judul}
              onChange={handleChange}
              error={!!errors.Judul}
              helperText={errors.Judul}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={<FormattedMessage id="detail_page_location" />}
              name="Lokasi"
              fullWidth
              margin="normal"
              value={inputForm.Lokasi}
              onChange={handleChange}
              error={!!errors.Lokasi}
              helperText={errors.Lokasi}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={<FormattedMessage id="detail_page_salary" />}
              name="Gaji"
              fullWidth
              margin="normal"
              value={inputForm.Gaji}
              onChange={handleChange}
              error={!!errors.Gaji}
              helperText={errors.Gaji}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Tipe Pekerjaan</InputLabel>
              <Select
                name="TipePekerjaan"
                label="Tipe Pekerjaan"
                value={inputForm.TipePekerjaan}
                onChange={handleChange}
                error={!!errors.TipePekerjaan}
                helperText={errors.TipePekerjaan}
              >
                {tipePekerjaanOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel>
                <FormattedMessage id="detail_page_kategori" />
              </InputLabel>
              <Select name="Kategori" label="Kategori" value={inputForm.Kategori} onChange={handleChange}>
                {kategoriOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <ReactQuill
              id="short-description"
              theme="snow"
              value={inputForm.Deskripsi}
              onChange={handleDescriptionChange}
            />
            {!!errors.Deskripsi && (
              <Typography color="error" variant="caption">
                {errors.Deskripsi}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Box style={{ marginTop: '20px', textAlign: 'center' }}>
              <Button variant="contained" color="primary" type="submit">
                {id ? <FormattedMessage id="app_header_edit" /> : <FormattedMessage id="app_header_add" />}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

EditJobPage.propTypes = {
  job: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  job: selectJobDetail,
});

export default connect(mapStateToProps)(EditJobPage);
