require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const { getBuffer, getCentroid, getArea, getLength } = require('./gisUtils');

app.get('/', (req, res) => {
    res.send('Welcome to WebGISService!');
});

app.post('/area', function (req, res) {
    if(req.body.geometry.type !== 'Polygon') {
        res.sendStatus(400);
    } else {
        res.send(getArea(req));
    }
});

app.post('/buffer', function(req, res) {
    if (req.body.geometry.type !== 'Point') {
        res.sendStatus(400);
    } else {
        res.send(getBuffer(req));
    }
});

app.post('/centroid', function(req, res) {
    if (req.body.geometry.type !== 'Polygon') {
        res.sendStatus(400);
    } else {
        res.send(getCentroid(req));
    }
});

app.post('/length', function(req, res) {
    if (req.body.geometry.type !== 'LineString') {
        res.sendStatus(400);
    } else {
        res.send(getLength(req));
    }
});


// eslint-disable-next-line no-undef
var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});