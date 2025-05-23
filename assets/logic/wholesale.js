
let map

async function initMap() {
    const habbiesHowePosition = { lat: -37.0497217, lng: 145.3856655 }
    const tallarookPosition = { lat: -37.0514994, lng: 145.1226897 }
    const hardwicksPosition = { lat: -37.2447121, lng: 144.4516255 }
    const victoryPosition = { lat: -37.2038949, lng: 145.0448943 }

    const { Map } = await google.maps.importLibrary("maps")
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker")

    map = new Map(document.getElementById("map"), {
        zoom: 6,
        center: habbiesHowePosition,
        mapId: "GOOGLE_MAP",
        minZoom: 1
    })

    const habbies = new AdvancedMarkerElement({
        map: map,
        position: habbiesHowePosition,
        title: "Born + Grown",
    })

    const tallarook = new AdvancedMarkerElement({
        map: map,
        position: tallarookPosition,
        title: "Fattened",
    })

    const hardwicks = new AdvancedMarkerElement({
        map: map,
        position: hardwicksPosition,
        title: "Killed",
    })

    const victory = new AdvancedMarkerElement({
        map: map,
        position: victoryPosition,
        title: "Killed",
    })


    var markers = [habbiesHowePosition, tallarookPosition, hardwicksPosition, victoryPosition]
    var bounds = new google.maps.LatLngBounds()
    for (var i = 0; i < markers.length; i++) {
        bounds.extend(markers[i])
    }

    map.fitBounds(bounds, 50)


    new google.maps.InfoWindow({
        content: '<p>Born</p>',
    }).open({
        anchor: habbies,
        map,
    })

    new google.maps.InfoWindow({
        content: '<p>Fattened</p>',
    }).open({
        anchor: tallarook,
        map,
    })

    new google.maps.InfoWindow({
        content: '<p>Killed</p>',
    }).open({
        anchor: hardwicks,
        map,
    })

    new google.maps.InfoWindow({
        content: '<p>Butchered</p>',
    }).open({
        anchor: victory,
        map,
    })

    const radius = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: { lat: -37.1, lng: 144.95 },
        radius: 100000 / 2
    })

    map.setZoom(5)




}

initMap()