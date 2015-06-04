Meteor.publish("userData", function() {
  check(arguments, [Match.Any]);
  if (this.userId) {
    return [
      Users.find({
        _id: this.userId
      }),
      Profiles.find({
        userId: this.userId
      })
    ];
  }
  this.ready();
});

Meteor.publish("home", function() {
  check(arguments, [Match.Any]);
  if (this.userId) {
    return [
      Users.find({
        _id: this.userId
      }),
      Tags.find()
    ];
  }
  this.ready();
});

Meteor.publish("map", function() {
  check(arguments, [Match.Any]);
  if (this.userId) {
    return [
      Wants.find({'tag': { $in : Users.findOne({_id: this.userId}).profile.tags.split(",") }}, {
        sort: {
          randomSorter: 1
        }
      })
    ];
  }
  this.ready();
});

Meteor.publish('chat', function(wantId) {
  return [
    Wants.find(wantId),
    Messages.find({
      'wantId': wantId
    })
  ];
});


Meteor.publish("notif", function() {
  check(arguments, [Match.Any]);
  if (this.userId) {
    return [
      Wants.find(
        { $or: [
          { $and: [
            { needer: { $ne: this.userId } },
            { giver: this.userId }
          ]},
          { $and: [
            { 'tag': { $in : Users.findOne({_id: this.userId}).profile.tags.split(",") } },
            { giver: null }
          ]}
          ,
          { needer: this.userId }
        ]}
    , {
        $sort: {
          createdAt: -1
        }
      }),
      Users.find({})
    ];
  }
  this.ready();
});

Meteor.publish("wants", function() {
  check(arguments, [Match.Any]);
  return [
    Wants.find({
      needer: { $ne: this.userId },
      giver: null
    }, {
    }),
    Users.find({})
  ];
});
