Wants = new Mongo.Collection("wants");

Wants.attachSchema(
  new SimpleSchema({
    profileId: {
      type: String,
      label: "Profile Id",
      optional: true
    },
    positionId: {
      type: String,
      label: "Position Id",
      optional: true
    },
    tag: {
      type: String,
      label: "Tag"
    }
  })
);

Wants.helpers({
  needer: function() {
    Profiles.findOne(this.profileId);
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