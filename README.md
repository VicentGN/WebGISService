# WebGISService

WebGISService. Geospatial operations running on backend. Based on NodeJS/ExpressJS and TurfJS.  
Try the demo deployed on Heroku: https://webgisservice.herokuapp.com/
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

2. Create an `.env` file in the root folder. Example:

```
PORT=3000
```

3. Initialize the project:

```
npm run dev
```

Next, open a web browser and go to `http://localhost:3000/`   
You will watch the welcome page. 

### Current endpoints:

+ `GET /` Welcome page
+ `POST /area` Returns the area of a polygon. Requires a GeoJSON Polygon
+ `POST /buffer?distance={optional}&units={optional}` Get the buffer for a specific location. Requires a GeoJSON Point
+ `POST /centroid` Get the centroid of a polygon. Requires a GeoJSON Polygon
+ `POST /distance?units={optional}` Returns the distance between two points. Requires a FeatureCollection of points
+ `POST /length?units={optional}` Returns the length of a line. Requires a GeoJSON LineString

##  🛠️

* [ExpressJS](https://expressjs.com/) - Framework NodeJS
* [TurfJS](http://turfjs.org/) - JS library for geospatial analysis
* [Heroku](https://www.heroku.com) - Cloud application platform

## Authors ✒️

* **Vicent García** - *Web GIS Dev* - [VicentGN](https://github.com/vicentgn)
