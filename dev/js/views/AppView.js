var Backbone = require('backbone');
var tpl = require('../../templates/app.tpl');
var UserCollection = require('../collections/userCollection.js');
var CreateUserView = require('./createUser.js');
var UserView = require('./user.js');

var userList = new UserCollection();
userList.add([
	{name:'Linda Jordan',email:'linda@email.com',phone:'512-123-4567'},
	{name:'Foo bar',email:'foobar@email.com',phone:'512-123-4569'}
]);

module.exports = Backbone.View.extend({
  template: tpl,
  initialize: function(){
    this.createUserView = new CreateUserView();

    this.listenTo(userList, 'add', this.render);
    this.listenTo(userList, 'destroy', this.render);
  },
  render: function() {
    var data = this.model ? this.model.toJSON() : {};

    this.$el.html(this.template(data));

    var userlist = this.$('#userlist');
    userlist.html('');
    userList.each(function(userModel){
      // create view object just for rendering and then throw it away
      var userView = new UserView({model:userModel});
      userlist.append(userView.render().el);
    });

    this.$('#createUserForm').html(this.createUserView.render().el);
    this.$('#createUserForm').hide();

    return this;
  },

  events: {
  	'click #showFormButton': 'showForm',
  	'click #createUserButton': 'createUser'
  },

  showForm: function(e){
  	this.$('#createUserForm').show();
  	this.$('#showFormButton').hide();
  },
  hideForm: function(){
    this.$('#createUserForm').hide();
    this.$('#showFormButton').show();
 },
 createUser: function(e){
   var name = this.createUserView.nameInput.val();
   var email = this.createUserView.emailInput.val();
   var phone = this.createUserView.phoneInput.val();

   userList.create({name:name,email:email,phone:phone});

   this.hideForm();
 },
});
