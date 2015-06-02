
test_global = "global" ;
var latlng = L.latLng(46.9753, 7.47025) ;
var map ;
var circle ;
var circle_size = 200 ;

Template.map.rendered = function() {
  L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

  //latlng = L.latLng(46.9753, 7.47025) ;
  map = L.map('map', {
    doubleClickZoom: false,
    touchZoom: false,
    dragging: false
  }).setView(latlng, 13);

  //alert("mm");
  L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);
  L.marker(latlng).addTo(map) ;
  circle = L.circle(latlng, circle_size).addTo(map);
  var h = $(window).height(), offsetTop = 90; 
  $mc = $('#map'); 
  $mc.css('height', (h - offsetTop)).resize() ;
  
  map.invalidateSize() ;
  

   // map.on('click', function(event) {
   //   console.log(event.latlng);
   // });

  // var query = Markers.find();
  // query.observe({
  //   added: function (document) {
  //     var marker = L.marker(document.latlng).addTo(map)
  //       .on('click', function(event) {
  //         map.removeLayer(marker);
  //         Markers.remove({_id: document._id});
  //       });
  //   },
  //   removed: function (oldDocument) {
  //     layers = map._layers;
  //     var key, val;
  //     for (key in layers) {
  //       val = layers[key];
  //       if (val._latlng) {
  //         if (val._latlng.lat === oldDocument.latlng.lat && val._latlng.lng === oldDocument.latlng.lng) {
  //           map.removeLayer(val);
  //         }
  //       }
  //     }
  //   }
  // });



$(window).resize(function () { var h = $(window).height(), offsetTop = 90; $mc = $('#map'); $mc.css('height', (h - offsetTop)); }).resize();

};

Template.map.events({
 'change input[type="range"]': function(e,t) {

  //var latlng = L.latLng(46.9753, 7.47025) ;
    map.removeLayer(circle);
   // map.removeLayer(map.circle);
   L.circle(latlng, 400).addTo(map);


  console.log(latlng);
  //alert(test_global) ;
 }
})


 Template.map.onRendered(function () {
   this.$(".wrapper").swipe( {

     swipeUp: function(event, direction, distance, duration, fingerCount, fingerData) {
        console.log("swipe_left");
        changeCircle("up") ;

     },
     swipeDown: function(event, direction, distance, duration, fingerCount, fingerData) {
        console.log("swipe_right");
        changeCircle("down") ;
     }
   });
});

changeCircle = function(direction) {

   map.removeLayer(circle);
   var change = circle_size ;

   direction == "up" ? (circle_size *= 150/100) : (circle_size  *= 80/100) ; 
   // direction == "up" ? circle_size += change : circle_size -= change ; 
   // map.removeLayer(map.circle);
   circle = L.circle(latlng, circle_size).addTo(map);
    
}



