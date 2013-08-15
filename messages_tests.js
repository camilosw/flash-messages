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

Tinytest.add('flash-messages - Add alert message', function(test) {
  cleanMessages();
  var message = 'This is an alert message';
  FlashMessages.sendAlert(message);

  test.equal(messagesCount(), 1);

  test.equal(findOneMessage().message, message, 
    'Alert messages should be ' + message);

  test.equal(findOneMessage().style, '', 'Style should be empty');

  test.equal(findOneMessage().seen, false, 'Seen should be false');
});

Tinytest.add('flash-messages - Add error message', function(test) {
  cleanMessages();
  var message = 'This is an error message';
  FlashMessages.sendError(message);

  test.equal(messagesCount(), 1);

  test.equal(findOneMessage().message, message, 
    'Error messages should be ' + message);

  test.equal(findOneMessage().style, 'alert-error', 
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

    OnscreenDiv(Spark.render(Template.flashMessages));
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
    FlashMessages.sendError('message');

    OnscreenDiv(Spark.render(Template.flashMessages));
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

    OnscreenDiv(Spark.render(Template.flashMessages));
    Meteor.setTimeout(expect(function(){
      test.equal(messagesCount(), 1);
    }), 500);
    Meteor.setTimeout(expect(function(){
      test.equal(messagesCount(), 0);
    }), 6000);
  }
]);