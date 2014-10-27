flash-messages
==============

Package for displaying flash messages to the user. This is based on the chapter 'Creating a Meteorite Package' from the [Discover Meteor Book](http://www.discovermeteor.com/) and the [foundation-flash-messages](https://github.com/datariot/foundation-flash-messages) package.

This package integrates well with [Bootstrap Alerts](http://getbootstrap.com/components/#alerts) styles, but Bootstrap is not a dependency.

You can see a [demo](http://flash-messages-demo.meteor.com/) and their [source code](https://github.com/camilosw/flash-messages-demo).

## Note

The syntax has changed on version 0.2.0

## Usage

Include the template somewhere in your index.html file:
```javascript
  {{> flashMessages}}
```
And then send messages:
```javascript
  FlashMessages.sendWarning("Message");
  FlashMessages.sendError("Message");
  FlashMessages.sendSuccess("Message");
  FlashMessages.sendInfo("Message");
```

**Note:** sendAlert was deprecated, use sendWarning instead.

You can also send a group of messages sending an array of strings. This will be rendered on a `ul` `li` list:
```javascript
  FlashMessages.sendInfo(["Message 1", "Message 2", "Message 3"]);
```

Messages can also contain html:
```javascript
  FlashMessages.sendInfo("You can found <strong>Meteor</strong> <a href='http://meteor.com'>here</a>");
```

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
    hideDelay: 5000,
    autoScroll: true
  });
```

- `autoHide`: set to `true` to make flash message fade after `hideDelay` milliseconds, set to `false` to require the user to click the close button on the message to dismiss it.
- `hideDelay`: set the desired number of milliseconds for the flash message to be displayed (when `autoHide` is `true`).
- `autoScroll`: set to `true` to enable auto scroll when a message is displayed, `false` to disable auto scroll. (**Note:** this can be set only globally.)

You can also set individual options on messages. This will override global configuration:
```javascript
  FlashMessages.sendWarning("Message", { autoHide: false });
  FlashMessages.sendError("Message", { hideDelay: 2000 });
  FlashMessages.sendSuccess("Message", { autoHide: true, hideDelay: 8000 });
```
