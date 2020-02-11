
app.factory('mapService', function($http, $q, $ionicLoading){

    var map;
    var marker;                 // Marker auf der Map der eigenen Standort anzeigt
    var circle;
    var latitude;               // Latitude eigene Position
    var longitude;              // Longitude eigene Position
    var markers=[];             // Array aller Dargestellten Marker auf der Map
    var heading;                // aktuelle Blickrichtung
    var radius = 200;           // Radius in dem Notizen angezeigt werden sollen
    var infowindow = new google.maps.InfoWindow();  // Infowindow um Text Bild und Ton einzelner Nachrichten anzuzeigen
    var notes=[];               // Array aller JSON Objekte die bei der Suche nach Marker vom Server empfangen werden



    // Post Schnitstelle zum upload von einer Sprachnachricht
    function addAudio(audio){
        var note={
            latitude: latitude,
            longitude: longitude,
            file: audio,
            filetype: 3,
            heading: heading
        }

        $http.post('http://vpinnwand-mypinnwand.rhcloud.com/note',note)
            .success(function(data){
            });
    }

    // Post Schnittstelle zum Upload von einer Textnachricht
    function addNote(text){
        var note={
            latitude: latitude,
            longitude: longitude,
            file: text,
            filetype: 1,
            heading: heading
        };


        $http.post('http://vpinnwand-mypinnwand.rhcloud.com/note',note)
            .success(function(data){
            });


    }


    // Post Schnittstelle zum Upload eines Bildes zum Server
    function addImage(img){
        var note={
            latitude: latitude,
            longitude: longitude,
            file: img,
            filetype: 2,
            heading: heading
        };


        $http.post('http://vpinnwand-mypinnwand.rhcloud.com/note',note)
            .success(function(data){
            });


    }

    // Funktion zum Anzeigen eines Ladebildschirms
    function showloading(){
        $ionicLoading.show({
            content: '<i class="icon ion-looping"></i> Loading'
        });
    }

    // Funktion zum schließen des Ladebildschirms
    function hideloading(){
        $ionicLoading.hide();
    }







// Hinzufügen aller Marker vom Server
function addMarkers(){

    showloading();                                      // Ladebildschirm wird angezeigt

    // Löschen der Marker von der Map
    for (var i = 0; i < markers.length; i++) {          // Alle auf der Karte dargestellten Marker werden entfernt
        markers[i].setMap(null);
    }

    // Löschen der Marker
    for(var j=markers.length; j>=0; j--){               // Der Inhalt des Arrays mit allen gespeicherten Markern wird gelöscht um aktuelle Marker zu speichern
        markers.splice(j,1);

    }

    for(var k=notes.length; k>=0; k--){                  // Array mit allen JSON Objekten wird gelöscht um aktuelle Objekte zu speichern
        notes.splice(k,1);
    }

    // Get Anfrage an den Server um alle Notizen im eingestellten Radius zu erhalten
        $http.get('http://vpinnwand-mypinnwand.rhcloud.com/notes?lat='+latitude+'&lng='+longitude+'&radius='+radius).success(function(data){


        // Speichern aller Notizen als JSON Objekte im Array
        for (var i =0;i<data.length;i++){

            var note ={
                latitude: data[i].loc.coordinates[1],
                longitude: data[i].loc.coordinates[0],
                heading: data[i].heading,
                file: data[i].file,
                filetype: data[i].filetype

            };

            notes.push(note);


            // Das Marker Icon der einzelnen Notizen wird nach der jeweiligen Blickrichtung der Notizen ausgewählt und der Marker wird erstellt
            if(data[i].heading>0 && data[i].heading<15){
                var nmarker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].loc.coordinates[1], data[i].loc.coordinates[0]),
                    animation: google.maps.Animation.DROP,

                    icon: {
                        url: 'img/marker0.png',
                        rotation: data[i].heading
                    }

                });
            }
            else if(data[i].heading>15 && data[i].heading<45){
                var nmarker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].loc.coordinates[1], data[i].loc.coordinates[0]),
                    animation: google.maps.Animation.DROP,

                    icon: {
                        url: 'img/marker30.png',
                        rotation: data[i].heading
                    }

                });
            }
            else if(data[i].heading>45 && data[i].heading<75){
                var nmarker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].loc.coordinates[1], data[i].loc.coordinates[0]),
                    animation: google.maps.Animation.DROP,

                    icon: {
                       url: 'img/marker60.png',
                        rotation: data[i].heading
                    }

                });
            }
            else if(data[i].heading>75 && data[i].heading<105){
                var nmarker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].loc.coordinates[1], data[i].loc.coordinates[0]),
                    animation: google.maps.Animation.DROP,

                    icon: {
                        url: 'img/marker90.png',
                        rotation: data[i].heading
                    }

                });
            }
            else if(data[i].heading>105 && data[i].heading<135){
                var nmarker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].loc.coordinates[1], data[i].loc.coordinates[0]),
                    animation: google.maps.Animation.DROP,

                    icon: {
                        url: 'img/marker120.png',
                        rotation: data[i].heading
                    }

                });
            }
            else if(data[i].heading>135 && data[i].heading<165){
                var nmarker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].loc.coordinates[1], data[i].loc.coordinates[0]),
                    animation: google.maps.Animation.DROP,

                    icon: {
                       url: 'img/marker150.png',
                        rotation: data[i].heading
                    }

                });
            }
            else if(data[i].heading>165 && data[i].heading<195){
                var nmarker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].loc.coordinates[1], data[i].loc.coordinates[0]),
                    animation: google.maps.Animation.DROP,

                    icon: {
                        url: 'img/marker180.png',
                        rotation: data[i].heading
                    }

                });
            }
            else if(data[i].heading>195 && data[i].heading<225){
                var nmarker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].loc.coordinates[1], data[i].loc.coordinates[0]),
                    animation: google.maps.Animation.DROP,

                    icon: {
                        url: 'img/marker210.png',
                        rotation: data[i].heading
                    }

                });
            }
            else if(data[i].heading>225 && data[i].heading<255){
                var nmarker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].loc.coordinates[1], data[i].loc.coordinates[0]),
                    animation: google.maps.Animation.DROP,

                    icon: {
                        url: 'img/marker240.png',
                        rotation: data[i].heading
                    }

                });
            }
            else if(data[i].heading>255 && data[i].heading<285){
                var nmarker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].loc.coordinates[1], data[i].loc.coordinates[0]),
                    animation: google.maps.Animation.DROP,

                    icon: {
                       url: 'img/marker270.png',
                        rotation: data[i].heading
                    }

                });
            }
            else if(data[i].heading>285 && data[i].heading<315){
                var nmarker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].loc.coordinates[1], data[i].loc.coordinates[0]),
                    animation: google.maps.Animation.DROP,

                    icon: {
                        url: 'img/marker300.png',
                        rotation: data[i].heading
                    }

                });
            }
            else if(data[i].heading>315 && data[i].heading<345){
                var nmarker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].loc.coordinates[1], data[i].loc.coordinates[0]),
                    animation: google.maps.Animation.DROP,

                    icon: {
                       url: 'img/marker330.png',
                        rotation: data[i].heading
                    }

                });
            }
            else if(data[i].heading>345 && data[i].heading<360){
                var nmarker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].loc.coordinates[1], data[i].loc.coordinates[0]),
                    animation: google.maps.Animation.DROP,

                    icon: {
                        url: 'img/marker0.png',
                        rotation: data[i].heading
                    }

                });
            }



            // Marker wird zum Array mit allen gespeicherten Marker hinzugefügt
            markers.push(nmarker);


        }
        // Das Markerarray wird durchlaufen und alle einzelnen Marker werden der Karte hinzugefügt
        for(var j = 0; j<markers.length; j++){
            markers[j].setMap(map);
        }

        // Die Ladeanimation wird geschlossen
        hideloading();

    }).error(function(){
        alert('error beim einlesen der daten vom Server');
    });
}




    // Get Methoden für Latitude, Longitude, Blickrichtung, und Radius
    function getLatitude(){
        return latitude
    }


    function getLongitude(){
        return longitude
    }


    function getheading(){
        return heading;
    }

    function getRadius(){
        return radius
    }


    // Funktion zum aktualisieren der eigenen Position auf der Karte
    function watchPosition(){
        navigator.geolocation.watchPosition(function(position){
            marker.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            circle.set('center', new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            latitude = position.coords.latitude;            // eigene Latitude wird in globalen Variable gespeichert für Zugriff von anderen Funktionen
            longitude = position.coords.longitude;          // s.o.


        });

    }

    // Aktuelle Blickrichtung wird überprüft und in der globalen Variable gespeichert für Zugriff von anderen Funktionen
    // Die Darstellung der eigenen Blickrichtung wird aktualisiert
    // Funktion wird genutzt um Nachrichten mit gleicher Blickrichtung anzuzeigen
    function watchHeading(){
        navigator.compass.watchHeading(function(head){
            heading = head.magneticHeading;
            if(heading>0 && heading<15){
                marker.setIcon('img/pfeil0.png');
            }
            if(heading>15 && heading<45){
                marker.setIcon('img/pfeil30.png');
            }
            if(heading>45 && heading<75){
                marker.setIcon('img/pfeil60.png');
            }
            if(heading>75 && heading<105){
                marker.setIcon('img/pfeil90.png');
            }
            if(heading>105 && heading<135){
                marker.setIcon('img/pfeil120.png');
            }
            if(heading>135 && heading<165){
                marker.setIcon('img/pfeil150.png');
            }
            if(heading>165 && heading<195){
                marker.setIcon('img/pfeil180.png');
            }
            if(heading>195 && heading<225){
                marker.setIcon('img/pfeil210.png');
            }
            if(heading>225 && heading<255){
                marker.setIcon('img/pfeil240.png');
            }
            if(heading>255 && heading<285){
                marker.setIcon('img/pfeil270.png');
            }
            if(heading>285 && heading<315){
                marker.setIcon('img/pfeil300.png');
            }
            if(heading>315 && heading<345){
                marker.setIcon('img/pfeil330.png');
            }
            if(heading>345 && heading<360){
                marker.setIcon('img/pfeil0.png');
            }

            // Überprüfen ob Distanz zwischen eigenen Standort und Notizen kleiner als 20 Meter ist und die Blickrichtung mit den Notizen übereinstimmt.
            // Wenn ja dann öffnen eines Infowindows zum Anzeigen der Notiz
            // filetype = 1 für Textnachricht, filetype = 2 für Bild  und filetype = 3 für Sprachnachricht
            for(var i=0; i<markers.length; i++){
                if(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(latitude,longitude), new google.maps.LatLng(notes[i].latitude, notes[i].longitude)) < 20 && markers[i].icon.rotation < heading+20 && markers[i].icon.rotation > heading-20){
                    var string = "gefunden";
                    if(notes[i].filetype == 2){
                        var image = new Image();
                        image.width =200;
                        image.height = 150;
                        image.src = "data:image/jpeg;base64," + notes[i].file;
                        infowindow.setContent(image);
                        infowindow.open(map, markers[i]);
                    }
                    else if(notes[i].filetype == 1){
                        infowindow.setContent(notes[i].file);
                        infowindow.open(map, markers[i]);
                    }
                    else if(notes[i].filetype == 3){
                        var content = "Sounddatei";
                        infowindow.setContent(content);
                        infowindow.open(map,markers[i]);

                    }

                }




            }


        })
    }




    // Karten optionen
    var mapOptions = {
        zoom: 6,
        center: new google.maps.LatLng(49.837982, 10.546875),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI:true
    };





    // Funktion zum initialisieren der Karte
    function initialize(){
        map = new google.maps.Map(document.getElementById('Map'), mapOptions);
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(
            document.getElementById('locateButton'));
        map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(
            document.getElementById('slider'));
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(
            document.getElementById('aktualisieren'));




    }



    // initialisieren der aktuellen Position und Umkreis. Wird nach dem initialisieren der Karte aufgerufen
    function getLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                var image0 = {
                    url: 'img/pfeil0.png'
                }
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                    icon: image0,
                    zIndex: 999
                });

                map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                map.setZoom(16);
                marker.setMap(map);
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;


                var circleOptions = {
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                    clickable: false,
                    map: map,
                    center: new google.maps.LatLng(latitude,longitude),
                    radius: 200
                };


                circle = new google.maps.Circle(circleOptions);
                watchPosition();            // Funktion zum aktualisieren der Position wird gestarten
                watchHeading();             // Funktion zum aktualisieren der Blickrichtung wird gestartet




            });
        }else {
            alert("error");
        }
    }

    // Funktion zum setzen des Radius in dem Notizen abgerufen werden können
    function setRadius(value){
        circle.set('radius', parseInt(value));
        radius = parseInt(value);
    }


    // Karte zum aktuellen Standort bewegen
    function moveMarker(){

        navigator.geolocation.getCurrentPosition(function (position) {
            marker.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            circle.set('center', new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        })

    }


    return{
        initialize:initialize(),
        getLocation:getLocation(),
        moveMarker:moveMarker,
        setRadius: setRadius,
        getLatitude:getLatitude,
        getLongitude: getLongitude,
        addMarkers: addMarkers,
        addNote: addNote,
        getHeading: getheading(),
        getRadius: getRadius,
        addImage: addImage,
        addAudio: addAudio






    }


});