const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
// const {database} = require('./config')

const createApp = async (database) => {
    try {
        await database.connect();
        console.log(
            `Database (${database.database}) Connected🚀...`.cyan.underline.bold
                .italic
        );

        const app = express();

        // logger middleware
        app.use(morgan('dev'));

        // body-parser middleware
        app.use(express.json());

        // simple route
        app.get('/', (req, res) => {
            res.status(200).json({
                success: true,
                message: 'success request for main route',
                data: null,
            });
        });

        routes(express, app, database);

        return app;
    } catch (err) {
        console.log(err.message.red);
    }
};

module.exports = createApp;
