const turf = require('@turf/turf');

let getBuffer = req => {
    return turf.buffer(turf.point(req.body.geometry.coordinates), req.query.distance || 500, { units: req.query.units || 'meters' });
};

let getCentroid = req => {
    return turf.centroid(turf.polygon(req.body.geometry.coordinates));
};

let getArea = req => {
    let result = {};
    result.value = turf.area(turf.polygon(req.body.geometry.coordinates));
    return result;
};

let getLength = req => {
    let result = {};
    result.value = turf.length(turf.lineString(req.body.geometry.coordinates));
    return result;
};


module.exports.getBuffer = getBuffer;
module.exports.getCentroid = getCentroid;
module.exports.getArea = getArea;
module.exports.getLength = getLength;