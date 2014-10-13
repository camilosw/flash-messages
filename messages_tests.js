// Helpers

var messagesCount = function() {
  return flashMessages.find({}).count();
}

var findOneMessage = function() {
  return flashMessages.findOne({});
}

var cleanMessages = function() {
  flashMessages.remove({});
}

// Tests

Tinytest.add('flash-messages - Messages Collection works', function(test) {
  test.equal(messagesCount(), 0);
});

Tinytest.add('flash-messages - Add warning message', function(test) {
  cleanMessages();
  var message = 'This is a warning message';
  FlashMessages.sendWarning(message);

  test.equal(messagesCount(), 1);

  test.equal(findOneMessage().message, message, 
    'Warning messages should be ' + message);

  test.equal(findOneMessage().style, 'alert-warning', 'Style should be alert-warning');

  test.equal(findOneMessage().seen, false, 'Seen should be false');
});

Tinytest.add('flash-messages - Add error message', function(test) {
  cleanMessages();
  var message = 'This is an error message';
  FlashMessages.sendError(message);

  test.equal(messagesCount(), 1);

  test.equal(findOneMessage().message, message, 
    'Error messages should be ' + message);

  test.equal(findOneMessage().style, 'alert-error alert-danger', 
    'Style should be alert-error');

  test.equal(findOneMessage().seen, false, 'Seen should be false');
});

Tinytest.add('flash-messages - Add success message', function(test) {
  cleanMessages();
  var message = 'This is a success message';
  FlashMessages.sendSuccess(message);

  test.equal(messagesCount(), 1);

  test.equal(findOneMessage().message, message, 
    'Success messages should be ' + message);

  test.equal(findOneMessage().style, 'alert-success', 'Style should be alert-success');

  test.equal(findOneMessage().seen, false, 'Seen should be false');
});

Tinytest.add('flash-messages - Add info message', function(test) {
  cleanMessages();
  var message = 'This is an info message';
  FlashMessages.sendInfo(message);

  test.equal(messagesCount(), 1);

  test.equal(findOneMessage().message, message, 
    'Info messages should be ' + message);

  test.equal(findOneMessage().style, 'alert-info', 'Style should be alert-info');

  test.equal(findOneMessage().seen, false, 'Seen should be false');
});

Tinytest.add('flash-messages - Add messages grouped', function(test) {
  cleanMessages();
  var messages = ['Message 1', 'Message 2', 'Message 3'];
  FlashMessages.sendInfo(messages);

  test.equal(messagesCount(), 1);
});

Tinytest.add("flash-messages - Don't remove unseen messages", function(test) {
  cleanMessages();
  FlashMessages.sendError('message');
  FlashMessages.clear();
  test.equal(messagesCount(), 1);
});

testAsyncMulti('flash-messages - Remove seen messages', [
  function(test, expect) {
    cleanMessages();
    FlashMessages.sendError('message');

    UI.insert(UI.render(Template.flashMessages), document.body);
    Meteor.setTimeout(expect(function(){
      test.equal(messagesCount(), 1);
      test.equal(flashMessages.find({seen: false}).count(), 0, 
        'Messages should be marqued as seen (seen: true)');
      FlashMessages.clear();
      test.equal(flashMessages.find({seen: true}).count(), 0, 
        'Messages seen should be cleared');
    }), 500);
  }
]);

testAsyncMulti('flash-messages - Remove when click close button', [
  function(test, expect) {
    cleanMessages();
    FlashMessages.sendError('message', {showCloseButton: true});

    UI.insert(UI.render(Template.flashMessages), document.body);
    Meteor.setTimeout(expect(function(){
      test.equal(messagesCount(), 1);
      clickElement(document.getElementsByClassName('close')[0]);
      test.equal(messagesCount(), 0);
    }), 500);
  }
]);

testAsyncMulti('flash-messages - Remove after 5 seconds', [
  function(test, expect) {
    cleanMessages();
    FlashMessages.sendError('message');

    UI.insert(UI.render(Template.flashMessages), document.body);
    Meteor.setTimeout(expect(function(){
      test.equal(messagesCount(), 1);
    }), 500);
    Meteor.setTimeout(expect(function(){
      test.equal(messagesCount(), 0);
    }), 6000);
  }
]);

testAsyncMulti("flash-messages - Don't remove if autoHide is false", [
  function(test, expect) {
    cleanMessages();
    FlashMessages.sendError('message', { autoHide: false });

    UI.insert(UI.render(Template.flashMessages), document.body);
    Meteor.setTimeout(expect(function(){
      test.equal(messagesCount(), 1);
    }), 500);
    Meteor.setTimeout(expect(function(){
      test.equal(messagesCount(), 1);
    }), 6000);
  }
]);

testAsyncMulti("flash-messages - Don't remove with global config", [
  function(test, expect) {
    cleanMessages();
    var options = _.clone(FlashMessages.options);
    FlashMessages.configure({ autoHide: false });
    FlashMessages.sendError('message');
    FlashMessages.options = options

    UI.insert(UI.render(Template.flashMessages), document.body);
    Meteor.setTimeout(expect(function(){
      test.equal(messagesCount(), 1);
    }), 500);
    Meteor.setTimeout(expect(function(){
      test.equal(messagesCount(), 1);
    }), 6000);
  }
]);

testAsyncMulti('flash-messages - Set auto hide delay to 1 second', [
  function(test, expect) {
    cleanMessages();
    FlashMessages.sendError('message', { hideDelay: 1000 });

    UI.insert(UI.render(Template.flashMessages), document.body);
    Meteor.setTimeout(expect(function(){
      test.equal(messagesCount(), 1);
    }), 500);
    Meteor.setTimeout(expect(function(){
      test.equal(messagesCount(), 0);
    }), 2000);
  }
]);

testAsyncMulti('flash-messages - Set auto hide delay to 1 second with global config', [
  function(test, expect) {
    cleanMessages();
    var options = _.clone(FlashMessages.options);
    FlashMessages.configure({ hideDelay: 1000 });
    FlashMessages.sendError('message');
    FlashMessages.options = options

    UI.insert(UI.render(Template.flashMessages), document.body);
    Meteor.setTimeout(expect(function(){
      test.equal(messagesCount(), 1);
    }), 500);
    Meteor.setTimeout(expect(function(){
      test.equal(messagesCount(), 0);
    }), 2000);
  }
]);

testAsyncMulti('flash-messages - Override global config', [
  function(test, expect) {
    cleanMessages();
    var options = _.clone(FlashMessages.options);
    FlashMessages.configure({ autoHide: false, hideDelay: 8000 });
    FlashMessages.sendError('message', { autoHide: true, hideDelay: 1000 });
    FlashMessages.options = options

    UI.insert(UI.render(Template.flashMessages), document.body);
    Meteor.setTimeout(expect(function(){
      test.equal(messagesCount(), 1);
    }), 500);
    Meteor.setTimeout(expect(function(){
      test.equal(messagesCount(), 0);
    }), 2000);
  }
]);