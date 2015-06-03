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
    layoutTemplate: 'layoutNoContainer'
  });

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
    path: '/chat'
  });

  this.route('jobs', {
    path: '/jobs'
  });


});

Router.plugin('dataNotFound', {
  notFoundTemplate: 'notFound'
});