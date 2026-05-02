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
    humidityDisplay.textContent = `${humidity}%`;
    

    card.appendChild(cityDisplay)
    card.appendChild(tempDisplay)
    card.appendChild(humidityDisplay)
    card.appendChild(descDisplay)
    
}

function getWeatherEmoji(weatherId){

}
function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay")

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay)
}