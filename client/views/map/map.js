
var latlng = L.latLng(46.9749, 7.4705) ;

var map ;
var circle ;
var circle_size = 200 ;
var init_pos = true ;

Template.map.rendered = function() {
  
  
  L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

  map = L.map('map', {
    doubleClickZoom: false,
    touchZoom: false,
    dragging: false
  }).setView(latlng, 15);

  L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);
  // L.marker(latlng).addTo(map) ;
  // circle = L.circle(latlng, circle_size).addTo(map);
  map.locate({setView: true, watch: false}) ;
  


  map.on('locationfound', function(event) {
    console.log(event);
    if(init_pos) { 
      latlng.lat = event.latitude ;
      latlng.lng = event.longitude ;
      L.marker([event.latitude, event.longitude]).addTo(map) ;
      circle = L.circle([event.latitude, event.longitude], circle_size).addTo(map);
      console.log(circle) ;
      init_pos = false ;
      map.setZoom(14);
    }
  });

  map.on('locationerror', function(event) {
    alert("Location access denied.")
  });

  $mc = $('#map'); 
  $mc.css('height', '100vh') ;
  map.invalidateSize() ;

  // var loadMap = function (id) {
  //   var HELSINKI = [60.1708, 24.9375];
  //   map = L.map(id);
  //   var tile_url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
  //   var layer = L.tileLayer(tile_url, {
  //       attribution: 'OSM'
  //   });
  //   map.addLayer(layer);
  //   map.setView(HELSINKI, 19);

  //   map.locate({setView: true, watch: true}) /* This will return map so you can do chaining */
  //       .on('locationfound', function(e){
  //           var marker = L.marker([e.latitude, e.longitude]).bindPopup('Your are here :)');
  //           var circle = L.circle([e.latitude, e.longitude], e.accuracy/2, {
  //               weight: 1,
  //               color: 'blue',
  //               fillColor: '#cacaca',
  //               fillOpacity: 0.2
  //           });
  //           map.addLayer(marker);
  //           map.addLayer(circle);
  //       })
  //      .on('locationerror', function(e){
  //           console.log(e);
  //           alert("Location access denied.");
  //       });
  //   };

  //   loadMap('map');








  $(window).resize(function () { $mc = $('#map'); $mc.css('height', '100vh'); }).resize();

  this.$(".wrapper").swipe( {

    swipeUp: function(event, direction, distance, duration, fingerCount, fingerData) {
      changeCircle("up") ;
    },
    swipeDown: function(event, direction, distance, duration, fingerCount, fingerData) {
      changeCircle("down") ;
    }
  });

};





changeCircle = function(direction) {
   console.log("changeCircle");
   map.removeLayer(circle);
   direction == "up" ? (circle_size *= 150/100) : (circle_size  *= 80/100) ; 
   if(circle_size <= 200) {circle_size = 200 ;}
   console.log(circle_size) ;
 
   circle = L.circle(latlng, circle_size).addTo(map);
 
   console.log(circle) ;


}