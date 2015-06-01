Template.map.rendered = function() {
  L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

  var latlng = L.latLng(46.9753, 7.47025) ;
  var map = L.map('map', {
    doubleClickZoom: false,
    touchZoom: false
  }).setView(latlng, 13);

  //alert("mm");
  L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);
  L.marker(latlng).addTo(map) ;
  L.circle(latlng, 200).addTo(map);
  var h = $(window).height(), offsetTop = 90; 
  $mc = $('#map'); 
  $mc.css('height', (h - offsetTop)).resize() ;
  
  map.invalidateSize() ;
  

   map.on('click', function(event) {
     console.log(event.latlng);
   });

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

