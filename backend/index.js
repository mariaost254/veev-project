const express = require('express');
const { NotFoundError, NotAuthenticated } = require('./middleware/errors')
const routes = require('./routes/projects');
const authRoutes = require('./routes/auth')
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/projects', routes);
app.use("/auth", authRoutes);

app.use((_, res, next) => {
    const error = new NotFoundError('Not Found');
    next(error);
});

app.use((_, res, next) => {
    const error = new NotAuthenticated('You have no permissions to access this resource');
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message || 'Internal Server Error'
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});