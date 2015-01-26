Now that we have a lay of the land, maybe we should edit a file.
Since this will be a UI app most of our time in this project will
be spent in the `public` directory.

Let's change the header text from 'my-app' to... what? What does this
app even do? Well, in accordance with front-end law, any library that
is capable of running a todo list *must* demonstrate a todo list app;
so that's what we'll do.

Let's open the `public/partials/header.jade` file, and change

```sh
h1 my-app
```

to

```sh
h1 Todo
```

Once the file is saved, your browser should automatically update. This is true when
you edit any files in the app, with the exception of the `.env` file; editting the `.env`
*will* require restarting the server.

The browser should now look like this:

![New header](img/rename.png)
