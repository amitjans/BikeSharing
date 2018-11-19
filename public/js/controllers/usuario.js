movies.controller('usuarios', ['$scope', '$http', function ($scope, $http) {

$scope.option = '0';

  $scope.singup = function () {
    if($scope.contrasena !== $scope.contrasena2 && !!$scope.contrasena){
      notify('Las contraseñas no coinciden');
    } else {
      $http.post('/api/usuario/singup', '{ "correo": "' + $scope.correo + '", "contrasena": "' + $scope.contrasena + '" }').then(function successCallback(response) {
        notify('El usuario ha sido creado');
      }, function errorCallback(response) {
        notify(response.data.mensaje);
      });
    }
  }

  $scope.singin = function () {
    $http.post('/api/usuario/singin', '{ "correo": "' + $scope.correo + '", "contrasena": "' + $scope.contrasena + '" }').then(function successCallback(response) {
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