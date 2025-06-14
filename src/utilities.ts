export function getTempRange(temp: number) {
  if (temp > 25) {
    return "hot";
  } else if (temp >= 20 && temp <= 25) {
    return "moderate";
  } else {
    return "cold";
  }
}

export function checkAlerts(weatherData: any) {
  if (weatherData.hasOwnProperty("alerts")) {
    return weatherData.alerts;
  } else {
    return ["No current weather alerts at this location."];
  }
}

//this function was generated by Gemini from a Google search of "check if values in a string are numeric js"
export function isNumeric(str: string) {
  if (str.startsWith("-")) {
    const cleanesedString = str.slice(1);
    return /^\d+(\.\d+)?$/.test(cleanesedString);
  }
  return /^\d+(\.\d+)?$/.test(str);
}
