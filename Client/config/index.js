import development from '@config/development';
import production from '@config/production';

const nodeENV = process.env.NODE_ENV || 'development';

const env = { production, development }[nodeENV];

const config = {
  api: {
    primaryHost: env.PRIMARY_HOST,
    host: env.API_HOST,
  },
};

export default config;
