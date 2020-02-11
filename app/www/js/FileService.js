// Service wird momentan nicht genutzt und wird für spätere Version benötigt


app.factory('FileService' ,function($http, $q){

    var notes=[];
    var availableNotes=[];

    // Alle Notizen vom Server erhalten
    function getNotes(latitude, longitude, radius){

            // Notiz array löschen um aktuelle Daten zu speichern
            for(var j=notes.length; j>=0; j--){
                notes.splice(j,1);
            }



            $http.get('http://vpinnwand-mypinnwand.rhcloud.com/notes?lat='+latitude+'&lng='+longitude+'&radius='+radius).success(function(data){


                for (var i =0;i<data.length;i++){
                    var note ={
                        latitude: data[i].loc.coordinates[1],
                        longitude: data[i].loc.coordinates[0],
                        heading: data[i].heading,
                        id: data[i]._id
                    };

                    notes.push(note);

                }

            });




        }




    // alle verfügbaren Notizen des zurückliefern
    function getallnotes(){
        return notes;
    }





    return{
        getallnotes:getallnotes,
        getNotes: getNotes


    }


});