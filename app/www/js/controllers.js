
// Controller für Karte
app.controller('MapCtrl',['$scope', 'mapService' ,'FileService' , function($scope, mapService, FileService){

  // Initialisieren der Karte
  $scope.initialize = function(){
    mapService.initialize();
  }

  // Eigenen Standort auf Karte aktualisieren
  $scope.moveMarker = function(){
    mapService.moveMarker();
  }

  // Initialisieren des eigenen Standort
  $scope.getLocation = function(){
    mapService.getLocation();

  }

  // Radius setzen in dem Notizen abgerufen werden können
  $scope.setRadius = function(value){
    mapService.setRadius(value);
  }

  // Marker der Notizen aktualisieren
  $scope.updateMarkers = function(){
    FileService.getNotes();
    mapService.addMarkers();
  }

}]);



// Controller für Kamera
app.controller('CameraCtrl', ['$scope' , 'CameraService', 'mapService', function($scope, CameraService, mapService){

  $scope.hideButton = true;   // Benötigt um das hinzufügen einer Bildnachricht ohne Inhalt zu vermeiden. Versteckt den Hinzufügen Button

  // Aufnehmen eines Bildes
  $scope.getPict = function(){
    CameraService.getPicture();
    $scope.hideButton = false;
  };

  // Hochladen eines Bildes zum Server
  $scope.addImg = function(){
    mapService.addImage(CameraService.getImagedata());
    $scope.hideButton = true;

  };

}]);



// Bisher keine Funktion wird für spätere Version benutzt
app.controller('FileCtrl',['$scope', 'FileService', 'mapService', 'ViewFileService', function($scope, FileService, mapService, ViewFileService){


  // Funktion Aktualisieren
  $scope.getNotesfromserver = function(){
    FileService.getNotes(mapService.getLatitude(),mapService.getLongitude(),mapService.getRadius());
    mapService.addMarkers();
  };

  $scope.availableNotes = FileService.getallnotes();


 $scope.setViewtext = function(noteId){
   ViewFileService.getItemText(noteId);
  };

  $scope.filetext = ViewFileService.returnItemtext();

}]);




// Controller für hinzufügen von Notizen
app.controller('AddNoteCtrl', ['$scope', 'mapService', function($scope, mapService){

  //Hochladen einer Textnachricht zum Server
  $scope.newNote = function(){
      mapService.addNote($scope.noteText);

  }

}]);


// Controller für Aufnahme von Sprachnachrichten
app.controller('AddAudioCtrl', ['$scope', 'AudioService', 'mapService', function($scope, AudioService, mapService){

  // Aufnahme von Sprachnachricht starten
  $scope.recordFile = function(){
   AudioService.recordAudio();
  };

  // Hochladen einer Sprachnachricht zum Server
  $scope.addAudiofile = function(){
    mapService.addAudio(AudioService.getAudioFile());
  };



}]);









