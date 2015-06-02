Template.accept.onRendered(function() {
  //Enable swiping...
  this.$(".wrapper").swipe({
    //Generic swipe handler for all directions
    swipeLeft: function(event, direction, distance, duration, fingerCount, fingerData) {
      Router.go('chat')
    }
  });

  // Display Map
  L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

  var map = L.map('map', {
    doubleClickZoom: false
  }).setView([46.975260, 7.470861], 15);
  L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);

  // Marker needer
  var needer_marker = L.marker([46.975260, 7.470861]).addTo(map);
  needer_marker.bindPopup(L.popup().setContent('<p>Samantha</p>')).openPopup();
  // Marker you
  var marker_you = L.marker([46.973738, 7.472458]).addTo(map);
  marker_you.bindPopup(L.popup().setContent('<p>You</p>'));

  // Resize map
  $mc = $('#map');
  $mc.css('height', "25%").resize();

  map.invalidateSize();
});

Template.accept.helpers({
  tag: function() {
    return "#pause_café"
  }
});