flash-messages
==============

Package for displaying flash messages to the user. This is based on the chapter 'Creating a Meteorite Package' from the [Discover Meteor Book](http://www.discovermeteor.com/) and [foundation-flash-messages](https://github.com/datariot/foundation-flash-messages) package.

This package integrate well with [Bootstrap Alerts](http://twitter.github.io/bootstrap/components.html#alerts) styles, but Bootstrap is not a dependency.

You can see a [demo](http://flash-messages-demo.meteor.com/) and their [source code](https://github.com/camilosw/flash-messages-demo).

##Note

The syntax has changed on version 0.2.0

##Usage

Include the template somewhere in your index.html file:
```javascript
  {{> flashMessages}}
```
And then send messages:
```javascript
  FlashMessages.sendWarning(MESSAGE);
  FlashMessages.sendError(MESSAGE);
  FlashMessages.sendSuccess(MESSAGE);
  FlashMessages.sendInfo(MESSAGE);
```

**Note:** sendAlert was deprecated, use sendWarning instead.

To clear messages:
```javascript
  FlashMessages.clear();
```

Only the seen messages will be cleared.

##Configure

You can configure globally the way the messages behave with FlashMessages.configure (the below sample shows the default values):
```javascript
  FlashMessages.configure({
    autoHide: true,
    hideDelay: 5000
  });
```

**Note:** The above code sample shows default values. The default CSS related options correspond to Bootstrap classes,
but the implementation isn't tied to any particular CSS framework.

- `autoHide`: set to `true` to make flash message fade after `hideDelay` milliseconds, set to `false` to require the user to click the close button on the message to dismiss it.
- `hideDelay`: set the desired number of milliseconds for the flash message to be displayed (when `autoHide` is `true`).

You can also set individual options on messages. This will override global configuration:
```javascript
  FlashMessages.sendWarning(MESSAGE, { autoHide: false });
  FlashMessages.sendError(MESSAGE, { hideDelay: 2000 });
  FlashMessages.sendSuccess(MESSAGE, { autoHide: true, hideDelay: 8000 });
```
