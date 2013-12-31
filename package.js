Package.describe({
  summary: "A package to display flash messages to the user."
});

Package.on_use(function(api, where) {
  api.use(['minimongo', 'mongo-livedata', 'templating', 'coffeescript'], 'client');

    api.add_files(['messages.coffee', 'messages_list.html', 'messages_list.coffee'], 'client');

  if (typeof api.export !== 'undefined') {
    api.export(['FlashMessages', 'flashMessages'], 'client');
  }
});

Package.on_test(function(api) {
  api.use('flash-messages-plus', 'client');
  api.use(['tinytest', 'test-helpers'], 'client');

  api.add_files('messages_tests.js', 'client');
});