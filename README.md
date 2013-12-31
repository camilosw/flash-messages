flash-messages-plus
===================

Package for displaying flash messages to the user.

This package is a convergence of multiple influences:

* the chapter 'Creating a Meteorite Package' from the [Discover Meteor Book](http://www.discovermeteor.com/)
* [foundation-flash-messages](https://github.com/datariot/foundation-flash-messages)
* the [original package from which this was forked](https://github.com/camilosw/flash-messages)
* this [excellent flash package for Angular-JS](https://github.com/wmluke/angular-flash)

This package integrate well with [Bootstrap Alerts](http://twitter.github.io/bootstrap/components.html#alerts) styles, but Bootstrap is not a dependency.

You can see [a demo of the original package](http://flash-messages-demo.meteor.com/) and [a modified version of the source code to work with this package](https://github.com/tony-kerz/flash-messages-demo).

##Default Usage

Include the template somewhere in your index.html file:
```javascript
  {{> flashMessages}}
```
And then send messages:
```javascript
  FlashMessages.sendAlert(MESSAGE);
  FlashMessages.sendError(MESSAGE);
  FlashMessages.sendSuccess(MESSAGE);
  FlashMessages.sendInfo(MESSAGE);
```
To clear messages:
```javascript
  FlashMessages.clear();
```

Only the seen messages will be cleared.

###Named Flash Message Usage

The default usage should be sufficient for most use-cases, but it is possible to have "Named" flash messages
for situations where multiple flash message areas are desired. This may be the case with complex layouts or
when constructing packages with their own views containing flash messages.

The following configuration may be improved via the up and coming `meteor-ui` project, but for now,
based on `meteor` circa `0.7.x` the following may be used:

Include the template somewhere in your index.html file:
```javascript
  {{> flashMessages myFlashIdHelper}}
```

where `myFlashIdHelper` has been defined like so:

```
Handlebars.registerHelper('myFlashIdHelper', function() {
  return { id: 'myFlashId'};
});
```

And then send messages:
```javascript
  FlashMessages.sendAlert(MESSAGE, {id: 'myFlashId'});
  FlashMessages.sendError(MESSAGE, {id: 'myFlashId'});
  FlashMessages.sendSuccess(MESSAGE, {id: 'myFlashId'});
  FlashMessages.sendInfo(MESSAGE, {id: 'myFlashId'});
```

##Configure

You can configure globally the way the messages behave with FlashMessages.configure (the below sample shows the default values):

```javascript
  FlashMessages.configure({
    autoHide: true,
    hideDelay: 5000,
    activeClass: 'in',
    alertClasses: 'alert fade',
    errorClasses: 'alert alert-error alert-danger fade',
    successClasses: 'alert alert-success fade',
    infoClasses: 'alert alert-info fade',
    buttonClasses: 'close',
    transitionWait: 2000
  });
```

<b>NOTE</b>: The above code sample shows default values. The default CSS related options correspond to Bootstrap classes,
but the implementation isn't tied to any particular CSS framework.

- `autoHide`: set to `true` to make flash message fade after `hideDelay` milliseconds,
set to `false` to require the user to click the message to dismiss it.
- `hideDelay`: set the desired number of milliseconds for the flash message to be displayed (when `autoHide` is `true`)
- `activeClass`: class that will be automatically added and removed to effect the CSS transition
- `alertClasses`: classes to be used with default alert styling
- `errorClasses`: classes to be used with `error` styling
- `successClasses`: classes to be used with `success` styling
- `infoClasses`: classes to be used with `info` styling
- `buttonClasses`: classes to be used when `autoHide` is set to `false` and flash message has a dismiss button
- `transitionWait`: number of milliseconds to allow for the transition(s) activated by removing the `activeClass`

You can also set `autoHide`, `hideDelay` and `id` options on messages. This will override global configuration:
```javascript
  FlashMessages.sendAlert(MESSAGE, { autoHide: false });
  FlashMessages.sendError(MESSAGE, { hideDelay: 2000 });
  FlashMessages.sendSuccess(MESSAGE, { autoHide: true, hideDelay: 8000 });
  FlashMessages.sendInfo(MESSAGE, {id: 'myFlashId');
```

###CSS Configuration for a fade transition

You can use the following CSS snippet to configure a fade effect based on the default styling depicted above which depends
on the Bootstrap `fade` and `in` classes:

The value of `transitionWait` should be greater than or equal to the `transition` duration specified here:

```
.fade {
    opacity: 0;
    -webkit-transition: all 1s linear;
    transition: all 1s linear;
}
```

