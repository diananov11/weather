//greetings
function greeting() {
  let nameUser = prompt("what is your name?");
  let p = document.getElementById("greetings");
  p.innerHTML = `Here is how your day look like ${nameUser}!!✨👋`;
}
setTimeout(greeting, 1200);

//set date-time
function dateTime() {
  let dateTime = document.getElementById("date-time");
  dateTime.innerHTML = moment().format(
    "HH:mm [<small>]A [</br>] dddd, LL [</small>]"
  );
}
setInterval(dateTime, 1000);

//fetch API city
async function displayCity(city) {
  try {
    let apiUrlCity = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
    );
    let apiJsonCity = await apiUrlCity.json();
    let dataPosition = apiJsonCity.results[0];
    let lat = dataPosition.latitude;
    let lon = dataPosition.longitude;
    displayWeather(lat, lon);
  } catch (error) {
    alert("Maaf🙏 Saat ini data kota kamu belum tersedia nihh gan😢");
  }
}

// fetch API current weather
async function displayWeather(lat, lon) {
  try {
    let apiUrlWeather = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min`
    );
    let response = await apiUrlWeather.json();

    //API for get your location name
    let apiKey = "9f57e2225a8c49822dd68e093bafa9b5";
    let apiUrlLocation = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );
    let data = await apiUrlLocation.json();
    let h1 = document.getElementById("city");
    h1.innerHTML = data.name;

    // inject today
    let today = document.getElementById("today");
    today.innerHTML = moment().format("dddd");

    //current image
    let currentImg = document.getElementById("current-weather-img");
    let condition = document.getElementById("condition");
    if (response.current.is_day === 1) {
      currentImg.innerHTML = `<img src="${
        wmo[response.current.weather_code].day.image
      }" alt="" class="image-weather">`;
      condition.innerHTML = wmo[response.current.weather_code].day.description;
    } else {
      currentImg.innerHTML = `<img src="${
        wmo[response.current.weather_code].night.image
      }" alt="" class="image-weather">`;
      condition.innerHTML =
        wmo[response.current.weather_code].night.description;
    }

    //current weather
    let currentTemp = document.getElementById("temp");
    currentTemperature = Math.round(response.current.temperature_2m);
    currentTemp.innerHTML = `${currentTemperature}`;

    //current wind
    let wind = document.getElementById("wind");
    currentWind = Math.round(response.current.wind_speed_10m);
    wind.innerHTML = `<i class="fa-solid fa-wind" style="color: #74C0FC;"></i> ${currentWind} km/h`;

    //current humidity
    let humidity = document.getElementById("humidity");
    humidity.innerHTML = `<i class="fa-solid fa-droplet" style="color: #74C0FC;"></i> ${response.current.relative_humidity_2m} %`;

    //forecast
    console.log(response);
    let forecast = document.getElementById("forecast-weather-day");
    let forecastData = response.daily;
    let tempMax = forecastData.temperature_2m_max;
    let tempMin = forecastData.temperature_2m_min;
    let days = forecastData.time;
    let forecastHtml = "";
    for (let i = 1; i < days.length; i++) {
      forecastHtml += `<div><div class="day">${moment()
        .add([i], "days")
        .format("dddd")}</div>
            <img src=${
              wmo[forecastData.weather_code[i]].day.image
            } alt="" class="image-weather">
            <div class="forecast-weather-temperature">
              <div class="weather-forecast-temp"><strong>${Math.round(
                tempMax[i]
              )}°</strong></div>
              <div class="weather-forecast-temp">${Math.round(
                tempMin[i]
              )}°</div>
            </div>
          </div></div>`;
      forecast.innerHTML = forecastHtml;
    }
  } catch (error) {
    alert("error");
  }
}

//handle search
function searchButton(event) {
  event.preventDefault();
  let inputCity = document.getElementById("input-city").value;
  displayCity(inputCity);
}

//handle your location
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  displayWeather(lat, lon);
}

function changeCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

displayCity("Australia");

//wmo weather code image
let wmo = {
  0: {
    day: {
      description: "Sunny",
      image: "http://openweathermap.org/img/wn/01d@2x.png",
    },
    night: {
      description: "Clear",
      image: "http://openweathermap.org/img/wn/01n@2x.png",
    },
  },
  1: {
    day: {
      description: "Mainly Sunny",
      image: "http://openweathermap.org/img/wn/01d@2x.png",
    },
    night: {
      description: "Mainly Clear",
      image: "http://openweathermap.org/img/wn/01n@2x.png",
    },
  },
  2: {
    day: {
      description: "Partly Cloudy",
      image: "http://openweathermap.org/img/wn/02d@2x.png",
    },
    night: {
      description: "Partly Cloudy",
      image: "http://openweathermap.org/img/wn/02n@2x.png",
    },
  },
  3: {
    day: {
      description: "Cloudy",
      image: "http://openweathermap.org/img/wn/03d@2x.png",
    },
    night: {
      description: "Cloudy",
      image: "http://openweathermap.org/img/wn/03n@2x.png",
    },
  },
  45: {
    day: {
      description: "Foggy",
      image: "http://openweathermap.org/img/wn/50d@2x.png",
    },
    night: {
      description: "Foggy",
      image: "http://openweathermap.org/img/wn/50n@2x.png",
    },
  },
  48: {
    day: {
      description: "Rime Fog",
      image: "http://openweathermap.org/img/wn/50d@2x.png",
    },
    night: {
      description: "Rime Fog",
      image: "http://openweathermap.org/img/wn/50n@2x.png",
    },
  },
  51: {
    day: {
      description: "Light Drizzle",
      image: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    night: {
      description: "Light Drizzle",
      image: "http://openweathermap.org/img/wn/09n@2x.png",
    },
  },
  53: {
    day: {
      description: "Drizzle",
      image: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    night: {
      description: "Drizzle",
      image: "http://openweathermap.org/img/wn/09n@2x.png",
    },
  },
  55: {
    day: {
      description: "Heavy Drizzle",
      image: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    night: {
      description: "Heavy Drizzle",
      image: "http://openweathermap.org/img/wn/09n@2x.png",
    },
  },
  56: {
    day: {
      description: "Light Freezing Drizzle",
      image: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    night: {
      description: "Light Freezing Drizzle",
      image: "http://openweathermap.org/img/wn/09n@2x.png",
    },
  },
  57: {
    day: {
      description: "Freezing Drizzle",
      image: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    night: {
      description: "Freezing Drizzle",
      image: "http://openweathermap.org/img/wn/09n@2x.png",
    },
  },
  61: {
    day: {
      description: "Light Rain",
      image: "http://openweathermap.org/img/wn/10d@2x.png",
    },
    night: {
      description: "Light Rain",
      image: "http://openweathermap.org/img/wn/10n@2x.png",
    },
  },
  63: {
    day: {
      description: "Rain",
      image: "http://openweathermap.org/img/wn/10d@2x.png",
    },
    night: {
      description: "Rain",
      image: "http://openweathermap.org/img/wn/10n@2x.png",
    },
  },
  65: {
    day: {
      description: "Heavy Rain",
      image: "http://openweathermap.org/img/wn/10d@2x.png",
    },
    night: {
      description: "Heavy Rain",
      image: "http://openweathermap.org/img/wn/10n@2x.png",
    },
  },
  66: {
    day: {
      description: "Light Freezing Rain",
      image: "http://openweathermap.org/img/wn/10d@2x.png",
    },
    night: {
      description: "Light Freezing Rain",
      image: "http://openweathermap.org/img/wn/10n@2x.png",
    },
  },
  67: {
    day: {
      description: "Freezing Rain",
      image: "http://openweathermap.org/img/wn/10d@2x.png",
    },
    night: {
      description: "Freezing Rain",
      image: "http://openweathermap.org/img/wn/10n@2x.png",
    },
  },
  71: {
    day: {
      description: "Light Snow",
      image: "http://openweathermap.org/img/wn/13d@2x.png",
    },
    night: {
      description: "Light Snow",
      image: "http://openweathermap.org/img/wn/13n@2x.png",
    },
  },
  73: {
    day: {
      description: "Snow",
      image: "http://openweathermap.org/img/wn/13d@2x.png",
    },
    night: {
      description: "Snow",
      image: "http://openweathermap.org/img/wn/13n@2x.png",
    },
  },
  75: {
    day: {
      description: "Heavy Snow",
      image: "http://openweathermap.org/img/wn/13d@2x.png",
    },
    night: {
      description: "Heavy Snow",
      image: "http://openweathermap.org/img/wn/13n@2x.png",
    },
  },
  77: {
    day: {
      description: "Snow Grains",
      image: "http://openweathermap.org/img/wn/13d@2x.png",
    },
    night: {
      description: "Snow Grains",
      image: "http://openweathermap.org/img/wn/13n@2x.png",
    },
  },
  80: {
    day: {
      description: "Light Showers",
      image: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    night: {
      description: "Light Showers",
      image: "http://openweathermap.org/img/wn/09n@2x.png",
    },
  },
  81: {
    day: {
      description: "Showers",
      image: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    night: {
      description: "Showers",
      image: "http://openweathermap.org/img/wn/09n@2x.png",
    },
  },
  82: {
    day: {
      description: "Heavy Showers",
      image: "http://openweathermap.org/img/wn/09d@2x.png",
    },
    night: {
      description: "Heavy Showers",
      image: "http://openweathermap.org/img/wn/09n@2x.png",
    },
  },
  85: {
    day: {
      description: "Light Snow Showers",
      image: "http://openweathermap.org/img/wn/13d@2x.png",
    },
    night: {
      description: "Light Snow Showers",
      image: "http://openweathermap.org/img/wn/13n@2x.png",
    },
  },
  86: {
    day: {
      description: "Snow Showers",
      image: "http://openweathermap.org/img/wn/13d@2x.png",
    },
    night: {
      description: "Snow Showers",
      image: "http://openweathermap.org/img/wn/13n@2x.png",
    },
  },
  95: {
    day: {
      description: "Thunderstorm",
      image: "http://openweathermap.org/img/wn/11d@2x.png",
    },
    night: {
      description: "Thunderstorm",
      image: "http://openweathermap.org/img/wn/11n@2x.png",
    },
  },
  96: {
    day: {
      description: "Light Thunderstorms With Hail",
      image: "http://openweathermap.org/img/wn/11d@2x.png",
    },
    night: {
      description: "Light Thunderstorms With Hail",
      image: "http://openweathermap.org/img/wn/11n@2x.png",
    },
  },
  99: {
    day: {
      description: "Thunderstorm With Hail",
      image: "http://openweathermap.org/img/wn/11d@2x.png",
    },
    night: {
      description: "Thunderstorm With Hail",
      image: "http://openweathermap.org/img/wn/11n@2x.png",
    },
  },
};
