movies.controller('directores', ['$scope', '$http', function ($scope, $http) {
  $scope.listtipo = [];
  $scope.listestacion = [];
  $scope.accion = 'Agregar';
  $scope.icon = true;
  $scope.updateid;
  $http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

  $scope.list = function () {
    $http.get('/api/bicicletas').then(function successCallback(response) {
        $scope.listado = response.data;
    }, function errorCallback(response) {
    });
  }

  $scope.listtipos = function () {
    $http.get('/api/tipobicis').then(function successCallback(response) {
        $scope.listtipo = response.data;
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
    var json = '{ "numero": ' + $scope.numero + ', "estacion": "' + $scope.estacion + '", "tipo": "' + $scope.tipo + '", "tamano": "' + $scope.tamano + '" }';
    $http.post('/api/bicicletas', json).then(function successCallback(response) {
      $scope.numero = '';
      $scope.tamano = '';
      $scope.estacion = '';
      $scope.tipo = '';
      $scope.list();
    }, function errorCallback(response) {
    });
  }

  $scope.update = function (l) {
    $scope.numero = l.numero;
    $scope.tamano = l.tamano;
    $scope.estacion = l.estacion._id;
    $scope.tipo = l.tipo._id;
    $scope.updateid = l._id;
    $scope.icon = false;
    $scope.accion = 'Editar';
    up();
  }

  $scope.updatesend = function () {
    var json = '{ "numero": ' + $scope.numero + ', "estacion": "' + $scope.estacion + '", "tipo": "' + $scope.tipo + '", "tamano": "' + $scope.tamano + '" }';
    $http.put('/api/bicicletas/' + $scope.updateid, json).then(function successCallback(response) {
      $scope.updateid = '';
      $scope.accion = 'Agregar';
      $scope.icon = true;
      $scope.numero = '';
      $scope.tamano = '';
      $scope.estacion = '';
      $scope.tipo = '';
      $scope.list();
    }, function errorCallback(response) {
    });
  }

  $scope.delete = function (id) {
    $http.delete('/api/bicicletas/' + id).then(function successCallback(response) {
      notify(response.data.mensaje);
      $scope.list();
      up();
    }, function errorCallback(response) {
      notify(response.data.mensaje);
    });
  }

  $scope.list();
  $scope.listestaciones();
  $scope.listtipos();
}]);