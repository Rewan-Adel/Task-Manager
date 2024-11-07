const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
require('dotenv').config();

const { notFoundError } = require('./middleware/error.messages.middleware');
const userRoute = require('./route/auth.route');
const taskRoute = require('./route/task.route');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//db connection
mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log('DB Connected');
}).catch((err) => {
    console.log('DB Connection Error', err);
});

app.use('/api/auth', userRoute);
app.use('/api/task', taskRoute);

app.all('*', (req, res) => {
    return notFoundError(`Can't find ${req.originalUrl} on this server!`, res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}).on('error', (err) => {
    console.log('Server Error', err.message);

});
