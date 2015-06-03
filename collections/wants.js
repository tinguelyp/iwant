Wants = new Mongo.Collection("wants");

Wants.attachSchema(
  new SimpleSchema({
    needer: {
      type: String,
      label: "Needer",
      optional: false
    },
    geo: {
      type: GeoSchema,
      optional: true
    },
    tag: {
      type: String,
      label: "Tag",
      optional: true
    },
    rayon: {
      type: Number,
      optional: true
    }
  })
);

Wants.helpers({
  neederName: function() {
    Users.findOne(this.needer).profile.name;
  },
  position: function() {
    Geos.findOne(this.positionId);
  }
});

Wants.allow({
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
