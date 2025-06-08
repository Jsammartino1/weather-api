# weather-api
Basic weather API using Express and Typescript

Server runs on localhost:3000 and handles lat (latitude) and lon (longitude) query parameters in decimal degrees notation.

Example:

```
http://localhost:3000/weather?lat=39.099724&lon=-94.578331
```

## API Documentation

Please see [this link](https://app.swaggerhub.com/apis/jcorp/Weather/1.0.0) for API endpoint documentation. 

## How to run

Before running for the first time it is required to run an 'npm install' command.

The server can be start by passing in an [OpenWeather API key](https://openweathermap.org/appid) as an environemnt variable combined with the 'npm start' command. Example below

```
WEATHER_API_KEY=<YOUR KEY HERE> npm start
```

Tests can be ran similar to starting the server. Example below.

```
WEATHER_API_KEY=<YOUR KEY HERE> npm test
```
