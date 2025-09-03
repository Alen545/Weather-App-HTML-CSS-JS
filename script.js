const apiKey = "YOUR_API_KEY"

// Build UI dynamically
const container = document.createElement("div");
container.className = "container";
document.body.appendChild(container);

const header = document.createElement("h1");
header.textContent = "🌤 Weather App";
container.appendChild(header);

const searchBox = document.createElement("div");
searchBox.className = "search-box";
container.appendChild(searchBox);

const cityInput = document.createElement("input");
cityInput.type = "text";
cityInput.placeholder = "Enter city name...";
searchBox.appendChild(cityInput);

const searchBtn = document.createElement("button");
searchBtn.textContent = "Search";
searchBox.appendChild(searchBtn);

const weatherCard = document.createElement("div");
weatherCard.className = "weather-card";
container.appendChild(weatherCard);

const cityName = document.createElement("h2");
weatherCard.appendChild(cityName);

const iconImg = document.createElement("img");
weatherCard.appendChild(iconImg);

const temperature = document.createElement("p");
weatherCard.appendChild(temperature);

const description = document.createElement("p");
weatherCard.appendChild(description);

const humidity = document.createElement("p");
weatherCard.appendChild(humidity);

// Fetch and display weather
async function getWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();

    cityName.textContent = `${data.location.name}, ${data.location.country}`;
    iconImg.src = `https:${data.current.condition.icon}`;
    iconImg.alt = data.current.condition.text;
    temperature.textContent = `${data.current.temp_c}°C`;
    description.textContent = data.current.condition.text;
    humidity.textContent = `Humidity: ${data.current.humidity}%`;
  } catch {
    cityName.textContent = "Error";
    iconImg.src = "";
    iconImg.alt = "";
    temperature.textContent = "--°C";
    description.textContent = "City not found!";
    humidity.textContent = "";
  }
}

// Events
searchBtn.addEventListener("click", () => {
  if (cityInput.value.trim()) getWeather(cityInput.value.trim());
});
cityInput.addEventListener("keypress", e => {
  if (e.key === "Enter") searchBtn.click();
});
