let unit = 'C';
let currentTempC;
let general;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    $('#city-country').text('Geolocation is not supported by this browser.');
  }
}

function showPosition(position) {
  callAPI(position.coords.latitude, position.coords.longitude);
}

function callAPI(lat, lon) {
  var url_lat_lon = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;
  getWeather(url_lat_lon);
}

function getWeather(url_lat_lon) {
  $.ajax({
    type: 'GET',
    url: url_lat_lon,
    cache: false,
    success: function(data) {
      $('#city-country').text(`${data.name}, ${data.sys.country}`);
      currentTempC = data.main.temp;
      $('#current-degrees').text(`${currentTempC} °${unit}`);
      general = data.weather[0].main;
      $('#general').text(`${general}`);
      $('#general').addClass(general);
      addIcon(general);
      // remove loader
      $('#page-loader').removeClass('loader');
    }
  });
}

function addIcon(general) {
  switch (general) {
    case 'Clouds':
      $('#weather-icon').addClass('wi wi-cloud');
      break;
    case 'Rain':
      $('#weather-icon').addClass('wi wi-rain');
      break;
    case 'Drizzle':
      $('#weather-icon').addClass('wi wi-sprinkle');
      break;
    case 'Snow':
      $('#weather-icon').addClass('wi wi-snow');
      break;
    case 'Clear':
      $('#weather-icon').addClass('wi wi-day-sunny');
      break;
    case 'Mist':
      $('#weather-icon').addClass('wi-raindrops');
      break;
    case 'Smoke':
      $('#weather-icon').addClass('wi-smoke');
      break;
    case 'Thunderstorm':
      $('#weather-icon').addClass('wi-thunderstorm');
      break;
    default:
      console.log('Sorry, we are out of ' + expr + '.');
  }
}

function cToF() {
  const cToFahr = currentTempC * 9 / 5 + 32;
  $('#current-degrees').text(`${cToFahr} °F`);
  unit = 'F';
}

function fToC() {
  $('#current-degrees').text(`${currentTempC} °C`);
  unit = 'C';
}

$(document).ready(function() {
  getLocation();
  $('#current-degrees').click(function() {
    if (unit === 'C') {
      cToF();
    } else {
      fToC();
    }
  });
});
