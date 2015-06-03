Meteor.publishComposite('messages', function() {
  return {
    find: function() {
      return Messages.find({});
    }
  };
});

Meteor.publish(null, function() {
  return Meteor.users.find({}, {
    fields: {
      'emails': 1,
      'userId': 1
    }
  });
});

// Permissions
Messages.allow({
  'insert': function(userId, doc) {
    return userId;
  },
  'update': function(userId, doc, fields, modifier) {
    return userId;
  },
  'remove': function(userId, doc) {
    return userId;
  }
});

// Methods
Meteor.methods({
  clean: function() {
    Messages.remove({});
  }
});
