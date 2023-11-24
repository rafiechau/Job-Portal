// utils/redisClient.js
const { createClient } = require('redis');
const client = createClient({
    url: 'redis://localhost:6379'
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (error) => {
    console.error('Error connecting to Redis:', error);
});

client.connect();



module.exports = client;
