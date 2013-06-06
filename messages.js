/**
 * messages 
 * { message: String,
 *   style: String,
 *   seen: Boolean }
 */
Meteor.messages = new Meteor.Collection(null);

Meteor.Messages = {
  sendAlert: function(message) {
    Meteor.messages.insert({message: message, style: '', seen: false});
  },
  sendError: function(message) {
    Meteor.messages.insert({message: message, style: 'alert-error', seen: false});
  },
  sendSuccess: function(message) {
    Meteor.messages.insert({message: message, style: 'alert-success', seen: false});
  },
  sendInfo: function(message) {
    Meteor.messages.insert({message: message, style: 'alert-info', seen: false});
  },
  clear: function() {
    Meteor.messages.remove({seen: true});
  }
}