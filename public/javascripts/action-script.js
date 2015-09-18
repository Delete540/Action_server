//Angular & Angular Material conifg
angular.module('ActionApp', ['ngMaterial','ngMdIcons'])


.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('defaultTheme')
    .primaryPalette('blue');
})

.controller('ActionEventCtrl',function ($scope, $timeout, $mdSidenav, $mdUtil, $log){
  $scope.$on('IndexTopMenuChange',function(event,msg){
    //console.log('parent',msg);
    $scope.$broadcast('IndexTopMenuChangeParrent',msg);
  });
})
