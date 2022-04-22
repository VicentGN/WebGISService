require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const yaml = require('yamljs');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = yaml.load('./openApi.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Turf Tools
const { getBuffer, getCentroid, getArea, getLength, getDistance } = require('./gisUtils');

// GeoJSON validation
const { isValidFeatureSchema, isValidFeatureCollectionSchema, response400Error } = require('./utils');

// eslint max-len: ["error", { "code": 80 }]

app.get('/', function(req, res) {
    res.redirect('/docs');
});

app.post('/area', function(req, res) {
    let schemaValidation = isValidFeatureSchema(req);
    if (!schemaValidation.status) {
        res.status(400).send(response400Error);
    } else
    if (req.body.geometry.type !== 'Polygon') {
        res.status(400).send(response400Error);
    } else {
        res.send(getArea(req));
    }
});

app.post('/buffer', function(req, res) {
    let schemaValidation = isValidFeatureSchema(req);
    if (!schemaValidation.status) {
        res.status(400).send(response400Error);
    } else if (req.body.geometry.type !== 'Point') {
        res.status(400).send(response400Error);
    } else {
        res.send(getBuffer(req));
    }
});

app.post('/centroid', function(req, res) {
    let schemaValidation = isValidFeatureSchema(req);
    if (!schemaValidation.status) {
        res.status(400).send(response400Error);
    } else if (req.body.geometry.type !== 'Polygon') {
        res.status(400).send(response400Error);
    } else {
        res.send(getCentroid(req));
    }
});

app.post('/distance', function(req, res) {
    let schemaValidation = isValidFeatureCollectionSchema(req);
    if (!schemaValidation.status) {
        res.status(400).send(response400Error);
    } else if (req.body.type !== 'FeatureCollection' ||
        req.body.features.length !== 2) {
        res.status(400).send(response400Error);
    } else if (req.body.features[0].geometry.type !== 'Point' ||
        req.body.features[1].geometry.type !== 'Point') {
        res.status(400).send(response400Error);
    } else {
        res.send(getDistance(req));
    }
});

app.post('/length', function(req, res) {
    let schemaValidation = isValidFeatureSchema(req);
    if (!schemaValidation.status) {
        res.status(400).send(response400Error);
    } else if (req.body.geometry.type !== 'LineString') {
        res.status(400).send(response400Error);
    } else {
        res.send(getLength(req));
    }
});


// eslint-disable-next-line no-undef
var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});