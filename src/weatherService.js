const API_KEY = "bfe87b9f2153eaebedffc35ace2ef754";

const makeIconURL = (iconId) => {
  return `https://openweathermap.org/img/wn/${iconId}@2x.png`;
};

export const getFlag = async (country) => {
  return (await fetch(`https://countryflagsapi.com/png/${country}`)).then(
    (res) => res.json()
  );
};

const getFormatedWeatherData = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);

  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;
  console.log(country);

  const { description, icon } = weather[0];
  return {
    description,
    iconURL: makeIconURL(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    country,
    name,
  };
};

export default getFormatedWeatherData;
