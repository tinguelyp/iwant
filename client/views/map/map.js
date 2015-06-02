
var latlng = L.latLng(46.9753, 10.47025) ;

var map ;
var circle ;
var circle_size = 200 ;

Template.map.rendered = function() {
  
  
  L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

  map = L.map('map', {
    doubleClickZoom: false,
    touchZoom: false,
    dragging: false
  }).setView(latlng, 13);

  L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);
  L.marker(latlng).addTo(map) ;
  circle = L.circle(latlng, circle_size).addTo(map);
  map.locate({setView: true, watch: true}) ;
  $mc = $('#map'); 
  $mc.css('height', '100vh') ;
  map.invalidateSize() ;
  //alert(Geolocation.currentLocation()) ;

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




getLocation = function() {
  loc = Geolocation.latLng() ;
  return loc ;
}

changeCircle = function(direction) {
  //alert(Geolocation.currentLocation()) ;

   map.removeLayer(circle);
   direction == "up" ? (circle_size *= 150/100) : (circle_size  *= 80/100) ; 
   circle = L.circle(latlng, circle_size).addTo(map);
}