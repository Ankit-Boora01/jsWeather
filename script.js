const apiKey = '7576e58b3e67e59fab6c70e49ab682f4';
         

        async function fetchData() {
            const city = document.querySelector(".city").value.trim();
            const cityName = document.querySelector(".cityName");
            const tempElem = document.querySelector(".temp");
            const descriptionElem = document.querySelector(".description");
            const weatherIdElem = document.querySelector(".weatherId");
            const wind = document.querySelector(".wind");
            const humidity = document.querySelector(".humidity");
            const showError = document.querySelector(".showError");

    
            cityName.textContent = '';
            tempElem.textContent = '';
            descriptionElem.textContent = '';
            weatherIdElem.textContent = '';
            wind.textContent = '';
            humidity.textContent = '';
            showError.textContent = '';
            showError.textContent = 'Loading...';

            if (!city) {
                showError.textContent = 'Please enter a city name.';
                return;
            }

            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
                if (!response.ok) {
                    throw new Error('City not found');
                }
                const weatherData = await response.json();
                cityName.textContent = capitalizeFirstLetter(city);
                tempElem.textContent = `Temperature: ${(weatherData.main.temp - 273.15).toFixed(2)}°C`;
                descriptionElem.textContent = `${weatherData.weather[0].description}`;
                weatherIdElem.textContent = getEmoji(weatherData.weather[0].id);
                const windSpeedKmH = (weatherData.wind.speed * 3.6).toFixed(2);
                wind.textContent = `Wind Speed: ${windSpeedKmH} Km/h`;
                humidity.textContent = `Humidity: ${weatherData.main.humidity}%`;
                showError.textContent = '';
            } catch (error) {
                showError.textContent = `Could not fetch weather data: ${error.message}`;
            }
        }

        function getEmoji(weatherId) {
            switch (true) {
                case (weatherId >= 200 && weatherId < 300):
                    return '⛈️';
                case (weatherId >= 300 && weatherId < 400):
                    return '🌧️';
                case (weatherId >= 500 && weatherId < 600):
                    return '🌧️';
                case (weatherId >= 600 && weatherId < 700):
                    return '❄️';
                case (weatherId >= 700 && weatherId < 800):
                    return '🌫️';
                case (weatherId === 800):
                    return '☀️';
                case (weatherId > 800 && weatherId < 900):
                    return '☁️';
                default:
                    return '❓';
            }
        }

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }


