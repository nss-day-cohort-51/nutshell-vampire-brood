import React, { useState, useEffect } from "react";
import { RT } from "../components/tools/HelperFunctions";

export const Weather = () => {
    const [weather, setWeather] = useState({ weather: [] });
    const [weatherCondition, setWeatherCondition] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const dateString = new Date(weather.dt * 1000);
    const formattedDate = dateString.toDateString();
    const formattedTemp = Math.floor(weather.main?.temp);

    const getLocation = () => {
        const success = (pos) => {
            const crd = pos.coords;
            let latitude = crd.latitude;
            let longitude = crd.longitude;
            console.log(latitude, longitude);
            return fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=f978b8bd1b4bf05ce67d577615e8a6a0`
            )
                .then((res) => res.json())
                .then((weather) => setWeather(weather));
        };

        const error = (err) => {
            console.warn("Unable to find local weather");
        };

        navigator.geolocation.getCurrentPosition(success, error);
    };

    const getCondition = () => {
        setWeatherCondition(weather.weather[0]?.main);
    };

    useEffect(() => {
        getLocation();
    }, []);

    useEffect(() => {
        getCondition();
    }, [weather]);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const returnCard = isLoading ? (
        <></>
    ) : (
        <article class="widget">
            <div class="weatherInfo">
                <div class="temperature">
                    <span>{formattedTemp}&deg;</span>
                </div>
                <div class="description">
                    <div class="weatherCondition">{RT(weatherCondition)}</div>
                </div>
            </div>
            <div class="date">{RT(formattedDate)}</div>
        </article>
    );
    return returnCard;
};
