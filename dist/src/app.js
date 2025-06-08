"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const utilities_1 = require("./utilities");
const app = (0, express_1.default)();
exports.app = app;
const port = 3000;
const apiKey = process.env.WEATHER_API_KEY;
app.use((req, res, next) => {
    const latitude = req.query.lat;
    const longitude = req.query.lon;
    if (latitude === undefined || longitude === undefined) {
        res
            .status(400)
            .send("ERROR: Required values for latitude and or longitude not provided.");
    }
    const latitudeIntCheck = (0, utilities_1.isNumeric)(latitude);
    const longitudeIntCheck = (0, utilities_1.isNumeric)(longitude);
    if (!latitudeIntCheck || !longitudeIntCheck) {
        res
            .status(422)
            .send("ERROR: Invalid latitude or longitude format. Please verify latitude and longitude are in decimal degrees notation.");
    }
    const latitudeInt = parseInt(latitude);
    const longitudeInt = parseInt(longitude);
    const latitudeIntBool = latitudeInt > -90 && latitudeInt < 90;
    const longitudeIntBool = longitudeInt > -180 && longitudeInt < 180;
    if (!latitudeIntBool || !longitudeIntBool) {
        res
            .status(422)
            .send("ERROR: Invalid latitude or longitude format. Please verify latitude and longitude are in decimal degrees notation.");
    }
    else {
        req.latitude = latitude;
        req.longitude = longitude;
        next();
    }
});
app.get("/weather", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const weatherDataRes = yield fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${req.latitude}&lon=${req.longitude}&appid=${apiKey}&units=metric&exclude=daily,hourly,minutely`);
    if (!weatherDataRes.ok) {
        res
            .status(500)
            .send(`Downstream server returned error code ${weatherDataRes.status}`);
    }
    const weatherDataResJson = yield weatherDataRes.json();
    //chose to use description instead of main here as it was more descriptive.
    const condition = weatherDataResJson.current.weather[0].description;
    const tempRange = (0, utilities_1.getTempRange)(weatherDataResJson.current.feels_like);
    const alerts = (0, utilities_1.checkAlerts)(weatherDataResJson);
    const responseObject = {
        condition: condition,
        temperatureRange: tempRange,
        alerts: alerts,
    };
    res.setHeader("Content-Type", "application/json");
    res.send(responseObject);
}));
const server = app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
exports.server = server;
//# sourceMappingURL=app.js.map