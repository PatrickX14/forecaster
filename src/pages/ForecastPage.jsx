import React from "react";
import { useLoaderData } from "react-router";
import { WeatherDisplay, ForecastCards } from "./Components";

function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position.coords);
      });
    } else {
      reject("Permission Rejected");
    }
  });
}

export async function ForecastLoader() {
  const apiKey = "502aca5b00ba2ea3459840c0723269c2";
  try {
    const userLocation = await getLocation();

    // Send forecast request
    const forecastLink = `https://api.openweathermap.org/data/2.5/forecast?lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=${apiKey}&units=metric`;
    const forecastRes = await fetch(forecastLink);
    const forecastData = await forecastRes.json();

    // Send weather request
    const weatherLink = `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=${apiKey}&units=metric`;
    const weatherRes = await fetch(weatherLink);
    const weatherData = await weatherRes.json();

    return { forecastData, weatherData };
  } catch (err) {
    console.log("Error: ", err);
    return "Error";
  }
}

export default function ForecastPage() {
  const { forecastData, weatherData } = useLoaderData();
  return (
    <div className="flex flex-col items-center">
      <WeatherDisplay data={weatherData} />
      {/* <p className="text-2xl my-6">Forecast</p> */}
      <ForecastCards data={forecastData} />
    </div>
  );
}
