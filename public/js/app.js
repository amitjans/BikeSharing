var movies = angular.module('movies', ['ngRoute']);
movies.config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.
        when('/inicio', {
            templateUrl: '/plantillas/inicio.html'
        }).
        when('/login', {
            templateUrl: '/plantillas/usuario/login.html',
        }).
        when('/usuarios', {
            templateUrl: '/plantillas/usuario/index.html',
        }).
        when('/estaciones', {
            templateUrl: '/plantillas/estacion/index.html',
        }).
        when('/bicicletas', {
            templateUrl: '/plantillas/bicicleta/index.html',
        }).
        when('/tipobicis', {
            templateUrl: '/plantillas/tipobici/index.html',
        }).
        when('/bicitaxis', {
            templateUrl: '/plantillas/bicitaxi/index.html',
        }).
        when('/recorridobicis', {
            templateUrl: '/plantillas/recorridobici/index.html',
        }).
        when('/roles', {
            templateUrl: '/plantillas/rol/index.html',
        }).
        when('/viajes', {
            templateUrl: '/plantillas/viaje/index.html',
        }).
        otherwise('/inicio');
    }
]);

$(function() {
    $(".profile-info").empty();
    $(".profile-info").append('Bienvenido ' + (!!localStorage.getItem('usuario') ? localStorage.getItem('usuario') : '') + '<i class="zmdi zmdi-arrow-drop-down"></i>');

    // var map;
    // function initMap() {
    //   map = new google.maps.Map(document.getElementById('map'), {
    //     center: {lat: -34.397, lng: 150.644},
    //     zoom: 8
    //   });
    // }
});

function logoout() {
    localStorage.clear();
    $(".profile-info").empty();
    $(".profile-info").append('Buenos d&iacute;as<i class="zmdi zmdi-arrow-drop-down"></i>');
}