import React, { useState, useEffect } from "react";

export const Weather = () => {
  const [weather, setWeather] = useState([]);

  const wxKey = "f978b8bd1b4bf05ce67d577615e8a6a0";

  const getLocation = () => {
    const success = (pos) => {
      const crd = pos.coords;
      const latitude = crd.latitude;
      const longitude = crd.longitude;
      getWeather(latitude, longitude, wxKey)
        .then((res) => res.json())
        .then((weather = setWeather(weather)));
    };

    const error = (err) => {
      console.warn("Unable to find local weather");
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  const getWeather = (lat, lon, wxKey) => {
    return fetch(
      `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${wxKey}`
    );
  };

  useEffect(() => {
    getLocation();
  }, []);
  return null;
};
