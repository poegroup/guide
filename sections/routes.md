So we know how to edit markup and change styles. Now what? So far our app
is basically a glorified static page.

Let's add a login page to see how routing works.

First, let's write `public/partials/login.jade` as

    form
      input(type='text' placeholder='username')
      input(type='password' placeholder='password')

And we'll change `public/javascripts/routes.js` from

    module.exports = {
      '/': 'index'
    };

to

    module.exports = {
      '/': 'index',
      '/login': 'login'
    };

The `/login` key is the path, and the value is the partial to which the
router should point. In this case, going to [localhost:5000/login](localhost:5000/login) should
show us the form at the `login.jade` partial. Let's see:

![Login page](img/login.png)

Perfect!

But to create an actual login, we'll need to set up an API.
