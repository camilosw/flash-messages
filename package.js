Package.describe({
  summary: "A package to display flash messages to the user."
});

Package.on_use(function(api, where) {
  api.use(['minimongo', 'mongo-livedata', 'templating'], 'client');

  api.add_files(['messages.js', 'messages_list.html', 'messages_list.js'], 'client');
});

Package.on_test(function(api) {
  api.use('flash-messages', 'client');
  api.use(['tinytest', 'test-helpers'], 'client');

  api.add_files('messages_tests.js', 'client');
});