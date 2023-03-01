const map = L.map('map').setView([50, 0], 2)
const heading = document.querySelector('h2')
const popup = L.popup()

const zone = Intl.DateTimeFormat().resolvedOptions().timeZone
if (zone) {
    heading.textContent = zone
}

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 4,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)
map.on('mousemove', getCoords)
map.on('click', getGeo)

function getCoords(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(`lat: ${e.latlng.lat}, lng: ${e.latlng.lng}`)
        .openOn(map)
}

async function getGeo(e) {
    const res = await fetch(`/getgeo?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    const resObj = await res.json()
    for (const arr of resObj.geo) {
        L.polygon(arr, {
            color: "red"
        }).addTo(map);
    }
    heading.textContent = resObj.tz
}