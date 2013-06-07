Template.meteorMessage.rendered = function () {
  var message = this.data;
  Meteor.defer(function() {
    Meteor.messages.update(message._id, {$set: {seen: true}});
  });
};

Template.meteorMessages.helpers({
  messages: function () {
    if (Meteor.messages.find().count())
      $('html, body').animate({
        scrollTop: 0
      }, 200);
    return Meteor.messages.find();
  }
});

Template.meteorMessage.events({
  "click .close": function (e, tmpl) {
    e.preventDefault();
    Meteor.messages.remove(tmpl.data._id);
  }
});