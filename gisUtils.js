const turf = require('@turf/turf');

let getArea = req => {
    let result = {};
    result.value = turf.area(turf.polygon(req.body.geometry.coordinates));
    return result;
};

let getBuffer = req => {
    return turf.buffer(turf.point(req.body.geometry.coordinates), req.query.distance || 500, { units: req.query.units || 'meters' });
};

let getCentroid = req => {
    return turf.centroid(turf.polygon(req.body.geometry.coordinates));
};

let getDistance = req => {
    let from = req.body.features[0].geometry.coordinates;
    let to = req.body.features[1].geometry.coordinates;
    let result = {};
    result.value = turf.distance(from, to, { units:  req.query.units || 'kilometers' });
    return result;
};


let getLength = req => {
    let result = {};
    result.value = turf.length(turf.lineString(req.body.geometry.coordinates), { units:  req.query.units || 'kilometers' });
    return result;
};


module.exports.getArea = getArea;
module.exports.getBuffer = getBuffer;
module.exports.getCentroid = getCentroid;
module.exports.getDistance = getDistance;
module.exports.getLength = getLength;
