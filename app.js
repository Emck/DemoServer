#!/usr/bin/env node

var express = require('express');
var app = express();

let counts = 0;

app.get('/', function (req, res) {
    var ip = req.connection.remoteAddress;
    res.json({ Counts: counts++, IP: ip });

    // exit after a single response because the containers don't have ps/kill/pkill etc.
    // process.exit()
});

app.listen(8180);
console.log('DemoServer is Runing [http://localhost:8180]');
