Template.chat_footer.events({
  "click [data-action='send-message']": function(e) {
    // Prevent default button click behavior
    e.preventDefault();
    // Insert the form data into the "Messages" collection
    Messages.insert({
      content: $("[content='content']").val(),
      userId: Meteor.userId(),
      wantId: Router.current().params._id
    });

    $("[content='content']").val("");
    $('#chat-send-button').attr("disabled", true);
  },

  "keypress #area": function(evt, template) {
    if (evt.which === 13) {
      // Prevent default button click behavior
      evt.preventDefault();

      if ($("[content='content']").val().length == 0) return;

      // Insert the form data into the "Messages" collection
      Messages.insert({
        content: $("[content='content']").val(),
        userId: Meteor.userId(),
        wantId: Router.current().params._id
      });

      $("[content='content']").val("");
      $('#chat-send-button').attr("disabled", true);
    }
  },

  "keyup #area": function(evt, template) {
    if ($("[content='content']").val().length == 0) {
      $('#chat-send-button').attr("disabled", true);
    } else {
      $('#chat-send-button').attr("disabled", false);
    }
  }

});

Template.chat.rendered = function() {

  $(".content-chat").animate({
    scrollTop: $('.content-chat')[0].scrollHeight
  }, 1000);

  this.find('.content-chat')._uihooks = {
    insertElement: function(node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .slideDown(200);

      $(".content-chat").animate({
        scrollTop: $('.content-chat')[0].scrollHeight
      }, 1000);
    },

    removeElement: function(node) {
      $(node).fadeOut(function() {
        this.remove();
      });
    }
  };

};

Template.chat.helpers({
  messages: function() {
    return Messages.find({});
  },

  currentUserMessage: function(userId) {
    return Meteor.user()._id == userId;
  },

  formatTime: function(time) {
    return moment(time).format('HH:mm');
  }
});
