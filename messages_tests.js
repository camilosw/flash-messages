Tinytest.add('flash-messages - Messages Collection works', function(test) {
  test.equal(Meteor.messages.find({}).count(), 0);
});

Tinytest.add('flash-messages - Add alert message', function(test) {
  Meteor.messages.remove({});
  var message = 'This is an alert message';
  Meteor.Messages.sendAlert(message);

  test.equal(Meteor.messages.find({}).count(), 1);

  test.equal(Meteor.messages.findOne({}).message, message, 
    'Alert messages should be ' + message);

  test.equal(Meteor.messages.findOne({}).style, '', 'Style should be empty');

  test.equal(Meteor.messages.findOne({}).seen, false, 'Seen should be false');
});

Tinytest.add('flash-messages - Add error message', function(test) {
  Meteor.messages.remove({});
  var message = 'This is an error message';
  Meteor.Messages.sendError(message);

  test.equal(Meteor.messages.find({}).count(), 1);

  test.equal(Meteor.messages.findOne({}).message, message, 
    'Error messages should be ' + message);

  test.equal(Meteor.messages.findOne({}).style, 'alert-error', 
    'Style should be alert-error');

  test.equal(Meteor.messages.findOne({}).seen, false, 'Seen should be false');
});

Tinytest.add('flash-messages - Add success message', function(test) {
  Meteor.messages.remove({});
  var message = 'This is a success message';
  Meteor.Messages.sendSuccess(message);

  test.equal(Meteor.messages.find({}).count(), 1);

  test.equal(Meteor.messages.findOne({}).message, message, 
    'Success messages should be ' + message);

  test.equal(Meteor.messages.findOne({}).style, 'alert-success', 'Style should be alert-success');

  test.equal(Meteor.messages.findOne({}).seen, false, 'Seen should be false');
});

Tinytest.add('flash-messages - Add info message', function(test) {
  Meteor.messages.remove({});
  var message = 'This is an info message';
  Meteor.Messages.sendInfo(message);

  test.equal(Meteor.messages.find({}).count(), 1);

  test.equal(Meteor.messages.findOne({}).message, message, 
    'Info messages should be ' + message);

  test.equal(Meteor.messages.findOne({}).style, 'alert-info', 'Style should be alert-info');

  test.equal(Meteor.messages.findOne({}).seen, false, 'Seen should be false');
});

Tinytest.add("flash-messages - Don't remove unseen messages", function(test) {
  Meteor.messages.remove({});
  Meteor.Messages.sendError('message');
  Meteor.Messages.clear();
  test.equal(Meteor.messages.find({}).count(), 1);
});

testAsyncMulti('flash-messages - Remove seen messages', [
  function(test, expect) {
    Meteor.messages.remove({});
    Meteor.Messages.sendError('message');

    OnscreenDiv(Spark.render(Template.meteorMessages));
    Meteor.setTimeout(expect(function(){
          test.equal(Meteor.messages.find({}).count(), 1);
          test.equal(Meteor.messages.find({seen: false}).count(), 0, 
            'Messages should be marqued as seen (seen: true)');
          Meteor.Messages.clear();
          test.equal(Meteor.messages.find({seen: true}).count(), 0, 
            'Messages seen should be cleared');
        }), 500);
  }
]);