const featureSchema = {
    'id': '\featureSchema',
    'type': 'object',
    'properties': {
        'type': {
            'type': 'string'
        },
        'properties': {
            'type': 'object'
        },
        'geometry': {
            'type': 'object',
            'properties': {
                'type': {
                    'type': 'string'
                },
                'coordinates': {
                    'type': 'array'
                }
            },
            'required': ['type', 'coordinates']
        }
    },
    'required': ['type', 'geometry']
};

const featureCollectionSchema = {
    'id': '\featureCollectionSchema',
    'type': 'object',
    'properties': {
        'type': {
            'type': 'string'
        },
        'features': {
            'type': ['\featureSchema']
        }
    },
    'required': ['type', 'features']
};

module.exports = { featureSchema, featureCollectionSchema };