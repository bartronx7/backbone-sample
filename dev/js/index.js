var Backbone = require('backbone');
var $ = require('jquery');
var AppView = require('./views/AppView');

Backbone.$ = $;

$(window.document).ready(function() {
  var appView = new AppView({
    el: window.document.getElementById('main')
  });
  appView.render();
});
