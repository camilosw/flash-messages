Template.flashMessage.rendered = function () {
  var message = this.data;
  Meteor.defer(function() {
    flashMessages.update(message._id, {$set: {seen: true}});
  });
  if (message.options && message.options.autoHide) {
    $alert = $(this.find('.alert'));
    Meteor.setTimeout(function() {
        $alert.fadeOut(400, function() {
          flashMessages.remove({_id: message._id});
        });    
      }, 
      message.options.hideDelay);
  }
};

Template.flashMessages.helpers({
  messages: function () {
    if (flashMessages.find().count() && FlashMessages.options.scroll)
      $('html, body').animate({
        scrollTop: 0
      }, 200);
    return flashMessages.find();
  }
});

Template.flashMessage.events({
  "click .close": function (e, tmpl) {
    e.preventDefault();
    flashMessages.remove(tmpl.data._id);
  }
});