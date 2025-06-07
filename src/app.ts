import express from "express";
import { getTempRange, checkAlerts, isNumeric } from "./utilities";
const app = express();
const port = 3000;
const apiKey = process.env.WEATHER_API_KEY;

app.use((req, res, next) => {
  const latitude: any = req.query.lat;
  const longitude: any = req.query.lon;

  const latitudeIntCheck = isNumeric(latitude)
  const longitudeIntCheck = isNumeric(longitude)

  if (!latitudeIntCheck || !longitudeIntCheck ) {
    res
      .status(422)
      .send(
        "Invalid latitude or longitude format. Please verify latitude and longitude are in decimal degrees notation."
      );
  }

  const latitudeInt = parseInt(latitude);
  const longitudeInt = parseInt(longitude);

  const latitudeIntBool = latitudeInt > -90 && latitudeInt < 90;
  const longitudeIntBool = longitudeInt > -180 && longitudeInt < 180;

  console.log(latitudeIntBool, longitudeIntBool)

  if (!latitudeIntBool || !longitudeIntBool) {
    res
      .status(422)
      .send(
        "Invalid latitude or longitude format. Please verify latitude and longitude are in decimal degrees notation."
      );
  } else {
    next();
  }
});

app.get("/weather", async (req, res) => {
  const latitude = req.query.lat;
  const longitude = req.query.lon;

  const weatherDataRes = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&exclude=daily,hourly,minutely`
  );
  if (!weatherDataRes.ok) {
    res.status(500).send(`Downstream server returned error code ${weatherDataRes.status}`)
  }
  const weatherDataResJson = await weatherDataRes.json();

  //chose to use description instead of main here as it was more descriptive.
  const condition = weatherDataResJson.current.weather[0].description;
  const tempRange = getTempRange(weatherDataResJson.current.feels_like);
  const alerts = checkAlerts(weatherDataResJson);

  const responseObject = {
    condition: condition,
    temperatureRange: tempRange,
    alerts: alerts,
  };
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(responseObject));
});

const server = app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

export { app, server }
