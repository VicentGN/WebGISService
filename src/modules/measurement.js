const express = require("express");
const router = express.Router();

// Turf Tools
const {
	getCentroid,
	getArea,
	getLength,
	getDistance,
} = require("../utils/spatialTools");

// GeoJSON validation
const { response200Error } = require("../utils/responses");
const { schemaValidation } = require("../middleware/schemaValidation");
const { geometryChecker } = require("../middleware/geometryChecker");


router.post(
	"/area",
	[schemaValidation.feature, geometryChecker.isPolygon],
	function (req, res) {
		req.schemaValidation && req.geometryValidation
			? res.status(200).send(getArea(req))
			: res.status(200).send(response200Error);
	}
);

router.post(
	"/centroid",
	[schemaValidation.feature, geometryChecker.isPolygon],
	function (req, res) {
		req.schemaValidation && req.geometryValidation
			? res.status(200).send(getCentroid(req))
			: res.status(200).send(response200Error);
	}
);

router.post(
	"/distance",
	[schemaValidation.featureCollection, geometryChecker.isMultiPoint],
	function (req, res) {
		req.schemaValidation && req.geometryValidation
			? res.status(200).send(getDistance(req))
			: res.status(200).send(response200Error);
	}
);

router.post(
	"/length",
	[schemaValidation.feature, geometryChecker.isLineString],
	function (req, res) {
		req.schemaValidation && req.geometryValidation
			? res.status(200).send(getLength(req))
			: res.status(200).send(response200Error);
	}
);

module.exports = router