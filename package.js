Package.describe({
  name: "kmligue:flash-messages",
  summary: "A package to display flash messages to the user.",
  version: "0.2.1",
  git: "https://github.com/kmligue/flash-messages.git"
});

Package.on_use(function(api, where) {
  api.versionsFrom("METEOR@0.9.0");

  api.use(['minimongo', 'mongo-livedata', 'templating'], 'client');

  api.add_files(['messages.js', 'messages_list.html', 'messages_list.js'], 'client');

  if (typeof api.export !== 'undefined') {
    api.export(['Flash', 'flash'], 'client');
  }
});

// Package.on_test(function(api) {
//   api.use('flash-messages', 'client');
//   api.use(['tinytest', 'test-helpers'], 'client');

//   api.add_files('messages_tests.js', 'client');
// });