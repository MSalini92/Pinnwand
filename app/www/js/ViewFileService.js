// Service wird momentan nicht benutzt und wird für spätere Version benötigt

app.factory('ViewFileService', function($http, $q){

var text = "blub";

    function getItemtext(noteId){

        $http.get('http://vpinnwand-mypinnwand.rhcloud.com/note/'+noteId).success(function(data){
            text = data.file;

        })

    }

    function returnItemtext(){
       return text;
    }




    return{
        getItemText: getItemtext,
        returnItemtext: returnItemtext,
        text: text



    }

})