const validate = require('jsonschema').validate;
const { featureSchema, featureCollectionSchema } = require('../../assets/geojsonSchemas');


const schemaValidation = {
    feature: function(req, res, next) {
        req.schemaValidation = true;

        let validation = validate(req.body, featureSchema);
        if (!validation.valid) {
            req.schemaValidation = false;
        }
        next();

    },
    featureCollection: (req, res, next) => {
        req.schemaValidation = true;

        let validation = validate(req.body, featureCollectionSchema);
        if (!validation.valid) {
            req.schemaValidation = false;
        }
        next();
    }
};

module.exports = { schemaValidation };