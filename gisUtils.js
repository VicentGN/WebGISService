const turf = require('@turf/turf');

function getBuffer(req) {
    return turf.buffer(turf.point(req.body.features[0].geometry.coordinates), req.query.distance || 500, { units: req.query.units || 'meters' });
}

function getCentroid(req) {
    return turf.centroid(turf.polygon(req.body.features[0].geometry.coordinates));
}


module.exports.getBuffer = getBuffer;
module.exports.getCentroid = getCentroid;