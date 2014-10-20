Package.describe({
  name: "kmligue:flash-messages",
  summary: "A package to display flash messages to the user.",
  version: "1.0.0",
  git: "https://github.com/kmligue/flash-messages.git"
});

Package.on_use(function(api, where) {
  api.use(['minimongo': '1.0.3', 'mongo-livedata': '1.0.5', 'templating': '1.0.7'], 'client');

  api.add_files(['messages.js', 'messages_list.html', 'messages_list.js'], 'client');

  if (typeof api.export !== 'undefined') {
    api.export(['FlashMessages', 'flashMessages'], 'client');
  }
});

Package.on_test(function(api) {
  api.use('flash-messages', 'client');
  api.use(['tinytest', 'test-helpers'], 'client');

  api.add_files('messages_tests.js', 'client');
});