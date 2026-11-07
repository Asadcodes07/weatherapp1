
// 1. API KEY
const apiKey = "1faa9871a21e2133f9d3c4765f778b11";

// 2. HTML ELEMENTS
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


// 3. WEATHER FUNCTION
async function checkWeather(city) {

    try {

        // API URL
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

        // Fetch API data
        const response = await fetch(apiURL);

        // Check response
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        // Convert response into JSON
        const data = await response.json();

        console.log(data);

        // Display weather information
        document.querySelector(".city").innerHTML = data.name;

        document.querySelector(".temp").innerHTML =
            Math.round(data.main.temp) + "°C";

        document.querySelector(".humidity").innerHTML =
            data.main.humidity + "%";

        document.querySelector(".wind").innerHTML =
            data.wind.speed + " km/h";


        // Weather icons
        const condition = data.weather[0].main;

        if (condition === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        }
        else if (condition === "Clear") {
            weatherIcon.src = "images/clear.png";
        }
        else if (condition === "Rain") {
            weatherIcon.src = "images/rain.png";
        }
        else if (condition === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        }
        else if (condition === "Mist") {
            weatherIcon.src = "images/mist.png";
        }
        else if (condition === "Snow") {
            weatherIcon.src = "images/snow.png";
        }
        else if (condition === "Thunderstorm") {
            weatherIcon.src = "images/rain.png";
        }
        else {
            weatherIcon.src = "images/clouds.png";
        }


        // Show weather card
        document.querySelector(".weather").style.display = "block";

        // Hide error message
        document.querySelector(".error").style.display = "none";

    }

    catch (error) {

        console.log("Weather API Error:", error.message);

        document.querySelector(".error").innerHTML =
            "Error: " + error.message;

        document.querySelector(".error").style.display = "block";

        document.querySelector(".weather").style.display = "none";
    }
}


// 4. SEARCH BUTTON EVENT
searchBtn.addEventListener("click", () => {

    const city = searchBox.value.trim();

    if (city !== "") {
        checkWeather(city);
    }

});


// 5. ENTER KEY EVENT
searchBox.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        const city = searchBox.value.trim();

        if (city !== "") {
            checkWeather(city);
        }

    }

});
