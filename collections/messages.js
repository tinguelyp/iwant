// Define Collection
Messages = new Mongo.Collection('messages');

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
