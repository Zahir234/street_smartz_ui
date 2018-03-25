(function() {
  'use strict';

  angular
    .module('safeMapsUi')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
