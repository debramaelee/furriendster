    import React from 'react';

    var map;
    var infoWindow;
    var service;

      export function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 33.818420, lng: -84.359463},
          zoom: 15,
          styles: [{
            stylers: [{ visibility: 'simplified' }]
          }, {
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }]
        });

        infoWindow = new google.maps.InfoWindow();
        // service = new google.maps.places.PlacesService(map);

        // The idle event is a debounced event, so we can query & listen without
        // throwing too many requests at the server.
        map.addListener('idle', performSearch);
      }

      export function performSearch() {
        var request = {
          bounds: map.getBounds(),
          keyword: 'dog park'
        };
        service.radarSearch(request, callback);
      }

      export function callback(results, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          return;
        }
        for (var i = 0, result; result = results[i]; i++) {
          addMarker(result);
        }
      }

      export function addMarker(place) {
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          icon: {
            url: 'https://cdn1.iconfinder.com/data/icons/cute-corgi-dog-emoticon/595/CUTE_CORGI_DOG_EMOTICON-08-512.png',
            anchor: new google.maps.Point(10, 10),
            scaledSize: new google.maps.Size(50, 50)
          }
        });

        google.maps.event.addListener(marker, 'click', function() {
          service.getDetails(place, function(result, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
              console.error(status);
              return;
            }
            infoWindow.setContent(result.name);
            infoWindow.open(map, marker);
          });
        });
      }