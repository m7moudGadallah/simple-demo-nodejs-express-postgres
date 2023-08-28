// load controllers
const userController = require('./userController');

module.exports = (database) => {
    return {
        userController: userController(database),
    };
};
