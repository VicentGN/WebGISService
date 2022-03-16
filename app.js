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
app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-undef
    console.log(`Example app listening on port ${process.env.PORT}`);
});