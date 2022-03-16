# WebGISService

WebGISService. Geospatial operations running on backend. Based on NodeJS/ExpressJS and TurfJS
## Starting 🚀

```
git clone https://github.com/VicentGN/WebGISService.git
```


### Pre-requisites 📋

+ Node v.14


### Install 🔧

1. First steps: go to the cloned project and start up:
```
cd WebGISService
npm i
```

1. Create an `.env` file in the root folder. Example:

```
PORT=3000
```

3. Initialize the project:

```
npm start
```

Next, open a web browser and go to `http://localhost:3000/`   
You will watch the welcome page. 

### Current endpoints:

+ `GET /` Welcome page
+ `POST /buffer?distance={optional}&units={optional}` Get the buffer for a specific location. Requires a GeoJSON Point
+ `POST /centroid` Get the centroid of a polygon. Requires GeoJSON Polygon

##  🛠️

* [ExpressJS](https://expressjs.com/) - Framework NodeJS
* [TurfJS](http://turfjs.org/) - JS library for geospatial analysis

## Limitations

Endpoints only accept `FeatureCollections`. You can create them on [geojson.io](https://geojson.io/)

## Authors ✒️

* **Vicent García** - *Web GIS Dev* - [VicentGN](https://github.com/vicentgn)
