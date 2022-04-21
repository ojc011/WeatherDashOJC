var key = "64f2ee2a8261daa4d9f780f5b365f275";
var city = "Denver";

var dateTime = moment().format("dddd, MMMM Do YYYY");
console.log(dateTime);

var cityHist = [];
$(".search").on("click", function (event) {
  event.preventDefault();
  city = $(this).parent(".btnPar").siblings(".textVal").val().trim();
  if (city === "") {
    return;
  }
  cityHist.push(city);
  console.log(cityHist);

  localStorage.setItem("city", JSON.stringify(cityHist));
  getHistory();
  getWeatherToday();
});

var contHistEl = $(".cityHist");
function getHistory() {
  contHistEl.empty();

  for (let i = 0; i < cityHist.length; i++) {
    var rowEl = $("<row>");
    var btnEl = $("<button>").text(`${cityHist[i]}`);

    rowEl.addClass("row histBtnRow");
    btnEl.addClass("btn btn-outline-secondary");
    btnEl.attr("type", "button");

    contHistEl.prepend(rowEl);
    rowEl.append(btnEl);
  }

  if (!city) {
    return;
  }
}

var cardTodayBody = $(".cardBodyToday");

function getWeatherToday() {
  var getUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;

  $(cardTodayBody).empty();

  $.ajax({
    url: getUrlCurrent,
    method: "GET",
  }).then(function (response) {
    $(".cardTodayCityName").text(response.name);
    $(".cardTodayDate").text(dateTime);
    var pEl = $("<p>").text(`Temperature: ${response.main.temp} °F`);
    cardTodayBody.append(pEl);
    var pElTemp = $("<p>").text(`Feels Like: ${response.main.feels_like} °F`);
    cardTodayBody.append(pElTemp);
    var pElHumid = $("<p>").text(`Humidity: ${response.main.humidity} %`);
    cardTodayBody.append(pElHumid);
    var pElWind = $("<p>").text(`Wind Speed: ${response.wind.speed} MPH`);
    cardTodayBody.append(pElWind);
    var cityLon = response.coord.lon;
    console.log(cityLon);
    var cityLat = response.coord.lat;
    console.log(cityLat);

    var getUrlUvi = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=hourly,daily,minutely&appid=${key}`;

    $.ajax({
      url: getUrlUvi,
      method: "GET",
    }).then(function (response) {
      var pElUvi = $("<p>").text(`UV Index: `);
      var uviSpan = $("<span>").text(response.current.uvi);
      var uvi = response.current.uvi;
      pElUvi.append(uviSpan);
      cardTodayBody.append(pElUvi);
      if (uvi >= 0 && uvi <= 2) {
        uviSpan.attr("class", "green");
      } else if (uvi > 2 && uvi <= 5) {
        uviSpan.attr("class", "yellow");
      } else if (uvi > 5 && uvi <= 7) {
        uviSpan.attr("class", "orange");
      } else if (uvi > 7 && uvi <= 10) {
        uviSpan.attr("class", "red");
      } else {
        uviSpan.attr("class", "purple");
      }
    });
  });
}

function initLoad() {
  var cityHistStore = JSON.parse(localStorage.getItem("city"));

  if (cityHistStore !== null) {
    cityHist = cityHistStore;
  }
  getHistory();
  getWeatherToday();
}

initLoad();

// var getUrlCurrentUV = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`;
// var getUrlFiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial,us&mode=xml&appid=${key}`;

// var getUrlIcons = `https://http://openweathermap.org/img`;

// fetch(getUrlCurrent)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log('Fetch Response');
//     console.log(data);
//   });

//imgEl.setAttribute('src',`http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
