Template.header.helpers({
  wants: function() {
    return Wants.find();
  },
  iWantsCounter: function () {
    return Wants.find({},{}).count();
  }
});

Template.header.rendered = function(){
  this.autorun(function(){
    Wants.find();
    Router.current().subscribe('notif');
    // var data = Router.current().data();
    // console.log(data);
    // console.log(Wants.find())
  });
}

Template.header.events({
  'click #signOut': function(event, template) {
    Meteor.logout();
    Router.go("/");
  },
  'click .navbar-nav a': function() {
    var targetButton = document.getElementsByClassName('navbar-toggle')[0];

    // if (window.innerWidth < 768) {
    //   targetButton.click()
    // }
  },
  'click #userProfile': function(event, template) {
    event.preventDefault();
    Modal.show('userProfile');
  },

});
