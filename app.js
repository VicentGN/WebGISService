require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const yaml = require('yamljs');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = yaml.load('./swagger.yaml');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const { getBuffer, getCentroid, getArea, getLength, getDistance } = require('./gisUtils');

// eslint max-len: ["error", { "code": 80 }]

app.get('/', function(req, res) {
    res.redirect('/docs');
})

app.post('/area', function(req, res) {
    if (req.body.geometry.type !== 'Polygon') {
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

app.post('/distance', function(req, res) {
    if (req.body.type !== 'FeatureCollection' ||
        req.body.features.length !== 2) {
        res.sendStatus(400);
    } else if (req.body.features[0].geometry.type !== 'Point' ||
        req.body.features[1].geometry.type !== 'Point') {
        res.sendStatus(400);
    } else {
        res.send(getDistance(req));
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