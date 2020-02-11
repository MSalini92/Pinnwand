// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});




app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html"

  })



  .state('app.browse', {
    url: "/browse",
    views: {
      'map':{
        templateUrl: "templates/browse.html",
        controller: 'MapCtrl'
      }
    }

  })

      .state('app.addImage', {
        url: "/addImage",
        views: {
          'image':{
            templateUrl: "templates/addImage.html"
          }
        }
      })


  .state('app.addNote', {
    url: "/addNote",
    views: {
      'note':{
        templateUrl: "templates/addNote.html"
      }
    }
  })

      .state('app.availableNotes', {
        url: "/availableNotes",
        views: {
          'menuContent': {
            templateUrl: "templates/availableNotes.html"
          }
        }
      })

      .state('app.noteView', {
        url: "/noteView",
        views: {
          'menuContent': {
            templateUrl: "templates/noteView.html"
          }
        }
      })


  .state('app.addAudio', {
    url: "/addAudio",
        views: {
          'audio':{
            templateUrl: "templates/addAudio.html"
          }
    },
        controller: 'AddAudioCtrl'
  });








  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/browse');
});
