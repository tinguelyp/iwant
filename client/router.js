Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  yieldTemplates: {
    header: {
      to: 'header'
    },
    footer: {
      to: 'footer'
    }
  },
  progressSpinner: false,
  waitOn: function() {
    return subs.subscribe('notif');
  }
});

var subs = new SubsManager({
  cacheLimit: 20,
  expireIn: 5
});

Router.map(function() {
  this.route('home', {
    path: '/',
    layoutTemplate:'layoutNoContainer',
    data: function() {
      if(Meteor.userId()){
        return {
          users: Users.find(),
          tags: Tags.find({})
        }
      } else {
        return{
          tags: Tags.find({})
        };
      }
      if(Users.findOne({_id: Meteor.userId()}).profile.tags == undefined){
        this.redirect("home");
        Modal.show('userProfile');
        return;
      }
      return {
        tags: Tags.find({}),
        wants: Wants.find()
      };
    },
    waitOn: function() {
      return subs.subscribe('home');
    }
  });

  this.route('map', {
    path: '/map',
    data: function(){
      return {
        wants: Wants.find()
      }
    },
    waitOn: function() {
      return subs.subscribe('map');
    }
  });

  this.route('wants', {
    path: '/wants',
    data: function() {
      if(Users.findOne({_id: Meteor.userId()}).profile.tags == undefined){
        this.redirect("home");
        Modal.show('userProfile');
        return;
      }
      return {
        wants: Wants.find()
      };
    },
    waitOn: function() {
      return subs.subscribe('wants');
    }
  });

  this.route('profile', {
    path: '/profiles/:slug?',
    data: function() {
      return Tags.findOne({
        name: this.params.slug
      });
    },
    waitOn: function() {
      return subs.subscribe('profile', this.params.slug);
    },
    onBeforeAction: function() {
        var expectedSlug = this.data().slug();
        if (this.params.slug !== expectedSlug) {
            this.redirect("profile", {slug:expectedSlug});
        } else {
            this.next();
        }
    }
  });

  this.route('accept', {
    path: '/accept/:_id',

    data: function() {
      return Wants.findOne({
        _id: this.params._id
      });
    }
  });
  this.route('chat', {
    path: '/chat/:_id',
    waitOn: function() {
      return this.subscribe('chat', this.params._id);
    },
    data: function() {
      return {
        wants: Wants.find(),
        messages: Messages.find()
      };
    }

  });

}); // END OF Router.map(function() {

Router.plugin('dataNotFound', {
  notFoundTemplate: 'notFound'
});
//chat, wants, profile, map, home
