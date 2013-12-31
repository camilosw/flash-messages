Template.flashMessage.rendered = ->
  #console.log "flash-message.rendered: %o, FM.options=%o", this, FlashMessages.options
  message = @data
  activeClass = FlashMessages.options.activeClass
  $alert = $(@find ".#{FlashMessages.options.alertClass}")
  Meteor.defer ->
    flashMessages.update message._id,
      $set:
        seen: true
    $alert.addClass activeClass

  if message.options and message.options.autoHide
    setTimeout ->
      $alert.removeClass activeClass
      setTimeout ->
        flashMessages.remove _id: message._id
      ,
        FlashMessages.options.transitionWait
    ,
      message.options.hideDelay

Template.flashMessages.helpers
  messages: ->
    #console.log "messages: this=%o", this
    id = this.id
    if id
      query = 'options.id': id
    else
      query =
        'options.id':
          $exists: false

    #console.log "messages: query=%o", query

    if flashMessages.find(query).count()
      # do we really want to unconditionally scroll like this?
      $('html, body').animate
        scrollTop: 0
      ,
        200
      flashMessages.find(query)

Template.flashMessage.events
  "click .close": (e, tmpl) ->
    e.preventDefault()
    flashMessages.remove tmpl.data._id
