/**
 * Created by mauro on 24.05.15.
 */

app.factory('AudioService', function(){

    var path;               // Pfad der letzten aufgenommenen Audiodatei
    var base64string;       // Base64 string des letzen aufgenommenen Bildes



    // Funktion zum aufnehmen einer Sprachnachricht
    function recordAudio(){
        // Geräteabhängiges Aufnahmefenster für Sprachnachrichten wird geöffnet
        // limit setzt die Anzahl aufnehmbarer Nachrichten auf 1. Danach wird das Aufnahmefester geschlossen
        navigator.device.capture.captureAudio(captureSuccess, captureError, {limit:1});

    }


    // Callback der Aufnahmefunktion wenn Aufnahme erfolgreich
    function captureSuccess(mediaFiles){
        var i, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;                          //Pfad der aufgenommen Sprachnachricht wird gespeichert
        }
        window.resolveLocalFileSystemURL(path, gotFile, fail);      // gibt Fileentry des angegeben Pfades wieder

    }




    function fail(e) {
        alert(e);
    }

    function gotFile(fileEntry) {
        alert("gotfile");
        fileEntry.file(function(file) {
            // convert file to mp3
            var reader = new FileReader();

            reader.onloadend = function(e){
                base64string = this.result;                 // Wenn das Umwandeln in Sprachnachricht abgeschlossen ist wird der Base64 coder global gespeichert.
            }

            reader.readAsDataURL(file);                     // Sprachnachrichtdatei wird in Base64 Code umgewandelt


        });

    }





    function captureError(error){
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    }



    // Get Methode für Base64 Code
    function getAudiofile(){
        return base64string;
    }



    return{
    recordAudio: recordAudio,
    getAudioFile: getAudiofile
    }





});