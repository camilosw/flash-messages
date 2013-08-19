/**
 * messages 
 * { message: String,
 *   style: String,
 *   seen: Boolean }
 */
flashMessages = new Meteor.Collection(null);

FlashMessages = {
  sendAlert: function(message) {
    flashMessages.insert({message: message, style: '', seen: false});
  },
  sendError: function(message) {
    flashMessages.insert({message: message, style: 'alert-error alert-danger', seen: false});
  },
  sendSuccess: function(message) {
    flashMessages.insert({message: message, style: 'alert-success', seen: false});
  },
  sendInfo: function(message) {
    flashMessages.insert({message: message, style: 'alert-info', seen: false});
  },
  clear: function() {
    flashMessages.remove({seen: true});
  }
}