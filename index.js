

//FETCHING THE PHOTO FROM UNSPLASH USING AN UNSPLASH API AND DISPLAYING IT AS A BACKGORUND IMAGE
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(response => response.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.full})`
        document.getElementById("photographer").textContent = `By : ${data.user.name}`
    })

    //FETCHING THE CRYPTOCURRENCY COIN INFORMATION AND DISPLAYING IT, WHILE CATCHING ERROS
    fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        console.log(data)
        document.getElementById("coin-info").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `
        document.getElementById("crypto").innerHTML += `
            <p>🎯: R${data.market_data.current_price.zar}</p>
            <p>👆: R${data.market_data.high_24h.zar}</p>
            <p>👇: R${data.market_data.low_24h.zar}</p>
        `
    })
    .catch(err => console.error(err))

    //DISPLAYING THE CURRENT TIME AND UPDATING IT EVERY MINUTE

    function getCurrentTime(){
        const currentDate = new Date();
        document.getElementById("time").textContent = currentDate.toLocaleTimeString("en-us", {timeStyle: "short"})
    }
    
    setInterval(getCurrentTime, 1000)

    // BEFORE API, navigator.geolocation.getCurrentPosition(position => {
    //     console.log(position)
    // });


    //USING API TO GET LOCATION INFORMATION
    navigator.geolocation.getCurrentPosition(position => {
        fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
            .then(res => {
                if (!res.ok) {
                    throw Error("Weather data not available")
                }
                return res.json()
            })
            .then(data => {
                const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p id="weather-temp"> Temp : ${Math.round(data.main.temp)} \u00B0 C </p>
                <p class="weather-city"> City : ${data.name}</p>
            `
            })
            .catch(err => console.error(err))
    });
