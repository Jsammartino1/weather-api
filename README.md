# weather-api
Basic weather API using Express and Typescript

Server runs on localhost:3000 and handles lat (latitude) and lon (longitude) query parameters in decimal degrees notation.

## API Documentation

Please see [this link](https://app.swaggerhub.com/apis/jcorp/Weather/1.0.0) for API endpoint documentation. 

## How to run

Before running for the first time it is required to run an 'npm install' command.

The server can be start by passing in an open weather API key as an environemnt variable combine with the 'npm start' command. Example below

```
WEATHER_API_KEY=<YOUR KEY HERE> npm start
```

Tests can be ran similar to starting the server. Example below.

```
WEATHER_API_KEY=df33158c6a8ac9a0380f95391b255428 npm test
```
