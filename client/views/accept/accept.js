Template.accept.events({
  "click .ok": function(e, t){
    console.log("ok");
  },
  "click .ignore": function(e, t){
    console.log("ignore");
  }
});

Template.accept.rendered = function() {
  //Enable swiping...


  // Display Map
  L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images';
  var marker_you;
  var marker_needer;
  var group;

  var map = L.map('map', {
    doubleClickZoom: false,
    touchZoom: false,
    dragging: false
  }); //.setView([46.975260, 7.470861], 15);
  L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);

  map.locate({
    setView: false,
    watch: false
  });


  Wants.find(this.data._id).observe({
    added: function(item) {
      console.log(item);
      marker_needer = L.marker([item.geo.lat, item.geo.lng]).addTo(map); //TODO take position from yourself geolocalisation!
      marker_needer.bindPopup(L.popup().setContent('<p>'+Users.findOne(item.needer).profile.name+'</p>')).openPopup(); //TODO take name from needer profile

      $(".wrapper").swipe({
        //Generic swipe handler for all directions
        swipeLeft: function(event, direction, distance, duration, fingerCount, fingerData) {
          Router.go('chat', {_id: item._id})
          Wants.update(item._id,{$set: {giver: Meteor.userId()}});
        }
      });
    }
  });

  map.on('locationfound', function(event) {
    //marker you
    marker_you = L.marker([event.latitude, event.longitude]).addTo(map);
    marker_you.bindPopup(L.popup().setContent('<p>You</p>'));

    // Resize map
    $mc = $('#map');
    $mc.css('height', "50vh").resize();

    map.invalidateSize();
    group = new L.featureGroup([marker_you, marker_needer]);
    map.fitBounds(group.getBounds());
  });
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
