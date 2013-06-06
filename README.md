flash-messages
==============

Package for displaying flash messages to the user. This is based on the chapter 'Creating a Meteorite Package' from the [Discover Meteor Book](http://www.discovermeteor.com/) and [foundation-flash-messages](https://github.com/datariot/foundation-flash-messages) package.

This package integrate well with [Bootstrap Alerts](http://twitter.github.io/bootstrap/components.html#alerts) styles.

##Usage

Include the template somewhere in your index.html file:
```javascript
  {{> meteorMessages}}
```
And then send messages:
```javascript
  Meteor.Messages.sendAlert(MESSAGE);
  Meteor.Messages.sendError(MESSAGE);
  Meteor.Messages.sendSuccess(MESSAGE);
  Meteor.Messages.sendInfo(MESSAGE);
```
And to clear messages:
```javascript
  Meteor.Messages.clear();
```

Only the seen messages will be cleared.