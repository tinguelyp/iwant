Tags = new Mongo.Collection('tags');

Tags.allow({
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

Tags.helpers({
  displayName: function() {
    return this.name || this.userName;
  },
  path: function() {
    return 'profiles/' + this.slug();
  },
  slug: function() {
    return getSlug(this.displayName());
  }
});
