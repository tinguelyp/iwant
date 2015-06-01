Tags = new Mongo.Collection("tags");

Tags.attachSchema(
  new SimpleSchema({
    title: {
      type: String,
      max: 128
    }
  })
);

Tags.helpers({
  path: function() {
    return 's/' + this._id + '/' + this.slug();
  },
  slug: function() {
    return getSlug(this.title);
  }
});

Jobs.allow({
  insert: function(userId, doc) {
    return userId && doc && userId === doc.userId;
  }
});
