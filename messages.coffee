flashMessages = new Meteor.Collection null

sendMessage = (message, type, options) ->
  #console.log 'send-message: msg=%s, type=%s, options=%o, defaults=%o', message, type, options, defaults
  options = _.defaults options || {}, FlashMessages.options
  msgOptions = _.pick options, ['autoHide', 'hideDelay', 'id']
  console.log "send-message: msg-options=%o", msgOptions
  flashMessages.insert
    message: message
    style: options[type + 'Classes']
    seen: false
    options: msgOptions

FlashMessages =
  sendAlert: (message, options) ->
    sendMessage message, 'alert', options

  sendError: (message, options) ->
    sendMessage message, 'error', options

  sendSuccess: (message, options) ->
    sendMessage message, 'success', options

  sendInfo: (message, options) ->
    sendMessage message, 'info', options

  clear: ->
    flashMessages.remove seen: true

  configure: (options) ->
    #console.log 'configure: options=%o', options
    @options = _.defaults options || {}, @options

  options:
    autoHide: true
    hideDelay: 5000
    activeClass: 'in'
    alertClasses: 'alert fade'
    errorClasses: 'alert alert-error alert-danger fade'
    successClasses: 'alert alert-success fade'
    infoClasses: 'alert alert-info fade'
    buttonClasses: 'close'
    transitionWait: 2000