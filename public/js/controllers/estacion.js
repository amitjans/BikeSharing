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
  }]);