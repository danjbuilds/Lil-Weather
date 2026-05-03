// 9e3fdd12f19c6b30b13e3d9403a087ae


const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "9e3fdd12f19c6b30b13e3d9403a087ae";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);

        }
        catch(error){
            console.error(error)
            displayError(error)

        }

    }
    else{
        displayError("Please Enter a City")
    }

});

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    console.log(response);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    return await response.json();

}

function displayWeatherInfo(data){
    console.log(data);

    const {name: city,
         main: {temp, humidity},
          weather: [{description, id}] } = data;
    
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    const kTemp = temp;
    const cTemp = (kTemp - 273.15).toFixed(1);

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${cTemp}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    descDisplay.classList.add('descDisplay');
    weatherEmoji.classList.add('weatherEmoji');
    cityDisplay.classList.add('cityDisplay');
    tempDisplay.classList.add('tempDisplay');
    humidityDisplay.classList.add('humidityDisplay');

   
    
    
    card.appendChild(cityDisplay)
    card.appendChild(tempDisplay)
    card.appendChild(humidityDisplay)
    card.appendChild(descDisplay)
    card.appendChild(weatherEmoji)
    
}

function getWeatherEmoji(weatherId){

    switch (true) {
    case (weatherId >= 200 && weatherId < 300):
        return "⛈️";
    case (weatherId >= 300 && weatherId <= 321):
        return "🌦️";
    case (weatherId >= 500 && weatherId <= 504):
        return "🌧️";
    case (weatherId === 511):
        return "❄️🌧️";
    case (weatherId >= 520 && weatherId <= 531):
        return "🌧️";
    case (weatherId >= 600 && weatherId <= 622):
        return "❄️";
    case (weatherId >= 701 && weatherId <= 781):
        return "🌫️";
    case (weatherId === 800):
        return "☀️"; // Clear sky
    case (weatherId === 801):
        return "🌤️"; // Few clouds (Mostly Sunny)
    case (weatherId === 802):
        return "⛅"; // Scattered clouds (Partly Cloudy)
    case (weatherId === 803):
        return "🌥️"; // Broken clouds
    case (weatherId === 804):
        return "☁️"; // Overcast clouds (True Cloudy)
  
    default:
        return "?";
}


}
function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay")

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay)
}