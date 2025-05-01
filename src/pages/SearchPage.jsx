import React from "react";
import { WeatherDisplay, LoadingSpinner, ErrorDisplay } from "./Components";

export default function SearchPage() {
  const [city, setCity] = React.useState();
  const [weatherData, setWeatherData] = React.useState();
  const [isLoading, setLoading] = React.useState(false);
  const apiKey = "502aca5b00ba2ea3459840c0723269c2";
  const apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  function handleSumbitForm(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const location = formData.get("location");
    setCity(location);
  }

  React.useEffect(() => {
    if (!city) return;
    async function fetchWether() {
      try {
        setLoading(true);
        const res = await fetch(apiLink);
        const data = await res.json();
        setLoading(false);
        console.log(data);
        setWeatherData(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchWether();
  }, [city]);

  return (
    <div className="my-6">
      <p className="text-4xl">Weather Check</p>
      <div className="inputContainer">
        <form onSubmit={handleSumbitForm}>
          <label>Enter Location: </label>
          <input
            id="locationInput"
            name="location"
            placeholder="London..."
            className="p-2 rounded-xl	"
          />
          <button
            type="submit"
            className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 p-2 rounded-xl ml-1"
          >
            Submit
          </button>
        </form>
      </div>

      {weatherData?.cod == 404 && <ErrorDisplay />}

      {isLoading && <LoadingSpinner />}

      {!isLoading && weatherData?.cod == 200 && (
        <WeatherDisplay data={weatherData} />
      )}
    </div>
  );
}
