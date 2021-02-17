'use strict';

const express = require('express');
const pkg = require('./package.json');
const updateRouter = require('./routes/update');
const requestLogger = require('./middlewares/requestLogger');
const logger = require('./middlewares/logger');

const PORT = pkg.app.port || 8101;
const app = express();

// MiddleWares
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/update', updateRouter);
app.use('/', (req, res) => {
    res.send('Welcome to StandUPdates.');
})

// Start Server
app.listen(PORT, logger.info('Started HTTP Server on http://localhost:'+PORT));