movies.controller('tipobicis', ['$scope', '$http', function ($scope, $http) {
    $scope.listtipobicis = [];
    $scope.accion = 'Agregar';
    $scope.icon = true;
    $scope.updateid;
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');    

    $scope.list = function () {
      $http.get('/api/tipobicis').then(function successCallback(response) {
        $scope.listtipobicis = response.data;
      }, function errorCallback(response) {
        console.log(response.data.err);
      });
    }

    $scope.create = function () {
      $http.post('/api/tipobicis', '{ "tipo": "' + $scope.tipo + '" }').then(function successCallback(response) {
        $scope.descripcion = '';
        $scope.list();
      }, function errorCallback(response) {
      });
    }

    $scope.update = function (l) {
      $scope.tipo = l.tipo;
      $scope.updateid = l._id;
      $scope.icon = false;
      $scope.accion = 'Editar';
      up();
    }

    $scope.updatesend = function () {
      $http.put('/api/tipobicis/' + $scope.updateid, '{ "tipo": "' + $scope.tipo + '" }').then(function successCallback(response) {
        $scope.updateid = '';
        $scope.accion = 'Agregar';
        $scope.icon = true;
        $scope.tipo = '';
        $scope.list();
      }, function errorCallback(response) {
      });
    }

    $scope.delete = function (id) {
      $http.delete('/api/tipobicis/' + id).then(function successCallback(response) {
        notify(response.data.mensaje);
        $scope.list();
        up();
      }, function errorCallback(response) {
        notify(response.data.mensaje);
      });;
    }

    $scope.list();
  }]);