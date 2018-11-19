movies.controller('recorridobicis', ['$scope', '$http', function ($scope, $http) {
  $scope.listbicis = [];
  $scope.listestacion = [];
  $scope.accion = 'Iniciar';
  $scope.icon = true;
  $scope.updateid;
  $http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

  $scope.list = function () {
    $http.get('/api/recorridobicis').then(function successCallback(response) {
        $scope.listado = response.data;
    }, function errorCallback(response) {
    });
  }

  $scope.listbicis = function () {
    $http.get('/api/bicicletas').then(function successCallback(response) {
        $scope.listbicis = response.data;
    }, function errorCallback(response) {
    });
  }

  $scope.listestaciones = function () {
    $http.get('/api/estaciones').then(function successCallback(response) {
        $scope.listestacion = response.data;
    }, function errorCallback(response) {
    });
  }

  $scope.create = function () {
    $http.post('/api/recorridobicis', '{ "bicicleta": "' + $scope.bicicleta + '" }').then(function successCallback(response) {
      $scope.numero = '';
      $scope.tamano = '';
      $scope.estacion = '';
      $scope.tipo = '';
      $scope.list();
    }, function errorCallback(response) {
    });
  }

  $scope.update = function (l) {
    $scope.updateid = l._id;
    $scope.icon = false;
    $scope.accion = 'Finalizar';
    up();
  }

  $scope.updatesend = function () {
    $http.put('/api/recorridobicis/' + $scope.updateid, '{ "arribo": "' + $scope.estacion + '" }').then(function successCallback(response) {
      $scope.updateid = '';
      $scope.accion = 'Iniciar';
      $scope.icon = true;
      $scope.estacion = '';
      $scope.list();
    }, function errorCallback(response) {
    });
  }

  $scope.delete = function (id) {
    $http.delete('/api/recorridobicis/' + id).then(function successCallback(response) {
      notify(response.data.mensaje);
      $scope.list();
      up();
    }, function errorCallback(response) {
      notify(response.data.mensaje);
    });
  }

  $scope.list();
  $scope.listestaciones();
  $scope.listbicis();
}]);