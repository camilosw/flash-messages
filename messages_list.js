Template.meteorMessages.helpers({
  messages: function () {
    return Meteor.messages.find();
  }
});

Template.meteorMessage.rendered = function () {
  var message = this.data;
  Meteor.defer(function() {
    Meteor.messages.update(message._id, {$set: {seen: true}});
  });
};