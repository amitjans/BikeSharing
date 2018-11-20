movies.controller('usuarios', ['$scope', '$http', function ($scope, $http) {

$scope.option = '0';

  $scope.singup = function () {
    if($scope.contrasena !== $scope.contrasena2 && !!$scope.contrasena){
      notify('Las contraseñas no coinciden');
    } else {
      $http.post('/api/usuarios/singup', '{ "correo": "' + $scope.correo + '", "contrasena": "' + $scope.contrasena + '" }').then(function successCallback(response) {
        notify('El usuario ha sido creado');
      }, function errorCallback(response) {
        notify(response.data.mensaje);
      });
    }
  }

  $scope.singin = function () {
    $http.post('/api/usuarios/singin', '{ "correo": "' + $scope.correo + '", "contrasena": "' + $scope.contrasena + '" }').then(function successCallback(response) {
      localStorage.setItem('usuario', response.data.correo);
      localStorage.setItem('token', response.data.token);
      $(".profile-info").empty();
      $(".profile-info").append('Bienvenido ' + localStorage.getItem('usuario') + '<i class="zmdi zmdi-arrow-drop-down"></i>');
      window.location = 'http://' + window.location.host;
    }, function errorCallback(response) {
      notify(response.data.mensaje);
    });
  }

  $scope.options = function (id){
    $scope.option = id + "";
  }

  $scope.logoout = function () {
    localStorage.clear();
    $(".profile-info").empty();
    $(".profile-info").append('Buenos d&iacute;as<i class="zmdi zmdi-arrow-drop-down"></i>');
  }
}]);

movies.controller('usuarioscrud', ['$scope', '$http', function ($scope, $http) {

  $scope.listusuarios = [];
  $scope.accion = 'Editar';
  $scope.listrole = [];
  $scope.icon = true;
  $scope.updateid;
  $http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
  
    $scope.list = function () {
      $http.get('/api/usuarios').then(function successCallback(response) {
        $scope.listusuarios = response.data;
      }, function errorCallback(response) {
        console.log(response.data.err);
      });
    }

    $scope.listroles = function () {
      $http.get('/api/roles').then(function successCallback(response) {
        $scope.listrol = response.data;
      }, function errorCallback(response) {
        console.log(response.data.err);
      });
    }

    $scope.update = function (l) {
      $scope.correo = l.correo;
      $scope.rol = (!!l.rol) ? l.rol._id : '';
      $scope.updateid = l._id;
      $scope.icon = false;
      up();
    }
  
    $scope.updatesend = function () {
      var json = '{ "rol": "' + $scope.rol + '" }';
      console.log(json);
      $http.put('/api/usuarios/' + $scope.updateid, json).then(function successCallback(response) {
        $scope.updateid = '';
        $scope.icon = true;
        $scope.rol = '';
        $scope.correo = '';
        $scope.list();
      }, function errorCallback(response) {
      });
    }

    $scope.list();
    $scope.listroles();
  }]);