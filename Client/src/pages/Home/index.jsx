import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { ping } from '@containers/App/actions';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  IconButton,
  InputBase,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { createStructuredSelector } from 'reselect';
import headerImage from '../../../public/jobbg.jpg';
import { selectJobs } from './selectors';
import { fetchAllJobsRequest } from './actions';

const Home = ({ jobs }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  // const jobs = useSelector(selectJobs);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(ping());
    dispatch(fetchAllJobsRequest());
  }, [dispatch]);

  const truncateDescription = (desc) => {
    const maxChar = 300;
    return desc.length > maxChar ? `${desc.substring(0, maxChar)}...` : desc;
  };

  const filteredJobs = jobs.filter((job) => job.Judul.toLowerCase().includes(searchQuery.toLowerCase()));

  const StyleHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
    backgroundImage: `url(${headerImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: theme.palette.secondary.main,
  }));
  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', margin: 'auto' }}>
      <StyleHeader>
        <form style={{ width: '50%' }}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <InputBase
              sx={{ bgcolor: 'white', padding: '10px', color: 'rgba(0, 0, 0, 0.9)' }}
              fullWidth
              id="search"
              name="search"
              label="search"
              placeholder="ex: developer, front end"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
        </form>
      </StyleHeader>
      <Container>
        <Box sx={{ flex: 5, p: 2 }}>
          {filteredJobs.map((job, index) => (
            <Card key={index} sx={{ minWidth: 275, mb: 3, mt: 3, bgcolor: palette.primary.white }}>
              <CardContent>
                <Typography sx={{ fontSize: 15, color: palette.secondary.main, fontWeight: 500 }} gutterBottom>
                  <IconButton>
                    <LocationOnIcon sx={{ color: palette.secondary.main, fontSize: 18 }} />
                  </IconButton>{' '}
                  {job.Lokasi}
                </Typography>
                <Typography variant="h5" component="div">
                  {job.Judul}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {job.Company}
                </Typography>
                <Typography variant="body2">
                  {/* Description: {description.split(" ").slice(0, 15).join(" ") + "..."} */}
                  {/* {job.Deskripsi} */}
                  <div dangerouslySetInnerHTML={{ __html: truncateDescription(job.Deskripsi) }} />
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  sx={{ marginLeft: 1 }}
                  disableElevation
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon />}
                >
                  <Link style={{ textDecoration: 'none', color: 'white', boxShadow: 0 }} to={`/job/${job.id}`}>
                    More Details
                  </Link>
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

Home.propTypes = {
  jobs: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  jobs: selectJobs,
});

export default connect(mapStateToProps)(Home);
