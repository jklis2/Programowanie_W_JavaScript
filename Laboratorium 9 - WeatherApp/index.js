const lsWeatherKey = 'weatherApi';
const main = document.querySelector('main');
const removeBtn = document.querySelector('.remove');
let addBtn = document.querySelector('.newWeatherForecast');
let input = document.querySelector('.city');

let forecasts = [];

getDataFromLocalStorage();
displayForecasts();

addBtn.addEventListener('click', function(){
	createWeatherNote();	
});

removeBtn.addEventListener('click', removeAllForecasts);

function getWeatherData(){
	let weather = {};
	fetch('http://api.openweathermap.org/data/2.5/weather?q='+input.value+'&units=metric&appid=57cc083a05fa6a2008dc652336e25912')
		.then((response) => response.json())
		.then(data => {
			weather.city = data['name'];
			weather.desc = data['weather'][0]['description'];
			weather.temp = Math.round(data['main']['temp']);
			weather.image = data['weather'][0]['icon'];
			weather.wind = data['wind']['speed'];
			weather.pressure = data['main']['pressure'];		
			forecasts.push(weather);	
			localStorage.setItem(lsWeatherKey, JSON.stringify(forecasts));
		})
		.then(() => displayForecast(weather))
		.catch(err => console.log(err));
}

function getDataFromLocalStorage(){
	forecasts = [];
	if(localStorage.getItem(lsWeatherKey)==null || localStorage.getItem(lsWeatherKey)=='null') return;
	const forecastsFromStorage = JSON.parse(localStorage.getItem(lsWeatherKey));
	if(forecastsFromStorage.length==0) return;
	for (let i = 0; i < forecastsFromStorage.length; i++) {
		forecasts.push(forecastsFromStorage[i]);
	}
}

function displayForecasts(){
	for (let i = 0; i < forecasts.length; i++) {
		displayForecast(forecasts[i]);
	}
}

function displayForecast(weather){
	const htmlWeather = document.createElement('div');
	const htmlCity = document.createElement('h1');
	const htmlTemp = document.createElement('p');
	const htmlImg = document.createElement('div');
	const htmlDesc = document.createElement('p');		
 	const htmlWind = document.createElement('p');
 	const htmlPressure = document.createElement('p');

	htmlWeather.classList.add('weather-container');
	htmlWeather.addEventListener('click', function(){
		deleteWeather(htmlWeather,weather);
	});
	htmlCity.classList.add('city');
	htmlImg.classList.add('weather-img');
	htmlDesc.classList.add('desc');
	htmlTemp.classList.add('temp');
	htmlWind.classList.add('wind');
	htmlPressure.classList.add('pressure');

	htmlImg.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.image}@2x.png"/>`;
	htmlCity.innerHTML = weather.city;
	htmlDesc.innerHTML = weather.desc;
	htmlTemp.innerHTML = weather.temp + '°C';
	htmlWind.innerHTML = 'WIND <br><br>' + weather.wind + ' m/s';
	htmlPressure.innerHTML = 'PRESSURE <br><br>' + weather.pressure + ' hPa';
	
	main.appendChild(htmlWeather);
	htmlWeather.appendChild(htmlCity);
	htmlWeather.appendChild(htmlTemp);
	htmlWeather.appendChild(htmlImg);
	htmlWeather.appendChild(htmlDesc);
	htmlWeather.appendChild(htmlWind);
	htmlWeather.appendChild(htmlPressure);
}

function createWeatherNote() {
	getWeatherData();
	input.value = '';
}

function deleteWeather(htmlTag,weather){
	htmlTag.remove();
	forecasts.splice(weather,1);
	localStorage.setItem(lsWeatherKey,JSON.stringify(forecasts));	
}

function removeAllForecasts(){
	main.innerHTML = '';
	localStorage.removeItem(lsWeatherKey);
}