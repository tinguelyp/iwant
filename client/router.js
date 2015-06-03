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
  progressSpinner: false
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
      return {
        jobs: Jobs.find({
          userId:Meteor.userId()
        }, {
          sort: {
            createdAt: -1
          }
        }),
        tags: Tags.find({})
      };
    },
    waitOn: function() {
      return subs.subscribe('home');
    }
  });

  this.route('map', {
    path: '/map'
  });

  //
  // this.route('myJobs', {
  //   path: '/myjobs',
  //   data: function() {
  //     return {
  //       jobs: Jobs.find({
  //         userId:Meteor.userId()
  //       }, {
  //         sort: {
  //           createdAt: -1
  //         }
  //       })
  //     };
  //   },
  //   waitOn: function() {
  //     return subs.subscribe('my_jobs');
  //   }
  // });
  //
  // this.route('job', {
  //   path: '/jobs/:_id/:slug?',
  //   data: function() {
  //     return Jobs.findOne({
  //       _id: this.params._id
  //     });
  //   },
  //   waitOn: function() {
  //     return subs.subscribe("job", this.params._id);
  //   },
  //   onBeforeAction: function() {
  //       var expectedSlug = this.data().slug();
  //       if (this.params.slug !== expectedSlug) {
  //           this.redirect("job", {_id:this.params._id, slug:expectedSlug});
  //       } else {
  //           this.next();
  //       }
  //   }
  // });
  //
  // this.route('jobNew', {
  //   path: '/job'
  // });
  //
  // this.route('jobEdit', {
  //   path: '/jobs/:_id/:slug/edit',
  //   data: function() {
  //     return {
  //       job: Jobs.findOne({
  //         _id: this.params._id
  //       })
  //     };
  //   },
  //   waitOn: function() {
  //     return subs.subscribe("job", this.params._id);
  //   }
  // });
  //profiles: Tags.find({'name': { $regex : Users.findOne({_id: Meteor.userId()}).profile.tags, $options:"i" }}, {
  this.route('wants', {
    path: '/wants',
    data: function() {
      console.log("DATA PUTAIN !!!!!");
      if(Users.findOne({_id: Meteor.userId()}).profile.tags == undefined){
        this.redirect("home");
        Modal.show('userProfile');
        return;
      }
      return {
        wants: Wants.find({'tag': { $in : Users.findOne({_id: Meteor.userId()}).profile.tags.split(",") }}, {
          sort: {
            randomSorter: 1
          }
        })
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
        console.log(expectedSlug);
        if (this.params.slug !== expectedSlug) {
            this.redirect("profile", {slug:expectedSlug});
        } else {
            this.next();
        }
    }
  });
  //
  // this.route('profileNew', {
  //   path: '/profile',
  //   onBeforeAction: function() {
  //     if (Meteor.user().isDeveloper) {
  //       Router.go('profile', Profiles.findOne({
  //         userId: Meteor.userId()
  //       }));
  //     } else {
  //       this.next();
  //     }
  //   }
  // });
  //
  // this.route('profileEdit', {
  //   path: '/profiles/:_id/:slug/edit',
  //   data: function() {
  //     return {
  //       profile: Profiles.findOne({
  //         _id: this.params._id
  //       })
  //     };
  //   },
  //   waitOn: function() {
  //     return subs.subscribe('profile', this.params._id);
  //   }
  // });
  //
  // //legacy url redirects
  // this.route('experts', function(){
  //   this.redirect("profiles");
  // });
  // this.route('experts/:_id', function(){
  //   this.redirect("profile", {_id:this.params._id});
  // });
//
// Router.onBeforeAction(AccountsTemplates.ensureSignedIn, {
//   only: ['profileEdit', 'profileNew', 'jobEdit', 'jobNew']
// });

  this.route('accept', {
    path: '/accept/:_id',

    data: function() {
      return Wants.findOne({
        _id: this.params._id
      });
    },
    waitOn: function() {
      return subs.subscribe('wants');
    }
  });
  this.route('chat', {
    path: '/chat',
    waitOn: function() {
      return this.subscribe('messages');
    },

    onBeforeAction: function(pause) {
      AccountsTemplates.ensureSignedIn.call(this, pause);
    }

  });
}); // END OF Router.map(function() {

Router.plugin('dataNotFound', {
  notFoundTemplate: 'notFound'
});
