movies.controller('viajes', ['$scope', '$http', function ($scope, $http) {
    $scope.listado = [];
    $scope.accion = 'Agregar';
    $scope.icon = true;
    $scope.updateid;
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

    $scope.list = function () {
      $http.get('/api/viajes').then(function successCallback(response) {
          $scope.listado = response.data;
      }, function errorCallback(response) {
      });
    }

    $scope.create = function () {
      var json = '{ "lonini": ' + $scope.lonini + ', "latini": ' + $scope.latini + ', "lonfin": ' + $scope.lonfin + ',"latfin": ' + $scope.latfin + ' }';
      $http.post('/api/viajes', json).then(function successCallback(response) {
        $scope.lonini = '';
        $scope.lonfin = '';
        $scope.latini = '';
        $scope.latfin = '';
        $scope.list();
      }, function errorCallback(response) {
      });
    }

    $scope.update = function (l) {
      $http.put('/api/viajes/' + l._id, '{ "estado": true }').then(function successCallback(response) {
        $scope.list();
      }, function errorCallback(response) {
      });
      up();
    }

    $scope.updatesend = function () {
      var json = '{ "nombre": "' + $scope.nombre + '", "muelles": "' + $scope.muelles + '", "direccion": "' + $scope.direccion + '","lon": "' + $scope.lon + '", "lat": "' + $scope.lat + '" }';
      $http.put('/api/viajes/' + $scope.updateid, json).then(function successCallback(response) {
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
      $http.delete('/api/viajes/' + id).then(function successCallback(response) {
        notify(response.data.mensaje);
        $scope.list();
        up();
      }, function errorCallback(response) {
        notify(response.data.mensaje);
      });;
    }

    $scope.list();
  }]);