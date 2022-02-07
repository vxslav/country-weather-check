function showForecast(data) {
    let lat = data.latlng[0];
    let lng = data.latlng[1];
    fetch(`./assets/view/details.hbs`)
    .then(res => res.text())
    .then(html => {
        location.assign(`http://127.0.0.1:8080/#details/${data.name.common}`);
        content.innerHTML = html;
        let flag = getById("detailedFlag");
        let name = getById("detailedName");
        flag.src = data.flags.png;
        name.innerText = data.name.common;
        fetchDetails(lat, lng);
    })
    .catch(err => console.log(err));
}

function fetchDetails(lat, lng) {
    fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lng}`)
    .then(res => {
        if(res.ok) {
            return res.json();
        } else {
            throw new Error(res.statusText);
        }
    })
    .then(data => {
        let sixHours = data.properties.timeseries.slice(0,6);
        sixHours.forEach(hour => createInfoBox(hour));
    })
    .catch(err => showErrorPage(err));
}

function createInfoBox(hour) {
    let time = new Date(hour.time);
    let temp = hour.data.instant.details.air_temperature;
    let container = getById("info");
    let box = document.createElement("div");
    box.className = "box";
    box.innerHTML = `
        <div>${time}</div>
        <h5 class="mt-4">${temp} <sup>o</sup>C</h5>
    `;
    container.appendChild(box);
} 