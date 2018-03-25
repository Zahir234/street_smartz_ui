(function() {
  'use strict';

  angular
    .module('safeMapsUi')
    .directive('route', route);

  /** @ngInject */
  function route() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/directive/routes.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment) {
      var vm = this;

      // "vm.creationDate" is available by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();
