movies.controller('estaciones', ['$scope', '$http', function ($scope, $http) {
    $scope.listado = [];
    $scope.accion = 'Agregar';
    $scope.icon = true;
    $scope.updateid;
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

    $scope.list = function () {
      $http.get('/api/estaciones').then(function successCallback(response) {
          $scope.listado = response.data;
      }, function errorCallback(response) {
      });
    }

    $scope.create = function () {
      $scope.lon = $("#lon").val();
      $scope.lat = $("#lat").val();
      $scope.direccion = $("#direccion").val();
      var json = '{ "nombre": "' + $scope.nombre + '", "muelles": "' + $scope.muelles + '", "direccion": "' + $scope.direccion + '","lon": "' + $scope.lon + '", "lat": "' + $scope.lat + '" }';
      $http.post('/api/estaciones', json).then(function successCallback(response) {
        $scope.nombre = '';
        $scope.muelles = '';
        $scope.direccion = '';
        $scope.lon = '';
        $scope.lat = '';
        $scope.list();
      }, function errorCallback(response) {
      });
    }

    $scope.update = function (l) {
      $scope.nombre = l.nombre;
      $scope.muelles = l.muelles;
      $scope.direccion = l.direccion;
      $scope.lon = l.lon;
      $scope.lat = l.lat;
      $scope.updateid = l._id;
      $scope.icon = false;
      $scope.accion = 'Editar';
      up();
    }

    $scope.updatesend = function () {
      var json = '{ "nombre": "' + $scope.nombre + '", "muelles": "' + $scope.muelles + '", "direccion": "' + $scope.direccion + '","lon": "' + $scope.lon + '", "lat": "' + $scope.lat + '" }';
      $http.put('/api/estaciones/' + $scope.updateid, json).then(function successCallback(response) {
        $scope.updateid = '';
        $scope.accion = 'Agregar';
        $scope.icon = true;
        $scope.nombre = '';
        $scope.muelles = '';
        $scope.direccion = '';
        $scope.lon = '';
        $scope.lat = '';
        $scope.list();
      }, function errorCallback(response) {
      });
    }

    $scope.delete = function (id) {
      $http.delete('/api/estaciones/' + id).then(function successCallback(response) {
        notify(response.data.mensaje);
        $scope.list();
        up();
      }, function errorCallback(response) {
        notify(response.data.mensaje);
      });;
    }

    $scope.list();

    var map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([-116.6066175699234, 31.86013937939049]),
        zoom: 15
      })
    });
    map.on('click', function(evt) {
      var lonlat = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
      $("#lon").val(lonlat[0]);
      $("#lat").val(lonlat[1]);
      $.ajax({
        url: "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + lonlat[1] + "&lon=" + lonlat[0] + "&zoom=18&addressdetails=1"
      }).done(function(data) {
        $("#direccion").val(data.display_name);
      });      
  });
  }]);