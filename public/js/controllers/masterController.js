app.controller('masterController', function($uibModal, $scope, authFactory, $log) {
    $scope.currentUser = authFactory.currentUser;
    authFactory.getCurrentUser();
    $scope.logout = function() {
        authFactory.logout($scope.currentUser)
    };
  $scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

  $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));

});