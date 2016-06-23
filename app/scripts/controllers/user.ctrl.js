angular.
  module('UserCtrl', []).
  controller('UserController', function ($scope, $location, $window, Authentication, User, Flash, Storage, $rootScope) {
    $scope.signup = function signup(username, password, confirm) {

      if (Authentication.isAuthenticated) {
        $location.path('/');
      } else {
        User.
          signup(username, password, confirm).
          success(function (result) {
            $location.path('/login');
            Flash.create('success', result.message, 4000, {}, true);
          }).
          error(function (result) {
            Flash.create('danger', result.message, 4000, {}, true);
          });
      }
    };

    $scope.signin = function signin(username, password) {
      if (username != '' && password != '') {
        User.
          signin(username, password).
          success(function (result) {

            Authentication.isAuthenticated = true;
            $rootScope.username = result.username;
            Storage.setCurrentUser(result.username);
            Storage.setToken(result.token);

            $location.path('/');
            Flash.create('success', result.message, 4000, {}, true);
          }).
          error(function (result) {
            Flash.create('danger', result.message, 4000, {}, true);
          });
      }
    };
  });