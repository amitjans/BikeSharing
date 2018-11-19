movies.controller('bicitaxis', ['$scope', '$http', function ($scope, $http) {
    $scope.listbicitaxis = [];
    $scope.accion = 'Agregar';
    $scope.icon = true;
    $scope.updateid;
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');    

    $scope.list = function () {
      $http.get('/api/bicitaxis').then(function successCallback(response) {
        $scope.listbicitaxis = response.data;
      }, function errorCallback(response) {
      });
    }

    $scope.create = function () {
      $http.post('/api/bicitaxis', '{ "chofer": "' + $scope.chofer + '", "capacidad": ' + $scope.capacidad + ' }').then(function successCallback(response) {
        $scope.chofer = '';
        $scope.capacidad = '';
        $scope.list();
      }, function errorCallback(response) {
        notify(response.data.mensaje);
      });
    }

    $scope.update = function (l) {
      $scope.chofer = l.chofer;
      $scope.capacidad = l.capacidad;
      $scope.updateid = l._id;
      $scope.icon = false;
      $scope.accion = 'Editar';
      up();
    }

    $scope.updatesend = function () {
      $http.put('/api/bicitaxis/' + $scope.updateid, '{ "chofer": "' + $scope.chofer + '", "capacidad": ' + $scope.capacidad + ' }').then(function successCallback(response) {
        $scope.updateid = '';
        $scope.accion = 'Agregar';
        $scope.icon = true;
        $scope.chofer = '';
        $scope.capacidad = '';
        $scope.list();
      }, function errorCallback(response) {
      });
    }

    $scope.delete = function (id) {
      $http.delete('/api/bicitaxis/' + id).then(function successCallback(response) {
        notify(response.data.mensaje);
        $scope.list();
        up();
      }, function errorCallback(response) {
        notify(response.data.mensaje);
      });;
    }

    $scope.list();
  }]);