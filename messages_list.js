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

Template.meteorMessage.events({
  "click .close": function (e, tmpl) {
    e.preventDefault();
    Meteor.messages.remove(tmpl.data._id);
  }
});