const express = require("express");
const accountsRouter = require('./accounts/accounts-router');
const server = express();

server.use(express.json());

server.use('/api/accounts', accountsRouter)

server.use('*', handleError)
module.exports = server;



function handleError(err, req, res, next) { // eslint-disable-line 
    res.status(err.status || 500).json({
        Error: 'somethign went wrong',
        message: err.message,
    })

}