require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const { getBuffer, getCentroid } = require('./gisUtils');

app.get('/', (req, res) => {
    res.send('Welcome to WebGISService!');
});

app.post('/buffer', function(req, res) {
    if (req.body.features[0].geometry.type !== 'Point') {
        res.sendStatus(400);
    } else {
        res.send(getBuffer(req));
    }
});

app.post('/centroid', function(req, res) {
    if (req.body.features[0].geometry.type !== 'Polygon') {
        res.sendStatus(400);
    } else {
        res.send(getCentroid(req));
    }
});

// eslint-disable-next-line no-undef
var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});