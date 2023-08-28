// load controllers
const control = require('../controllers');

// load routes
const userRouter = require('./userRoutes');

module.exports = (express, app, database) => {
    const controllers = control(database);

    // userRouter
    app.use('/api/v1/users', userRouter(express, controllers.userController));
};
