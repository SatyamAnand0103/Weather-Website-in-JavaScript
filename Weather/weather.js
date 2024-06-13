//to display the local time with date and name of week day.
let weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let monthname = [
  "January",
  "February",
  "Marcha",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let d = new Date();
let date = d.getDate();
let year = d.getFullYear();
let month = monthname[d.getMonth()];
let dayname = weekday[d.getDay()];

let showTime = () => {
  let d = new Date();
  let hour = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();

  if (hour >= 6 && hour <= 18) {
    document.querySelector(".bottomBox").style.background =
      " linear-gradient(to bottom right, #6495ed, #87ceeb)";
    document.getElementById("sun").style.display = "block";
  } else {
    document.querySelector(".bottomBox").style.background = "#000033";
    document.getElementById("moon").style.display = "block";
    document.getElementById("sun").style.display = "none";
  }

  var session = "AM";
  // if (hour == 0) {
  //   hour = 12;
  // }
  if (hour > 12) {
    hour = hour - 12;
    session = "PM";
  }

  hour = hour < 10 ? "0" + hour : hour;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let currentTime = hour + ":" + minutes + ":" + seconds + "  " + session;
  document.getElementById("time").innerText = " Local Time  : " + currentTime;
  setTimeout(showTime, 1000);
};

document.getElementById("dayname").innerHTML = dayname;
document.getElementById("date").innerHTML = date;
document.getElementById("month").innerHTML = month;
document.getElementById("year").innerHTML = year + " " + "  ";
showTime();
//-------------------------------------------- -----------------------------------------------------------------------

var cityName;
var cityName = document.getElementById("myText").value;

//get value from the boxes on the top of the page
function setvaluefor1() {
  document.getElementById("myText").value = "Tokyo";
  cityName = "Tokyo";
}
function setvaluefor2() {
  document.getElementById("myText").value = "Chicago";
  cityName = "Chicago";
}
function setvaluefor3() {
  document.getElementById("myText").value = "Singapore";
  cityName = "Singapore";
}
function setvaluefor4() {
  document.getElementById("myText").value = "London";
  cityName = "London";
}

function setvaluefor5() {
  document.getElementById("myText").value = "Sydney";
  cityName = "Sydney";
}

//writing the innerHTML Satyam Anand on right top of screen.
document.querySelector(".line2").innerHTML = "Satyam_Anand";

var sec = d.getSeconds();

// Getting the city name on entering in the input type = text;
function fetchCityName() {
  cityName = document.getElementById("myText").value;

  return cityName;
}

let createbox2 = document.createElement("div");
createbox2.className = "horizontalLine";
document.body.append(createbox2);

//using fetch api through async await;

/*
async function fetchWeatherDetails() {
  let apid = "76258a96b01c7b9541d247ade9e2cfc5";
  let unit = "metric";
  let cityName = "delhi";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apid}&units=${unit}`
  );
  let data = await response.json();

  // .then((weather) => {
  // console.log(weather);
  //  return weather.json();
  // })
  //.then((data) => {
  console.log(data);
  document.getElementById("place_name").innerHTML = data.name + " , IN ";

}
// */

// using enter button to get the details of weather .
window.addEventListener("keydown", function (e) {
  if (e.which === 13) {
    fetchCityName();
    fetchWeatherDetails(cityName);
  }
});

// a function to fetch the weather details ...

function fetchWeatherDetails(cityName) {
  if (cityName === "") {
    document.getElementById("showError").style.display = "block";
    document.getElementById("cityNotFound").style.display = "none";
    return;
  } else {
    document.getElementById("showError").style.display = "none";
  }
  //to show the image of loader
  document.getElementById("loader").style.display = "block";

  let apid = "76258a96b01c7b9541d247ade9e2cfc5";
  let unit = "metric";
  // let city = cityName;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apid}&units=${unit}`
  )
    .then((weather) => {
      console.log(weather);
      return weather.json();
    })
    .then((data) => {
      console.log(data);

      if (data.cod !== 200) {
        //handle ERROR part
        document.getElementById("cityNotFound").style.display = "block";
        document.getElementById("cityNotFound").innerHTML =
          data.message + "  , enter a valid City Name !";
        document.getElementById("loader").style.display = "none";

        return;
      } else {
        document.getElementById("cityNotFound").style.display = "none";

        document.getElementById("place_name").innerHTML =
          data.name + " , " + data.sys.country;
        document.getElementById("temperature").innerHTML =
          Math.round(data.main.temp) + " &#8451 ";

        document.getElementById("forRealFeelContent").innerHTML =
          Math.round(data.main.feels_like) + " &#8451 ";

        document.getElementById("forPressureContents").innerHTML =
          data.main.pressure + " mbar ";

        document.getElementById("forWindspeedContents").innerHTML =
          Math.round(data.wind.speed) + " km/hr";

        document.getElementById("humid").innerHTML =
          data.main.humidity + "  %  ";

        let a = (document.getElementById("weatherType").innerHTML =
          data.weather[0].description);
        let b = document.getElementById("weatherImg");
        // b.className = "weatherImg";
        document.getElementById("loader").style.display = "none";
        //-----------------------------------------------------------------------------------------------------------------------------

        switch (a) {
          case "clear sky":
            b.style.backgroundImage = "url('images/clearSky.png')";
            break;

          case "overcast clouds":
            b.style.backgroundImage = "url('images/overcastclouds.png')";
            b.style.zIndex = "1";
            break;

          case "haze":
            b.style.backgroundImage = "url('images/haze2.png')";
            b.style.zIndex = "1";
            break;

          case "broken clouds":
            b.style.backgroundImage = "url('images/brokenclouds.png')";
            b.style.zIndex = "1";

            break;

          case "light rain":
            b.style.backgroundImage = "url('images/lightrain.png')";
            b.style.zIndex = "1";

            break;

          case "high intensity rain":
            b.style.backgroundImage = "url('images/heavyrain.png')";
            b.style.zIndex = "1";

            break;

          case "thunderstorm with light rain":
            b.style.backgroundImage = "url('images/thunderandlightining.png')";
            b.style.zIndex = "1";

            break;

          case "mist":
            b.style.backgroundImage = "url('images/mist.png')";
            b.style.zIndex = "1";

            break;

          case "few clouds":
            b.style.backgroundImage = "url('images/fewclouds.png')";
            b.style.zIndex = "1";

            break;

          case "moderate rain":
            b.style.backgroundImage = "url('images/lightrain.png')";
            b.style.zIndex = "1";

            break;

          case "scattered clouds":
            b.style.backgroundImage = "url('images/brokenclouds.png')";
            b.style.zIndex = "1";
            break;
        }
        //-----------------------------------------------------------------------------------------------------------------------
        console.log(data.coord.lon + "  " + data.coord.lat);
        let longitude = data.coord.lon;
        let latitude = data.coord.lat;
        //console.log(longitude);
        // console.log(latitude);

        fetch(
          `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`
        )
          .then((sunsetSunrise) => {
            console.log(sunsetSunrise);
            return sunsetSunrise.json();
          })
          .then((getdata) => {
            console.log(getdata);
            document.getElementById("riseContent").innerHTML =
              getdata.results.sunrise;

            document.getElementById("setContent").innerHTML =
              getdata.results.sunset;

            document.getElementById("dayLengthContent").innerHTML =
              getdata.results.day_length + "  hours";
          });
      }
    });
}
