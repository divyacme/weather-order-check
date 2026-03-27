require("dotenv").config();
const fs = require("fs");
const axios = require("axios");

const API_KEY = process.env.API_KEY;

// Read orders.json
const orders = JSON.parse(fs.readFileSync("orders.json", "utf8"));

// Apology message
function generateApology(customer, city, weather) {
  return `Hi ${customer}, your order to ${city} is delayed due to ${weather}. We appreciate your patience!`;
}

// Fetch weather from API
async function fetchWeather(city) {
  try {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    const response = await axios.get(url);

    const weather = response.data.weather[0].main;
    const temp = response.data.main.temp;

    console.log(`🌤 Weather in ${city}: ${weather}, Temperature: ${temp}K`);

    return weather;

  } catch (error) {

    console.log(`❌ weather in : ${city}`);

    return null;
  }
}

// Main processing
async function processOrders() {

  console.log("🔄 Checking weather for all orders...");

  const promises = orders.map(async (order) => {

    const weather = await fetchWeather(order.city);

    if (!weather) return;

    if (["Rain", "Snow", "Extreme"].includes(weather)) {

      order.status = "Delayed";

      const message = generateApology(order.customer, order.city, weather);

      console.log(message);

    } else {

      order.status = "On Time";

    }

  });

  // Parallel API calls
  await Promise.all(promises);

  // Update JSON file
  fs.writeFileSync("orders.json", JSON.stringify(orders, null, 2));

  console.log("✅ Orders updated successfully");

}

processOrders();