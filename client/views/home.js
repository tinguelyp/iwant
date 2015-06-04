Template.home.helpers({
  flash: function(){
    Meteor.setTimeout(function () {
      Session.set('flash', null);
    }, 3000);
    return Session.get("flash");
  }
});
