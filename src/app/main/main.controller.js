(function() {
  'use strict';

  angular
    .module('safeMapsUi')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, DirectionServices, uiGmapGoogleMapApi) {


 $timeout(
    DirectionServices.get_current_location().then(function(data) {

      vm.current_location = {"latitude" : data.lat, "longitude" : data.lon }
      vm.loading_location = false; 
      console.log('herehere')

    } )



  , 10000);

    var maps = null;




    uiGmapGoogleMapApi.then(function(maps_lib) { maps = maps_lib;

      console.log(maps);
    });
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1521915766446;
    vm.showToastr = showToastr;

    vm.from_place = "";
    vm.to = "";
    vm.get_directions = get_directions;
    vm.routes = []
    vm.labels = ["Mon","Tues","Wed","Thu","Fri","Sat","Sun"];
    vm.data = [32,2,4,34,56,75,12];
    vm.time_of_day = ["Morn","Day", "Eve"];
    vm.data_2 = [3,4,5];

    vm.make_map = make_map;
    vm.hide_map = true;

    vm.steps = [];

    vm.route_loaded = false;

    vm.addresses_from_place = [];
    vm.loading_from_place = false;
    vm.loading_to = false;

    vm.to_string = "to";
    vm.from_place_string = "from_place";
    vm.location_typeahead_change = location_typeahead_change;

    var map;

    vm.current_location = null;
    vm.loading_location = true;
    


    


    function make_map()
    {





map = new maps.Map(
    document.getElementById("map_canvas"), {
      center: new maps.LatLng(34, 108),
      zoom: 13,
      mapTypeId: maps.MapTypeId.ROADMAP
    });




  vm.hide_map = false;



    }

    function add_routes(route)
    {
              var bounds = new maps.LatLngBounds();




  var path = maps.geometry.encoding.decodePath(route);

  for (var i = 0; i < path.length; i++) {
    bounds.extend(path[i]);
  }
  
  var polyline = new maps.Polyline({
    path: path,
    strokeColor:'#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: map
      // strokeColor: "#0000FF",
      // strokeOpacity: 1.0,
      // strokeWeight: 2
  });
  polyline.setMap(map);
  map.fitBounds(bounds);
    }




    activate();

    function load_routes(data)
    {
      vm.route_loaded = true;
      
      vm.routes = data;

      make_map();

      for(var i = 0; i < vm.routes.length; i++)
      {
        vm.steps = [];
         add_routes(vm.routes[i]['overview_polyline']['points'])



         for( var leg = 0; leg < vm.routes[i].legs.length; leg++)
         {
           for (var step = 0; step < vm.routes[i].legs[leg].steps.length; step++)
           {
              var instruction = vm.routes[i].legs[leg].steps[step].html_instructions;
   
              vm.steps.push(instruction);
           }
         }
      }

      if (vm.loading_location === false){
        var marker = new maps.Marker({
          position: {lat: vm.current_location.latitude, lng: vm.current_location.longitude},
          map: map,
          title: 'Current Location'
      });


        var danger_points = []

        for (var i = 0; i < vm.routes[0].crimes.length; i++)
        {
          danger_points.push( new maps.LatLng(vm.routes[0].crimes[i].lat, vm.routes[0].crimes[i].lng) )
        }




        var heatmap = new maps.visualization.HeatmapLayer({
          data: danger_points,
          map: map,
          radius: 20
        });

      }


    }
    function get_directions()
    {


      DirectionServices.get_directions(vm.from_place, vm.to).then(load_routes)
    }



    function load_addresses(data)
    {

      var new_data = data.results.map(function(item){
        return item.formatted_address;


      });

      vm.loading_from_place = true;

      
      return new_data.results;
    }

    function location_typeahead_change(input, text_name)
    {
      if (text_name === "to")
      {
        vm.loading_to = true;
      }
      if (text_name === "from")
      {
        vm.loading_from_place = true;
      }

      var response = DirectionServices.get_addresses(input)



      .then(function(response){




      var results = response.results.map(function(item)
      {
        return item.formatted_address;
      } );

      if(vm.loading_location === false)
      {
        results.push("Current location Lat: " + vm.current_location.latitude + " Long: " + vm.current_location.longitude);
      }

      return results;


    });



      if (text_name === "to")
      {
        vm.loading_to = false;
      }
      if (text_name === "from")
      {
        vm.loading_from_place = false;
      }



      
      return response
    }

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }



  }
})();
