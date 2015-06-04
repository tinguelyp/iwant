// Define Collection
Messages = new Mongo.Collection('messages');



MessageSchema = new SimpleSchema({
  content: {
    type: String,
    optional: true
  },
  userId: {
    type: String,
    optional: true
  },
  wantId: {
    type: String,
    optional: true
  }
});

// Collection Helpers https://github.com/dburles/meteor-collection-helpers
Messages.helpers({
  user: function() {
    return Meteor.users.findOne(this.userId);
  }
});

Meteor.users.helpers({
  messages: function() {
    return Messages.find({
      userId: this._id
    });
  }
});

// Collection Hooks https://github.com/matb33/meteor-collection-hooks
Messages.before.insert(function(userId, doc) {
  doc.createdAt = moment().toDate();
});


Messages.allow({
  insert: function(userId, doc) {
    console.log(doc);
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
