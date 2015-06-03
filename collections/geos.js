Geos = new Mongo.Collection("geos");

GeoSchema = new SimpleSchema({
  lat: {
    type: Number,
    decimal: true,
    label: "Latitude"
  },
  lng: {
    type: Number,
    decimal: true,
    label: "Longitude"
  }
});

Geos.attachSchema(GeoSchema);


Geos.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return Roles.userIsInRole(userId, ['admin']) || (!_.contains(fieldNames, 'htmlDescription') && !_.contains(fieldNames, 'status') && userId && doc && userId === doc.userId);
  },
  remove: function(userId, doc) {
    return Roles.userIsInRole(userId, ['admin']) || (userId && doc && userId === doc.userId);
  },
  fetch: ['userId']
});
