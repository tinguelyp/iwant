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

  this.route('map', {
    path: '/map'
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

});

Router.plugin('dataNotFound', {
  notFoundTemplate: 'notFound'
});
