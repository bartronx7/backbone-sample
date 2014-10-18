var Backbone = require('backbone');
var tpl = require('../../templates/user.tpl');

module.exports = Backbone.View.extend({
	template: tpl,
	render: function(){
		var data = this.model ? this.model.toJSON() : {};
		this.$el.html(this.template(data));
		return this;
	},

	events: {
		'click #deleteButton': 'deleteMe'
	},

	deleteMe: function(){
		this.model.destroy();
	}
});