const { getBuffer, getCentroid, getArea, getLength, getDistance, generateUnion } = require('../utils/spatialTools');

/* eslint-disable */

test('Area - Returns a geojson which represents the area of a polygon', () => {
    let request = {
        "body": {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            0.46142578125,
                            47.368594345213374
                        ],
                        [-0.7470703125,
                            46.08847179577592
                        ],
                        [
                            0.76904296875,
                            45.5679096098613
                        ],
                        [
                            1.5600585937499998,
                            46.5739667965278
                        ],
                        [
                            1.03271484375,
                            47.76886840424207
                        ],
                        [
                            0.68115234375,
                            48.10743118848039
                        ],
                        [
                            0.46142578125,
                            47.368594345213374
                        ]
                    ]
                ]
            }
        }
    }
    expect(getArea(request)).toStrictEqual({
        "value": 23516182738.41842
    });
});

test('Buffer - Returns a geojson which represents the buffer of a point', () => {
    let request = {
        "body": {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [-8.4814453125,
                    20.82380908513249
                ]
            }
        },
        "query": {
            "distance": 1000,
            "units": "kilometers"
        }
    };
    expect(getBuffer(request)).toStrictEqual({
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        1.1289175025691032,
                        20.556155976227764
                    ],
                    [
                        1.057600438265972,
                        22.310715525368337
                    ],
                    [
                        0.6156951121644363,
                        24.018885069475566
                    ],
                    [-0.19411881645280835,
                        25.613459664289394
                    ],
                    [-1.3534749853872545,
                        27.028782783964942
                    ],
                    [-2.826038990846649,
                        28.203736861235008
                    ],
                    [-4.556365302367757,
                        29.085216916184276
                    ],
                    [-6.470850893717263,
                        29.63178928652287
                    ],
                    [-8.4814453125,
                        29.81701272237787
                    ],
                    [-10.492039731282736,
                        29.63178928652287
                    ],
                    [-12.406525322632243,
                        29.085216916184276
                    ],
                    [-14.136851634153347,
                        28.203736861235008
                    ],
                    [-15.609415639612743,
                        27.028782783964942
                    ],
                    [-16.76877180854719,
                        25.613459664289394
                    ],
                    [-17.578585737164435,
                        24.018885069475566
                    ],
                    [-18.020491063265972,
                        22.310715525368327
                    ],
                    [-18.091808127569102,
                        20.55615597622776
                    ],
                    [-17.802985159558318,
                        18.82152528731277
                    ],
                    [-17.175318121485788,
                        17.170296518348714
                    ],
                    [-16.239174196641144,
                        15.661464853631996
                    ],
                    [-15.032688102602947,
                        14.348102492922319
                    ],
                    [-13.60075075677832,
                        13.276011032213834
                    ],
                    [-11.99405954427457,
                        12.48245145340618
                    ],
                    [-10.268028926372905,
                        11.994997785088014
                    ],
                    [-8.481445312499977,
                        11.830605447887109
                    ],
                    [-6.69486169862705,
                        11.994997785088021
                    ],
                    [-4.968831080725388,
                        12.482451453406197
                    ],
                    [-3.3621398682216417,
                        13.276011032213857
                    ],
                    [-1.9302025223970192,
                        14.348102492922347
                    ],
                    [-0.7237164283588318,
                        15.661464853632038
                    ],
                    [
                        0.212427496485809,
                        17.170296518348756
                    ],
                    [
                        0.8400945345583314,
                        18.82152528731281
                    ],
                    [
                        1.1289175025691032,
                        20.556155976227764
                    ]
                ]
            ]
        }
    });
});

test('Centroid - Returns a geojson which represents the centroid of a polygon', () => {
    let request = {
        'body': {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            0.46142578125,
                            47.368594345213374
                        ],
                        [-0.7470703125,
                            46.08847179577592
                        ],
                        [
                            0.76904296875,
                            45.5679096098613
                        ],
                        [
                            1.5600585937499998,
                            46.5739667965278
                        ],
                        [
                            1.03271484375,
                            47.76886840424207
                        ],
                        [
                            0.68115234375,
                            48.10743118848039
                        ],
                        [
                            0.46142578125,
                            47.368594345213374
                        ]
                    ]
                ]
            }
        }
    };
    expect(getCentroid(request)).toStrictEqual({
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": [
                0.626220703125,
                46.91254035668348
            ]
        }
    })
});

test('Distance - The distance between two points located at Madrid and Paris returns and object with a value that equals to 1052.5843806478629', () => {
    let request = {
        'body': {
            'type': 'FeatureCollection',
            'features': [{
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-3.703594207763672,
                        40.41650209415018
                    ]
                }
            },
            {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'Point',
                    'coordinates': [
                        2.349700927734375,
                        48.85409863123821
                    ]
                }
            }
            ]
        },
        'query': {
            'units': 'kilometers'
        }
    };
    expect(getDistance(request)).toStrictEqual({
        'value': 1052.5843806478629
    });
});

test('Length - The length of a LineString between Madrid and Paris returns and object which contains a value that equals to 1052.6379467656054', () => {
    let request = {
        'body': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': [
                    [-3.703765869140625,
                        40.41584861765072
                    ],
                    [
                        2.3462677001953125,
                        48.85517164033108
                    ]
                ]
            }
        },
        'query': {
            'units': 'kilometers'
        }
    };
    expect(getLength(request)).toStrictEqual({
        'value': 1052.6379467656054
    });
});

test('Union - Returns a geojson which represents the union of two polygons', () => {
    let request = {
        "body": {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "coordinates": [
                            [
                                [
                                    -0.6527133205163693,
                                    38.94308627185015
                                ],
                                [
                                    -0.6531133761062904,
                                    38.93495141557506
                                ],
                                [
                                    -0.6389971288921856,
                                    38.93717414656126
                                ],
                                [
                                    -0.6527133205163693,
                                    38.94308627185015
                                ]
                            ]
                        ],
                        "type": "Polygon"
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "coordinates": [
                            [
                                [
                                    -0.6432262879764039,
                                    38.94375302196417
                                ],
                                [
                                    -0.6455123199141326,
                                    38.9377520452054
                                ],
                                [
                                    -0.639111430488498,
                                    38.931972846831826
                                ],
                                [
                                    -0.6432262879764039,
                                    38.94375302196417
                                ]
                            ]
                        ],
                        "type": "Polygon"
                    }
                }
            ]
        }
    };

    expect(generateUnion(request)).toStrictEqual({
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        -0.6531133761062904,
                        38.93495141557506
                    ],
                    [
                        -0.6439998007464014,
                        38.936386430564546
                    ],
                    [
                        -0.639111430488498,
                        38.931972846831826
                    ],
                    [
                        -0.6408275861602514,
                        38.936885924484464
                    ],
                    [
                        -0.6389971288921856,
                        38.93717414656126
                    ],
                    [
                        -0.6412705526271958,
                        38.93815406623025
                    ],
                    [
                        -0.6432262879764039,
                        38.94375302196417
                    ],
                    [
                        -0.644782512494943,
                        38.93966783530818
                    ],
                    [
                        -0.6527133205163693,
                        38.94308627185015
                    ],
                    [
                        -0.6531133761062904,
                        38.93495141557506
                    ]
                ]
            ]
        }
    });
});