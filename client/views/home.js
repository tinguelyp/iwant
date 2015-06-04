Template.home.helpers({
  flash: function(){
    Meteor.setTimeout(function () {
      Session.set('flash', null);
    }, 3000);
    return Session.get("flash");
  }
});

Template.home.events({
  "click #to_give": function(e, t){
    Modal.show('userProfile');
  }
});
