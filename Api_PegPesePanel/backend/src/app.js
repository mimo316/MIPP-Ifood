const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate')
const routes = require('./routes');
const http = require('http');
const app = express();
const { setupWebsocket } = require('./websocket');
const server = http.Server(app);

app.use(cors({
    origin: '*'
}))

setupWebsocket(server);

app.use(express.json());

app.use(routes);

app.use(errors())

module.exports = server;