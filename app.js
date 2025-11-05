const apiKey = "4dca6be6d4246f2bbf699b6a77f3b903";
const container = document.getElementById("weatherContainer");
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const defaultCities = ["Dhaka","Chittagong","Khulna","Rajshahi","Sylhet","Barisal","Rangpur","Mymensingh"];

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},BD&units=metric&appid=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();

  const card = document.createElement("div");
  card.classList.add("card");

  if (data.cod !== 200) {
    card.innerHTML = `<h2>${city}</h2><p>❌ তথ্য পাওয়া যায়নি</p>`;
  } else {
    card.innerHTML = `
      <h2>${data.name}</h2>
      <p class="temp">🌡️ ${data.main.temp}°C</p>
      <p>☁️ ${data.weather[0].description}</p>
      <p>💧 আর্দ্রতা: ${data.main.humidity}%</p>
      <p>🌬️ বাতাসের বেগ: ${data.wind.speed} m/s</p>
    `;
  }
  container.appendChild(card);
}

function loadDefaultCities() {
  container.innerHTML = "";
  defaultCities.forEach(city => getWeather(city));
}

searchBtn.onclick = () => {
  const city = cityInput.value.trim();
  if (!city) return alert("⚠️ শহরের নাম লিখুন!");
  container.innerHTML = "";
  getWeather(city);
};

cityInput.onkeypress = e => { if (e.key === "Enter") searchBtn.click(); };

loadDefaultCities();

// 🔐 Logout
function logout(){
  localStorage.removeItem("loggedUser");
  alert("✅ Logged out!");
  window.location.href = "login.html";
}
