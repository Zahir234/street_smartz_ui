(function() {
	'use strict';

  angular
    .module('safeMapsUi').
    factory('DirectionServices', ['$q', '$http',  function($q, $http) {


		var services = {
                // Get Calls
              get_directions : get_directions,
              get_addresses : get_addresses,
              get_current_location : get_current_location
            };



        function success(data) {

            console.log(data);

            return $q.resolve(data.data);
        }

        function error(error) {
            console.log(error);
            console.log("There was an error");


            return $q.reject(error);
        }

        function get_directions(from_place, to){

            if(from_place.indexOf("Current location") !== -1)
            { 
                var regex = /[+-]?\d+(\.\d+)?/g;
                var floats = from_place.match(regex).map(function(v) { return parseFloat(v); });
                console.log(floats)

                from_place = floats[0] + "," + floats[1];
            }

            else
            {
                console.log("HHHHHHHHHH NO MATCH")
            }

            if(to.indexOf("Current location") !== -1)
            { 
                var regex = /[+-]?\d+(\.\d+)?/g;
                var floats = to.match(regex).map(function(v) { return parseFloat(v); });
                console.log(floats)
                to = floats[0] + "," + floats[1];
            }


            else
            {
                console.log("HHHHHHHHHH NO MATCH")
            }
            



            var url = 'https://safe-maps-dot-zs-project.appspot.com'
            var params = {"from_place" :from_place, "to" :to}
            return $http.get(url, {"params": params}).then(success, error);
        }

        function get_addresses(input){
            return $http.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: input,
        sensor: false,
        key: 'AIzaSyCgcPiuIBhyF6ycpKoipIXp8HSX07aFWM0'
      }
    }).then(success, error); 
        }


        function get_current_location(){
            return $http.get('http://ip-api.com/json').then(success,error);
        }




		return services;
	}]);
})();