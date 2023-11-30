const turf = require('@turf/turf');

function getArea(req) {
    let result = {};
    result.value = turf.area(turf.polygon(req.body.geometry.coordinates));
    return result;
}

function getBuffer(req) {
    return turf.buffer(turf.point(req.body.geometry.coordinates), req.query.distance || 500, { units: req.query.units || 'meters' });
}

function getCentroid(req) {
    return turf.centroid(turf.polygon(req.body.geometry.coordinates));
}

function getDistance(req) {
    let from = req.body.features[0].geometry.coordinates;
    let to = req.body.features[1].geometry.coordinates;
    let result = {};
    result.value = turf.distance(from, to, { units: req.query.units || 'kilometers' });
    return result;
}


function getLength(req) {
    let result = {};
    result.value = turf.length(turf.lineString(req.body.geometry.coordinates), { units: req.query.units || 'kilometers' });
    return result;
}

function generateUnion(req) {
    return turf.union(req.body.features[0].geometry, req.body.features[1].geometry);
}

module.exports = {
    getArea,
    getBuffer,
    getCentroid,
    getDistance,
    getLength,
    generateUnion
};