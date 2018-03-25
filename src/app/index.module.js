(function() {
  'use strict';

  angular
    .module('safeMapsUi', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'ui.bootstrap', 'toastr', 'chart.js', 'uiGmapgoogle-maps'])
    .config(
    ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
        GoogleMapApiProviders.configure({
            libraries: 'geometry,visualization',
            key: 'AIzaSyCgcPiuIBhyF6ycpKoipIXp8HSX07aFWM0'
        });
    }]
);

})();
