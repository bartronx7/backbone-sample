## front-end-take-home

There is a gulp development task setup for you, just install gulp globally using npm (`npm install -g gulp`) and run `gulp dev` from the root of the project.
This will compile the js and less files, start a static http server, and rebuild js and less files when they change.

## The Goal

There is a basic 'hello, world!' application setup with backbone, underscore templates, less, and browserify.
Please add the following functionality to this application using backbone:

- Create a list of users with the fields: `name`, `email`, `phone`.
- The list should be backed by a collection of models.
- There should be a form for adding a user to the list (all fields required).
- Each item in the list should have a 'delete' button, which removes the user from the list.
- Feel free to use bootstrap to style the list/form, but please don't use other third-party js without asking.
- Pay special attention to preventing memory leaks when removing users.
- Feel free to use the internet, but please don't plagiarize.
- Feel free to create whatever models, views, collections you think are appropriate.
- Feel free to delete AppView.js, it is there purely for demonstration purposes.
- You can add whatever less files you want to `dev/css`, and they will be compiled by gulp.
