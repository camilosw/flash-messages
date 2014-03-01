/**
 * messages 
 * { message: String,
 *   style: String,
 *   seen: Boolean }
 */
flashMessages = new Meteor.Collection(null);

FlashMessages = {
  sendAlert: function(message, options) {
    sendMessage(message, '', options);
  },
  sendError: function(message, options) {
    sendMessage(message, 'alert-error alert-danger', options);
  },
  sendSuccess: function(message, options) {
    sendMessage(message, 'alert-success', options);
  },
  sendInfo: function(message, options) {
    sendMessage(message, 'alert-info', options);
  },
  clear: function() {
    flashMessages.remove({seen: true});
  },
  configure: function(options) {
    this.options = this.options || {};
    _.extend(this.options, options);
  },
  options: {
    autoHide: true,
    hideDelay: 5000,
    scroll: true
  }
}

sendMessage = function(message, style, options) {
  options = options || {};
  options.autoHide = options.autoHide === undefined ? FlashMessages.options.autoHide : options.autoHide;
  options.hideDelay = options.hideDelay || FlashMessages.options.hideDelay;
  flashMessages.insert({ message: message, style: style, seen: false, options: options});  
}