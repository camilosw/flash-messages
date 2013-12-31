flashMessages = new Meteor.Collection null

sendMessage = (message, type, options) ->
  #console.log 'send-message: msg=%s, type=%s, options=%o, defaults=%o', message, type, options, defaults
  options = _.defaults options || {}, FlashMessages.options
  msgOptions = _.pick options, ['autoHide', 'hideDelay', 'id']
  #console.log "send-message: msg-options=%o", msgOptions
  flashMessages.insert
    message: message
    style: "#{options.alertClass} #{options[type + 'Classes']} #{options.transitionClass}"
    seen: false
    options: msgOptions

FlashMessages =
  sendWarning: (message, options) ->
    sendMessage message, 'warning', options

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
    alertClass: 'alert'
    transitionClass: 'fade'
    warningClasses: 'alert-warning'
    errorClasses: 'alert-error alert-danger'
    successClasses: 'alert-success'
    infoClasses: 'alert-info'
    buttonClasses: 'close'
    transitionWait: 2000