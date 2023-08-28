const { Client } = require('pg');

const client = new Client({
    user: 'node_user',
    host: 'localhost',
    database: 'api',
    password: '123',
    port: 5432,
});

module.exports = client
