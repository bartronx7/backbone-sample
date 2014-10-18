var Backbone = require('backbone');
var User = require('../models/userModel.js');

module.exports = Backbone.Collection.extend({
	model: User,
});