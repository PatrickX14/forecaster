import dayjs from "dayjs";
import conditionImage from "./conditionimages.json";
import countries from "i18n-iso-countries";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

function capitalizeString(mesesage) {
  const stringArray = mesesage.split(" ");
  for (let i = 0; i < stringArray.length; i++) {
    stringArray[i] =
      stringArray[i].charAt(0).toUpperCase() + stringArray[i].slice(1);
  }
  const capitalizedString = stringArray.join(" ");
  return capitalizedString;
}

export function WeatherDisplay(props) {
  const { data } = props;

  const temereture = parseInt(data.main.temp).toFixed();
  const feelsLike = parseInt(data.main.feels_like).toFixed();
  const description = capitalizeString(data.weather[0].description);
  const countryName = countries.getName(data.sys.country, "en");
  const imageName = conditionImage[data.weather[0].icon];

  console.log(data);

  return (
    <div className="flex flex-col items-center my-6">
      <p className="text-2xl font-bold">{data.name}</p>
      <p className="text-lg">{countryName}</p>
      <img src={`/images/condition/${imageName}`} width="150" height="100" />
      <p className="text-5xl">{temereture}°</p>
      <p>Feels like {feelsLike}°</p>
      <p>{description}</p>
      <div
        className="flex justify-between items-center mt-4"
        style={{ width: "800px" }}
      >
        <div className="flex flex-col items-center space-y-4">
          <img src="/images/humidity.png" width="40" height="40" />
          <p className="txt-bold">{data.main.humidity}%</p>
          <p className="txt-bold">Humidity</p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <img src="/images/windspeed.png" width="40" height="40" />
          <p className="txt-bold">{data.wind.speed} km/h</p>
          <p className="txt-bold">Wind Speed</p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <img src="/images/pressure.png" width="40" height="40" />
          <p className="txt-bold">{data.main.pressure} mb</p>
          <p className="txt-bold">Presure</p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <img src="/images/visibility.png" width="40" height="40" />
          <p className="txt-bold">{data.visibility / 1000} km</p>
          <p className="txt-bold">Visibility</p>
        </div>
      </div>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div role="status" className="flex justify-center items-center h-40">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function ForecastCards(props) {
  const { data } = props;
  const filterdWeather = data.list.slice(0, 6);
  return (
    <div className="flex justify-around my-6 w-6/12">
      {filterdWeather.map((weatherData, index) => {
        const time = dayjs(weatherData.dt_txt).format("h a");
        const tempereture = parseInt(weatherData.main.temp).toFixed();
        const imageName = conditionImage[weatherData.weather[0].icon];

        return (
          <div
            key={index}
            className="flex flex-col items-center bg-indigo-950 bg-gradient-to-t from-purple-500 rounded-3xl p-2"
          >
            <p className="txt-bold text-lg	">{tempereture}°</p>
            <img
              src={`/images/condition/${imageName}`}
              width="110"
              height="110"
            />
            <p className="txt-bold text-lg	">{time}</p>
          </div>
        );
      })}
    </div>
  );
}

export function ErrorDisplay() {
  return (
    <div className="flex flex-col items-center my-6">
      <img src="/images/notfound.png" width="240" />
      <p className="text-red-600 text-3xl my-6">Invalid location</p>
    </div>
  );
}
