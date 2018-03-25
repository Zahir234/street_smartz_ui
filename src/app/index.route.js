(function() {
  'use strict';

  angular
    .module('safeMapsUi')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'app/main/about.html',
        controller: 'AboutController',
        controllerAs: 'about'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
