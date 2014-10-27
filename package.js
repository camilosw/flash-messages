Package.describe({
  name: 'camilosw:flash-messages',
  summary: 'A package to display flash messages to the user',
  git: 'https://github.com/camilosw/flash-messages.git'
});

Package.onUse(function(api, where) {
  api.use(['minimongo', 'mongo-livedata', 'templating'], 'client');

  api.addFiles(['messages.js', 'messages_list.html', 'messages_list.js'], 'client');

  if (typeof api.export !== 'undefined') {
    api.export(['FlashMessages', 'flashMessages'], 'client');
  }
});

Package.on_test(function(api) {
  api.use('flash-messages', 'client');
  api.use(['tinytest', 'test-helpers'], 'client');

  api.addFiles('messages_tests.js', 'client');
});
