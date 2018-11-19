movies.controller('roles', ['$scope', '$http', function ($scope, $http) {
    $scope.list = [];
    $scope.accion = 'Agregar';
    $scope.icon = true;
    $scope.updateid;
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');    

    $scope.list = function () {
      console.log($http.defaults.headers.common['Authorization']);
      $http.get('/api/roles').then(function successCallback(response) {
        $scope.listroles = response.data;
      }, function errorCallback(response) {
        console.log(response.data.err);
      });
    }

    $scope.create = function () {
      $http.post('/api/roles', '{ "descripcion": "' + $scope.descripcion + '" }').then(function successCallback(response) {
        $scope.descripcion = '';
        $scope.list();
      }, function errorCallback(response) {
      });
    }

    $scope.update = function (l) {
      $scope.descripcion = l.descripcion;
      $scope.updateid = l._id;
      $scope.icon = false;
      $scope.accion = 'Editar';
      up();
    }

    $scope.updatesend = function () {
      $http.put('/api/roles/' + $scope.updateid, '{ "descripcion": "' + $scope.descripcion + '" }').then(function successCallback(response) {
        $scope.updateid = '';
        $scope.accion = 'Agregar';
        $scope.icon = true;
        $scope.descripcion = '';
        $scope.list();
      }, function errorCallback(response) {
      });
    }

    $scope.delete = function (id) {
      $http.delete('/api/roles/' + id).then(function successCallback(response) {
        notify(response.data.mensaje);
        $scope.list();
        up();
      }, function errorCallback(response) {
        notify(response.data.mensaje);
      });;
    }

    $scope.list();
  }]);