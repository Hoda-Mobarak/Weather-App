// https://api.weatherapi.com/v1/search.json?key=8502102699df433baea150703241001&q=london&days=3


// today data
var todayName=document.getElementById("today_date_day_name");
var todayMonth=document.getElementById("today_date_month");
var todayLocation=document.getElementById("today_location");
var todayTemp=document.getElementById("today_temp");
var todayConditionImage=document.getElementById("today_condition_image");
var todayConditionText=document.getElementById("today_condition_text");
var humidity=document.getElementById("humadity");
var wind=document.getElementById("wind");
var windDirection=document.getElementById("wind_direction");

// next days data
var nextDay=document.getElementsByClassName("day");
var nextMaxTemp=document.getElementsByClassName("next_max_temp");
var nextMinTemp=document.getElementsByClassName("next_min_temp");
var nextMinTemp=document.getElementsByClassName("next_min_temp");
var nextConditionImage=document.getElementsByClassName("next_condition_img");
var nextConditionText=document.getElementsByClassName("custom");


// search input
var searchInput = document.getElementById("search");
var submitInput = document.getElementById("submit");

var date = new Date("2024-01-10")
// console.log(date.getDate())
// console.log(date.toLocaleDateString("en-US",{weekday:"long"}))
// console.log(date.toLocaleDateString("en-US",{month:"long"}))


// fetch api data

async function getWeatherData(cityName){
    // "https://api.weatherapi.com/v1/forecast.json?key=8502102699df433baea150703241001&q=London&days=3"
// var weatherResponse= await fetch("http://api.weatherapi.com/v1/current.json?key=8502102699df433baea150703241001&q=London&days=3");
var weatherResponse= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8502102699df433baea150703241001&q=${cityName}&days=3`);
var weatherData =await weatherResponse.json()
return weatherData

}


// display today data
function displayTodayData(data){
    var todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long"})
    todayMonth.innerHTML=todayDate.toLocaleDateString("en-US",{month:"long"})
    todayLocation.innerHTML=data.location.name
    todayTemp.innerHTML = data.current.temp_c
    // todayConditionImage.setAttribute("src",data.current.condition.icon)
    todayConditionText.innerHTML=data.current.condition.text
    humidity.innerHTML=data.current.humidity+"%"
    wind.innerHTML=data.current.wind_kph+"km/h"
    windDirection.innerHTML=data.current.wind_dir
}


// display next days data
  function displayNextData(data){
    // var nextdayResponse= await fetch("https://api.weatherapi.com/v1/forecast.json?key=8502102699df433baea150703241001&q=London&days=3");
var forecastData=data.forecast.forecastday
for (var i=0 ; i<2 ;i++){
    var nextDate = new Date(forecastData[i+1].date)
    nextDay[i+1].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"})
nextMaxTemp[i].innerHTML=forecastData[i+1].day.maxtemp_c
nextMinTemp[i].innerHTML=forecastData[i+1].day.mintemp_c
// nextConditionImage[i].setAttribute("src",forecastData[i+1].day.condition.icon)
nextConditionText[i].innerHTML=forecastData[i+1].day.condition.text
}
}


// start app
async function startApp(city ="cairo"){
    var weatherData = await getWeatherData(city)
    displayTodayData(weatherData)
    displayNextData(weatherData)

}
startApp()



searchInput.addEventListener("input",function(){
    startApp(searchInput.value)
})