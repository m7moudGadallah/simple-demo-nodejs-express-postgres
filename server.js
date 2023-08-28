require('colors');
const createApp = require('./src/app');
const { database } = require('./src/config');

createApp(database).then((app) => {
    const PORT = 3000;

    app.listen(PORT, () => {
        console.log(
            `App running on port ${PORT}🚀...`.brightMagenta.underline.bold
                .italic
        );
    });
});
