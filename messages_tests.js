// init
FlashMessages.configure({transitionWait: 0})
var allowDelay = 500;

// Helpers

var messagesCount = function () {
    return flashMessages.find({'options.id': {$exists: false}}).count();
}

var findOneMessage = function () {
    return flashMessages.findOne({});
}

var cleanMessages = function () {
    flashMessages.remove({});
}

// Tests

Tinytest.add('flash-messages - Messages Collection works', function (test) {
    test.equal(messagesCount(), 0);
});

Tinytest.add('flash-messages - Add alert message', function (test) {
    cleanMessages();
    var message = 'This is an alert message';
    FlashMessages.sendAlert(message);

    test.equal(messagesCount(), 1);

    test.equal(findOneMessage().message, message, 'Alert messages should be ' + message);

    test.equal(findOneMessage().style, FlashMessages.options.alertClasses, 'Style should match options');

    test.equal(findOneMessage().seen, false, 'Seen should be false');
});

Tinytest.add('flash-messages - Add error message', function (test) {
    cleanMessages();
    var message = 'This is an error message';
    FlashMessages.sendError(message);

    test.equal(messagesCount(), 1);

    test.equal(findOneMessage().message, message, 'Error messages should be ' + message);

    test.equal(findOneMessage().style, FlashMessages.options.errorClasses, 'Style should match options');

    test.equal(findOneMessage().seen, false, 'Seen should be false');
});

Tinytest.add('flash-messages - Add success message', function (test) {
    cleanMessages();
    var message = 'This is a success message';
    FlashMessages.sendSuccess(message);

    test.equal(messagesCount(), 1);

    test.equal(findOneMessage().message, message,
        'Success messages should be ' + message);

    test.equal(findOneMessage().style, FlashMessages.options.successClasses, 'Style should match options');

    test.equal(findOneMessage().seen, false, 'Seen should be false');
});

Tinytest.add('flash-messages - Add info message', function (test) {
    cleanMessages();
    var message = 'This is an info message';
    FlashMessages.sendInfo(message);

    test.equal(messagesCount(), 1);

    test.equal(findOneMessage().message, message,
        'Info messages should be ' + message);

    test.equal(findOneMessage().style, FlashMessages.options.infoClasses, 'Style should match options');

    test.equal(findOneMessage().seen, false, 'Seen should be false');
});

Tinytest.add("flash-messages - Don't remove unseen messages", function (test) {
    cleanMessages();
    FlashMessages.sendError('message');
    FlashMessages.clear();
    test.equal(messagesCount(), 1);
});

testAsyncMulti('flash-messages - Remove seen messages', [
    function (test, expect) {
        cleanMessages();
        FlashMessages.sendError('message');

        OnscreenDiv(Spark.render(Template.flashMessages));
        Meteor.setTimeout(expect(function () {
            test.equal(messagesCount(), 1);
            test.equal(flashMessages.find({seen: false}).count(), 0,
                'Messages should be marqued as seen (seen: true)');
            FlashMessages.clear();
            test.equal(flashMessages.find({seen: true}).count(), 0,
                'Messages seen should be cleared');
        }), allowDelay);
    }
]);

testAsyncMulti('flash-messages - Remove when click close button', [
    function (test, expect) {
        cleanMessages();
        FlashMessages.sendError('message');

        OnscreenDiv(Spark.render(Template.flashMessages));
        Meteor.setTimeout(expect(function () {
            test.equal(messagesCount(), 1);
            clickElement(document.getElementsByClassName('close')[0]);
            test.equal(messagesCount(), 0);
        }), allowDelay);
    }
]);

testAsyncMulti('flash-messages - Remove after default delay', [
    function (test, expect) {
        cleanMessages();
        FlashMessages.sendError('message');

        OnscreenDiv(Spark.render(Template.flashMessages));
        Meteor.setTimeout(expect(function () {
            test.equal(messagesCount(), 1);
        }), allowDelay); // wait allowDelay ms then test to see if message made it to local collection
        Meteor.setTimeout(expect(function () {
            test.equal(messagesCount(), 0);
        }), FlashMessages.options.hideDelay + allowDelay);
    }
]);

testAsyncMulti("flash-messages - Don't remove if autoHide is false", [
    function (test, expect) {
        cleanMessages();
        FlashMessages.sendError('message', { autoHide: false });

        OnscreenDiv(Spark.render(Template.flashMessages));
        Meteor.setTimeout(expect(function () {
            test.equal(messagesCount(), 1);
        }), allowDelay);
        Meteor.setTimeout(expect(function () {
            test.equal(messagesCount(), 1);
        }), FlashMessages.options.hideDelay + allowDelay);
    }
]);

testAsyncMulti("flash-messages - Don't remove with global config", [
    function (test, expect) {
        cleanMessages();
        var options = _.clone(FlashMessages.options);
        FlashMessages.configure({ autoHide: false });
        FlashMessages.sendError('message');
        FlashMessages.options = options

        OnscreenDiv(Spark.render(Template.flashMessages));
        Meteor.setTimeout(expect(function () {
            test.equal(messagesCount(), 1);
        }), allowDelay);
        Meteor.setTimeout(expect(function () {
            test.equal(messagesCount(), 1);
        }), FlashMessages.options.hideDelay + allowDelay);
    }
]);

testAsyncMulti('flash-messages - specify custom auto hide delay', [
    function (test, expect) {
        cleanMessages();
        var hideDelay = 1000;
        FlashMessages.sendError('message', { hideDelay: hideDelay });

        OnscreenDiv(Spark.render(Template.flashMessages));
        Meteor.setTimeout(expect(function () {
            test.equal(messagesCount(), 1);
        }), allowDelay);
        Meteor.setTimeout(expect(function () {
            test.equal(messagesCount(), 0);
        }), hideDelay + allowDelay );
    }
]);

testAsyncMulti('flash-messages - Set auto hide delay to 1 second with global config', [
    function (test, expect) {
        cleanMessages();
        var options = _.clone(FlashMessages.options);
        var hideDelay = 1000;
        FlashMessages.configure({ hideDelay: hideDelay });
        FlashMessages.sendError('message');
        FlashMessages.options = options

        OnscreenDiv(Spark.render(Template.flashMessages));
        Meteor.setTimeout(expect(function () {
            test.equal(messagesCount(), 1);
        }), allowDelay);
        Meteor.setTimeout(expect(function () {
            test.equal(messagesCount(), 0);
        }), hideDelay + allowDelay);
    }
]);

testAsyncMulti('flash-messages - Override global config', [
    function (test, expect) {
        cleanMessages();
        var options = _.clone(FlashMessages.options);
        FlashMessages.configure({ autoHide: false, hideDelay: 8000 });
        var hideDelay = 1000;
        FlashMessages.sendError('message', { autoHide: true, hideDelay: hideDelay });
        FlashMessages.options = options

        OnscreenDiv(Spark.render(Template.flashMessages));
        Meteor.setTimeout(expect(function () {
            test.equal(messagesCount(), 1);
        }), allowDelay);
        Meteor.setTimeout(expect(function () {
            test.equal(messagesCount(), 0);
        }), hideDelay + allowDelay);
    }
]);