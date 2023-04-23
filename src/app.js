require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

const yaml = require("yamljs");

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = yaml.load("./src/openApi.yaml");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Spatial modules
const measurementModule = require("./modules/measurement");
const miscModule = require('./modules/misc');
const transformationModule = require("./modules/transformation");

// eslint max-len: ["error", { "code": 80 }]

app.use('/', miscModule);

app.use('/measurement', measurementModule);

app.use('/transformation', transformationModule)


// eslint-disable-next-line no-undef
var port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
