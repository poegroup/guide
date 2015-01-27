In accordance with front-end law, any library that is capable of running a todo list *must*
demonstrate a todo list app; so that's what we'll do.

Start by opening your terminal and installing the [poe](https://github.com/poegroup/poe) command line tool.

    npm i -g poe

After install finishes, navigate to an empty directory somewhere. This will be our app's root.

    mkdir ~/Projects/mndvns/todo-ui
    cd ~/Projects/mndvns/todo-ui
    poe create ui

At this point you'll be prompted for a project name, description, etc.
Let's use the following values for out project:

    project: todo-ui
    description: todo user interface
    port: 5000
    api url: http://localhost:5001

It should then ask for a confirmation that resembles


    {
     "project": "todo-ui",
     "username": "mndvns",
     "email": "mail@mndvns.com",
     "fullname": "Michael Andrew Vanasse",
     "description": "todo user interface",
     "PORT": "5000",
     "API_URL": "http://localhost:5001"
    }

Agree to proceed, and let it do its thing. Once instantiated, you can start the app by running

    make start

<div class='WARNING'>
If you receive a warning message, go
<a href="https://github.com/componentjs/guide/blob/master/component/getting-started.md#setup-authentication">here</a>
and ensure your github credentials are exposed properly.
</div>

After a moment to install dependencies, our output should look something like this:

    14:38:42 web.1   | started with pid 44663
    14:38:42 web.1   |    info : auto-reload enabled
    14:38:42 web.1   | Server listening on port 5000

<div class='NOTE'>
This log style may look familiar to you; we are using **[foreman](https://github.com/ddollar/foreman)** to
run on your machine exactly as it does in production.
</div>

It says it's listening, so let's navigate in our browser to **<a href="http://localhost:5000" target="_blank">localhost:5000</a>**
and see.

![A newly initialied Poe UI app](img/new-app.png)

Great! We've got a running app.
