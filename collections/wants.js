Wants = new Mongo.Collection("wants");

Wants.attachSchema(
  new SimpleSchema({
    needer: {
      type: String,
      label: "Needer",
      optional: false
    },
    giver: {
      type: String,
      label: "Giver",
      optional: true
    },
    messages: {
      type: MessageSchema,
      optional: true
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


Wants.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});

Wants.helpers({
  neederName: function() {
    return getUserName(Users.findOne(this.needer));//.profile.name;
  },
  hasGiver: function(){
    return this.giver;
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
    return true;
  },
  remove: function(userId, doc) {
    return Roles.userIsInRole(userId, ['admin']) || (userId && doc && userId === doc.userId);
  },
  fetch: ['userId']
});
