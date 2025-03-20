'use strict';
const express = require('express');
const helmet = require("helmet");
const bodyParser = require('body-parser');
const compress = require('compression');
const fs = require('fs');
const path = require('path');
const cluster = require('cluster');
const cpuCount = require('os').cpus().length;
const http = require('http');
const https = require('https');
const config = require('./server/helpers/config');
const Errors = require('./server/helpers/errors');

const clientBuildPath = path.join(__dirname.replace("\server","") ,'client/build');

const port = config.APP_PORT;
const sslPort = config.SSL_PORT||443;

const app = express();
app.set('port', port);
app.use(helmet.hidePoweredBy());
global.appRoot = path.resolve(__dirname);

app.use(helmet.contentSecurityPolicy({
                 directives:{
                   defaultSrc:["'self'","blob: data:",'maps.googleapis.com','maps.gstatic.com','kit-pro.fontawesome.com'],
                   scriptSrc:["'self'","'unsafe-inline'",'maps.googleapis.com','kit-pro.fontawesome.com'],
                   objectSrc:["blob: data:",'maps.googleapis.com','kit-pro.fontawesome.com'],
                   styleSrc:["'self'","'unsafe-inline'",'fonts.googleapis.com','maps.googleapis.com','kit-pro.fontawesome.com'],
                   fontSrc:["'self'",'fonts.gstatic.com','kit-pro.fontawesome.com']}}));
app.use(compress());
app.use(bodyParser.json({limit: '25mb'})); //Added to avoid request entity too large error
app.use(bodyParser.urlencoded({limit: '25mb',extended: true})); //Added to avoid request entity too large error
app.use(bodyParser.urlencoded({extended: true})); // for parsing x-www-form-urlencoded

app.use(express.static(clientBuildPath, {maxAge: 31557600000}));
/**
 * Log url
 */
app.all('/*', function(req, res, next) {
    //res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

// authorized /v1 route
app.all('/api/v1/*', [require('./server/middlewares/validate')]);
app.use('/api', require('./server/routes'));

app.get('*', (req, res) => {
    let url = req.url.toLowerCase();
    if(url.indexOf("/api") == 0){
        res.status(404).json({
            "status": 404,
            "message": "Invalid URL",
        });
        console.log(`\x1b[33mInvalid URL "${(req.originalUrl?req.originalUrl:'')}" Time : ${new Date()} \x1b[0m`);
    }
    else{
        console.log(req.url + " Send "+ clientBuildPath);
        res.sendFile(clientBuildPath + '/app.html');
    }
});

async function shutdown(){
    console.log("Shutdown database and web server");
    process.exit();
}

process.once('SIGTERM', () => {
    console.log('Received SIGTERM');
    shutdown();
});
  
process.once('SIGINT', () => {
    console.log('Received SIGINT = STOP SERVER EVENT');
    shutdown();
});

process.once('uncaughtException', err => {
    console.log('Uncaught exception');
    console.error(err.stack);
    shutdown(err);
});


async function initApplication(){
    app.errors = Errors;

    const sslOptions = {
      key: fs.readFileSync('./ssl/star.net.key'),
      cert: fs.readFileSync('./ssl/star.net.crt')
    };
    const httpServer = https.createServer(sslOptions, app);

    if (cluster.isMaster){
        console.log('Master Cluster => Starting ' + cpuCount + ' workers\n----------------------');

        for (let i = 0; i < cpuCount; i++) {
            let worker1 = cluster.fork();
            worker1.on('message', function(message) {
                console.log(message.from + ': ' + message.type + ' ' + message.data.number + ' = ' + message.data.result);
            });
        }

        cluster.on('online', function(worker){
            //console.log('Worker ' +  worker.process.pid + ' is online');
        });

        cluster.on('exit', function(worker, code, signal) {
            console.log('Worker ' + worker.process.pid + 'died with code: ' + code + '. Starting new worker')
            cluster.fork();
        });
    }
    else 
    {
        if(config.DEVELOPMENT != '1'){
            httpServer.listen(sslPort, function(){
            console.log(`warehouse-netsuite.net listening on https (${sslPort}) & http (${port})`);
            });
            http.createServer(function (req, res) {
                let curHost = (req.headers['host'] ||'').toString();
                if(curHost !=""){
                    if(curHost.indexOf(":",7) > -1){
                    curHost = curHost.substr(0,curHost.indexOf(":",7));
                    }
                    console.log(curHost, ':', sslPort);
                    if(sslPort != '443') curHost =  curHost +":"+ sslPort;
                    res.writeHead(301, {
                    "Location": "https://" + curHost + req.url
                    });
                    res.end();
                }
                else{
                    console.log("Invalid host name =>"+ curHost)
                }
            }).listen(port, function () {
            console.log('warehouse-netsuite.net - Port: %d', port);
            });
        }
        else{
            //Development 
            http.createServer(app).listen(port, function () {
              console.log('warehouse-netsuite.net - Port: %d', port);
            });
        }
    }
}
initApplication();

module.exports = app;
