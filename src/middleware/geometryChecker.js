const geometryChecker = {
	isPoint: (req, res, next) => {
		req.body.geometry.type === "Point"
			? (req.geometryValidation = true)
			: (req.geometryValidation = false);
		next();
	},

	isLineString: (req, res, next) => {
		req.body.geometry.type === "LineString"
			? (req.geometryValidation = true)
			: (req.geometryValidation = false);
		next();
	},

	isPolygon: (req, res, next) => {
		req.body.geometry.type === "Polygon"
			? (req.geometryValidation = true)
			: (req.geometryValidation = false);
		next();
	},

	isMultiPoint: (req, res, next) => {
		req.geometryValidation = true;
		let counter = 0;
		while (req.geometryValidation && counter < req.body.features.length) {
			req.body.features[counter].geometry.type !== "Point"
				? (req.geometryValidation = !req.geometryValidation)
				: false;
			counter += 1;
		}
		next();
	},

	isMultiPolygon: (req, res, next) => {
		req.geometryValidation = true;
		let counter = 0;
		while (req.geometryValidation && counter < req.body.features.length) {
			req.body.features[counter].geometry.type !== "Polygon"
				? (req.geometryValidation = !req.geometryValidation)
				: false;
			counter += 1;
		}
		next();
	}
};

module.exports = { geometryChecker };
