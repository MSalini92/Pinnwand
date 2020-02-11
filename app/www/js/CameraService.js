/**
 * Created by mauro on 21.05.15.
 */
app.factory('CameraService', function($http, $q){

    var imageFile;      // Speichert den Base64 Code des zuletzt gemachten Fotos


    // Funktion zum aufnehmen eines Bildes
    function getPicture(){
        // Öffnet Kamera zum aufnehmen eines Fotos
        navigator.camera.getPicture(onSuccess, onFail, { quality: 90, targetWidth: 500, targetHeight: 600,
            destinationType: Camera.DestinationType.DATA_URL
        });

        function onSuccess(imageData) {
            imageFile =  imageData;                                        // Speichern des Base64 Code
            var image = document.getElementById('myImage');                 // Anzeigen des Bildes
            image.src = "data:image/jpeg;base64," + imageData;
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }

    }


    // Get Methode für Base64 Code
    function getImagedata(){
        return imageFile
    }


    return{
        getPicture: getPicture,
        getImagedata: getImagedata
    }


});