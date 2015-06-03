Template.accept.rendered = function() {
  //Enable swiping...
  this.$(".wrapper").swipe({
    //Generic swipe handler for all directions
    swipeLeft: function(event, direction, distance, duration, fingerCount, fingerData) {
      Router.go('chat')
    }
  });

  // Display Map
  L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images';

  var map = L.map('map', {
    doubleClickZoom: false
  }).setView([46.975260, 7.470861], 15);
  L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);

  map.locate({
    setView: true,
    watch: false
  });
  map.on('locationfound', function(event) {
    //marker you
    var marker_you = L.marker([event.latitude, event.longitude]).addTo(map);
    marker_you.bindPopup(L.popup().setContent('<p>You</p>')).openPopup();
    // marker needer
    var marker_needer = L.marker([46.973738, 7.472458]).addTo(map); //TODO take position from yourself geolocalisation!
    marker_needer.bindPopup(L.popup().setContent('<p>Samantha</p>')); //TODO take name from needer profile
  });

  // Resize map
  $mc = $('#map');
  $mc.css('height', "50vh").resize();

  map.invalidateSize();
};

Template.accept.helpers({
  tag: function() {
    return this.tag;
  }
  // profile: {
  // needer_name: want.needer().name
  // age: want.needer().age,
  // photo_path: want.needer().photo
  // }
});