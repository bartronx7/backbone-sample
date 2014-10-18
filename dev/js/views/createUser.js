var Backbone = require('backbone');
var tpl = require('../../templates/createUser.tpl');

module.exports = Backbone.View.extend({
	template: tpl,
	initialize: function(){
	},
	render: function(){
		this.$el.html(this.template());
    this.nameInput = this.$('#nameInput');
    this.emailInput = this.$('#emailInput');
    this.phoneInput = this.$('#phoneInput');
		return this;
	}
});