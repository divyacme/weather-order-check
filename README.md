# Weather-Based Order Processing Script

## Description
This Node.js script checks the weather of different cities using a weather API.  
If the temperature is below 20°C and the weather condition is not cloudy, the order is processed successfully.  
Otherwise the order is rejected.

## Technologies Used
- Node.js
- JavaScript
- Axios (for API requests)

## Installation

1. Install Node.js
2. Install dependencies

npm install

## How to Run

Run the following command in terminal:

node weather-check.js

## Example Output

weather in : New York
❌ weather in : Mumbai
❌ weather in : InvalidCity123
❌ weather in : London
✅ Orders updated successfully
