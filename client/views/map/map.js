var latlng = L.latLng(46.9749, 7.4705);

var map;
var circle;
var circle_size = 200;
var init_pos = true;


Template.map.events({
	'click #iWantMap': function(event, template){
    submitWant(event, template);
  },
  'keypress #iWantTag':  function(event, template){
    enterWant(event);
  }
});

var submitWant = function(event, template){
  event.preventDefault();
  console.log($('#iWantTag').val());
  Wants.insert({needer: Meteor.userId(), tag: $('#iWantTag').val().toLowerCase(), rayon: Session.get('rayon'), geo: {lat: Session.get('lat'), lng: Session.get('lng')}});
  $('#iWantTag').val('');
	Session.set("flash", 'iWants well created');
  Router.go("/");
}

var enterWant = function(event){
  if(event.which == 13){
    event.preventDefault();
    submitWant(event);
  }
}

//
// AutoForm.addHooks(['insertWants'], {
// 	after: {
// 		insert: function(error, result) {
// 			if (error) {
// 				console.log(error);
// 			} else {
// 				GAnalytics.event("userProfile", "edit", getUserName(Meteor.user()));
// 				Modal.hide("userProfile");
// 			}
// 		}
// 	}
// });

Template.map.rendered = function() {
//
//   // Get an array of the existing tags
//   var tagOptions = Tags.find().fetch();
//
//   $('#tags').selectize({
//       delimiter: ',',
//       persist: false,
//       valueField: 'name',
//       labelField: 'name',
//       searchField: 'name',
//       create: true, // TODO: Add entries to Tags collection.
//       highlight: true,
//       maxOptions: 5,
//       // options: tagOptions,
//       onItemAdd: function (item) {
// 					item = item.toLowerCase();
//           // Check to see if tag exists in Tags collection
//           // by querying the database for the tag name
//           // and checking the length of the result
//           var existingTag = Tags.find({"name": {$regex : new RegExp(item, "i") }}).fetch().length;
//           console.log(existingTag);
//           if (!existingTag) {
//               // Add the tag to the Tags collection
//               // TODO: figure out how to limit duplicate tags
//               // e.g. 'Beans' and 'beans'
//               // unless this is not an issue
//               Tags.insert({"name": item.toLowerCase()});
//           }
//       }
// });

  // var iWantIcon = L.icon({
  //     iconUrl: 'images/favicons/favicon-32x32.png',
  //     iconRetinaUrl: 'images/favicons/favicon-32x32.png'

  // });

  L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

  map = L.map('map', {
    doubleClickZoom: false,
    touchZoom: false,
    dragging: false
  }).setView(latlng, 14);

  L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);
  // L.marker(latlng).addTo(map) ;
  // circle = L.circle(latlng, circle_size).addTo(map);
  map.locate({
    setView: true,
    watch: false,
    // timeout: 3000
  });



  map.on('locationfound', function(event) {
    console.log(event);
    if (init_pos) {
      latlng.lat = event.latitude;
      latlng.lng = event.longitude;
      // L.marker([event.latitude, event.longitude], {icon: iWantIcon}).addTo(map);
      L.marker([event.latitude, event.longitude]).addTo(map);
      circle = L.circle([event.latitude, event.longitude], circle_size).addTo(map);
      console.log(circle);
      Session.set('lat', latlng.lat);
      Session.set('lng', latlng.lng);
      init_pos = false;
      map.setZoom(12);
    }
  });

  map.on('locationerror', function(event) {
    // alert("Location access denied.")
  });

  // $mc = $('#map');
  // $mc.css('height', '100vh');
  map.invalidateSize();


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


  // $(window).resize(function() {
  //   $mc = $('#map');
  //   $mc.css('height', '100vh');
  // }).resize();

  this.$(".map-map").swipe({

    swipeUp: function(event, direction, distance, duration, fingerCount, fingerData) {
      changeCircle("up");
    },
    swipeDown: function(event, direction, distance, duration, fingerCount, fingerData) {
      changeCircle("down");
    }
  });

};


changeCircle = function(direction) {
  console.log("changeCircle");
  map.removeLayer(circle);
  direction == "up" ? (circle_size *= 150 / 100) : (circle_size *= 80 / 100);
  if (circle_size <= 200) {
    circle_size = 200;
  }
  Session.set("rayon", circle_size);
  console.log("HOI")
  console.log(circle_size);

  circle = L.circle(latlng, circle_size).addTo(map);

  console.log(circle);


}
