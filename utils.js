// GeoJSON Validations
const validate = require('jsonschema').validate;
const { featureSchema, featureCollectionSchema } = require('./geojsonSchemas');

function isValidFeatureSchema(req) {
    let validation = validate(req.body, featureSchema);
    if (!validation.valid) {
        return { status: false, errors: validation.errors };
    } else {
        return { status: true };
    }
}

function isValidFeatureCollectionSchema(req) {
    let validation = validate(req.body, featureCollectionSchema);
    if (!validation.valid) {
        return { status: false, errors: validation.errors };
    } else {
        return { status: true };
    }
}

let response400Error = { status_code: 400, message: 'The GeoJSON is not valid' };

module.exports = {
    isValidFeatureSchema,
    isValidFeatureCollectionSchema,
    response400Error
};