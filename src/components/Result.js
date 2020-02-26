import React from "react";

const Result = props => {
  const {
    err,
    city,
    date,
    sunrise,
    sunset,
    temperature,
    pressure,
    wind
  } = props.weather;

  let content = null;
  if (!err && city) {
    let sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    let sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
    content = (
      <section>
        <h3>
          Pogoda dla : <strong>{city}</strong>
        </h3>
        <h4>Dane dla {date} </h4>
        <h4> Aktualna temperatura: {temperature} &#176;C </h4>
        <h4> Wschód słońca o: {sunriseTime} </h4>
        <h4> Zachód słońca o: {sunsetTime} </h4>
        <h4> Aktualne ciśnienie: {pressure} hPa </h4>
        <h4> Prędkość wiatru: {wind} m/s </h4>
      </section>
    );
  }
  return (
    <div className="result">{err ? `Nie mamy w bazie ${city}` : content}</div>
  );
};
export default Result;
