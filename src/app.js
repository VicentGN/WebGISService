require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

const yaml = require("yamljs");

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = yaml.load("./src/openApi.yaml");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Turf Tools
const {
	getBuffer,
	getCentroid,
	getArea,
	getLength,
	getDistance,
} = require("./utils/spatialTools");

// GeoJSON validation
const {response200Error} = require("./utils/responses");
const {schemaValidation} = require("./middleware/schemaValidation");
const {geometryChecker} = require("./middleware/geometryChecker");

// eslint max-len: ["error", { "code": 80 }]

app.get("/", function (req, res) {
	res.redirect("/docs");
});

app.post(
	"/area",
	[schemaValidation.feature, geometryChecker.isPolygon],
	function (req, res) {
		req.schemaValidation && req.geometryValidation
			? res.status(200).send(getArea(req))
			: res.status(200).send(response200Error);
	}
);

app.post(
	"/buffer",
	[schemaValidation.feature, geometryChecker.isPoint],
	function (req, res) {
		req.schemaValidation && req.geometryValidation
			? res.status(200).send(getBuffer(req))
			: res.status(200).send(response200Error);
	}
);

app.post(
	"/centroid",
	[schemaValidation.feature, geometryChecker.isPolygon],
	function (req, res) {
		req.schemaValidation && req.geometryValidation
			? res.status(200).send(getCentroid(req))
			: res.status(200).send(response200Error);
	}
);

app.post(
	"/distance",
	[schemaValidation.featureCollection, geometryChecker.isMultiPoint],
	function (req, res) {
		req.schemaValidation && req.geometryValidation
			? res.status(200).send(getDistance(req))
			: res.status(200).send(response200Error);
	}
);

app.post(
	"/length",
	[schemaValidation.feature, geometryChecker.isLineString],
	function (req, res) {
		req.schemaValidation && req.geometryValidation
			? res.status(200).send(getLength(req))
			: res.status(200).send(response200Error);
	}
);

// eslint-disable-next-line no-undef
var port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
