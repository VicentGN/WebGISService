const express = require("express");
const router = express.Router();

// Turf Tools
const { getBuffer, generateUnion } = require("../utils/spatialTools");

// GeoJSON validation
const { response200Error } = require("../utils/responses");
const { schemaValidation } = require("../middleware/schemaValidation");
const { geometryChecker } = require("../middleware/geometryChecker");

router.post(
	"/buffer",
	[schemaValidation.feature, geometryChecker.isPoint],
	(req, res) => {
		req.schemaValidation && req.geometryValidation
			? res.status(200).send(getBuffer(req))
			: res.status(200).send(response200Error);
	}
);

router.post(
	"/union",
	[schemaValidation.featureCollection, geometryChecker.isMultiPolygon],
	(req, res) => {
		req.schemaValidation && req.geometryValidation
			? res.status(200).send(generateUnion(req))
			: res.status(200).send(response200Error);
	}
);

module.exports = router;