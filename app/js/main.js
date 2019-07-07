window.addEventListener('load', () => {
  let log;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimzone = document.querySelector('.location-timezone');
  let degreeSection = document.querySelector('.temperature');
  let temperatureSpan = document.querySelector('.temperature span');

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(postion => {
        log = postion.coords.longitude;
        lat = postion.coords.latitude;
         const proxy = 'https://cors-anywhere.herokuapp.com/';
        const api = `${proxy}https://api.darksky.net/forecast/92872390c77ac11e55b2fc9e0f03c346/${lat}, ${log}`;

        fetch(api)
        .then(response =>{
            return response.json();
        })
        .then(data => {
            console.log(data);
            const {temperature, summary, icon} = data.currently;
            // Set DOM Elements from the API
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = summary;
            locationTimzone.textContent = data.timezone;
            // formula
            let celsius = (temperature - 32) * (5 / 9);
            // setIcon
            setIcons(icon, document.querySelector('.icon'));
            // change degree F to C

            degreeSection.addEventListener('click', () =>{
                if (temperatureSpan === "F") {
                    temperatureSpan.textContent = 'C';
                    console.log(celsius);
                } 
                else temperatureSpan.textContent = "C";
                temperatureDegree.textContent = Math.floor(celsius);

            })
        })
    });
    
  }
  function setIcons(icon, iconID){
      const skycons = new Skycons({color: 'white'});
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
      return skycons.set(iconID, Skycons[currentIcon]);
  }

});