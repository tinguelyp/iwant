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

 // Subscriptions on collections/publications
// Meteor.subscribe("userData");
// Meteor.subscribe("jobCount");
// Meteor.subscribe("developerCount");

Router.map(function() {
  this.route('home', {
    path: '/',
    layoutTemplate:'layoutNoContainer'
  });

  this.route('jobs', {
    path: '/jobs'
  });

  this.route('settings', {
    path: '/settings'
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
  //
  // this.route('profiles', {
  //   path: '/profiles',
  //   data: function() {
  //     return {
  //       profiles: Profiles.find({}, {
  //         sort: {
  //           randomSorter: 1
  //         }
  //       })
  //     };
  //   },
  //   waitOn: function() {
  //     return subs.subscribe('profiles');
  //   }
  // });
  //
  // this.route('profile', {
  //   path: '/profiles/:_id/:slug?',
  //   data: function() {
  //     return Profiles.findOne({
  //         _id: this.params._id
  //       });
  //   },
  //   waitOn: function() {
  //     return subs.subscribe('profile', this.params._id);
  //   },
  //   onBeforeAction: function() {
  //       var expectedSlug = this.data().slug();
  //       if (this.params.slug !== expectedSlug) {
  //           this.redirect("profile", {_id:this.params._id, slug:expectedSlug});
  //       } else {
  //           this.next();
  //       }
  //   }
  // });
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
}); // END OF Router.map(function() {
//
// Router.onBeforeAction(AccountsTemplates.ensureSignedIn, {
//   only: ['profileEdit', 'profileNew', 'jobEdit', 'jobNew']
// });

//
// Router.onBeforeAction(function(){
//   loadUploadcare();
//   this.next();
// },{only:['profileEdit','profileNew','jobEdit','jobNew']});

Router.plugin('dataNotFound', {notFoundTemplate: 'notFound'});
//
// Router.onRun(function() {
//   GAnalytics.pageview();
// });
