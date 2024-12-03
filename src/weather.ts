const fs = require('fs');

const main = async () => {
  const response = await fetch('https://api.hgbrasil.com/weather?woeid=455827', {
    method: 'GET',
    mode: 'cors'
  });
  const data = (await response.json()).results;

  const [forecast] = data.forecast;

  const temperature = data.temp;
  const maxTemperature = forecast.max;
  const minTemperature = forecast.min;
  const wind = forecast.min;
  const humidity = forecast.humidity;
  const rain = forecast.rain_probability;
  const imageConditionURL = `https://assets.hgbrasil.com/weather/icons/conditions/${forecast.condition}.svg`

  fs.mkdirSync('./src/assets/data', {
    recursive: true
  });
  fs.writeFileSync('./src/assets/data/weather.json', JSON.stringify({
    temperature,
    maxTemperature,
    minTemperature,
    wind,
    humidity,
    rain,
    imageConditionURL
  }));
}

main();
