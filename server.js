const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const isLocal = process.env.NODE_ENV == null && process.env.NODE_ENV !== 'production';

console.log("is local? " + isLocal);

const server = app.listen(process.env.PORT || 3001, function () {
    console.log('Listening on port ' + server.address().port);
});

app.get('/', (req,res) => {
   res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

app.get(
    ['/registration-form', '/register', '/sign-up'],
    (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/register.html'));
});

app.get(
    ['/sitemap.xml', '/sitemap'],
    (req, res) => {
        res.header("Content-Type", "application/xml");
    res.sendFile(path.join(__dirname, 'public/sitemap.xml'));
});

app.get(
    ['/robots.txt', '/robot.txt'],
    (req, res) => {
   res.sendFile(path.join(__dirname, 'public/robots.txt'));
});

app.get(
    ['/site.webmanifest', '/favicon.ico', '/android-chrome-512x512.png', '/android-chrome-192x192.png', '/apple-touch-icon.png', '/favicon-16x16.png', '/favicon-32x32.png'],
    (req, res) => {
    if(isLocal) {
        console.log(req.path.split('/')[1]);
    }
    res.sendFile(path.join(__dirname, 'public/res/' + req.path.split('/')[1]));
});


app.get('/*', (req, res) => {
    if(isLocal){
        console.log(req.path);
    }
    fs.stat(path.join(__dirname , '/public/' + req.path), function(err, stat) {
        if(err == null) {
            res.sendFile(path.join(__dirname , '/public/' + req.path));
            // console.log("page exists");
        } else if(err.code === 'ENOENT') {
            // file does not exist
            res.status(404);
            res.json({error: "page does not exist"});
            // console.log("page does not exist");
        } else {
            res.status(404);
            res.json({error: "page does not exist"});
            console.log("routes.js: trying to load page but got: " + err.code);
        }
    });
});
