Geos = new Mongo.Collection("geos");

Geos.attachSchema(
  new SimpleSchema({
    lat: {
      type: Number,
      label: "Latitude"
    },
    lng: {
      type: Number,
      label: "Longitude"
    }
  })
);