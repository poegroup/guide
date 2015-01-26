Start by opening your terminal and installing the [poe](https://github.com/poegroup/poe) command line tool.

<code class='block'>
npm i -g poe
</code>

After install finishes, navigate to an empty directory somewhere. This will be our app's root.

<code class='block'>
mkdir ~/Projects/my-app
cd ~/Projects/my-app
poe create ui
</code>

At this point you'll be prompted for a project name, description, and any other required fields.
Set the `port` field to 5000, and the `api url` to `http://localhost:5001`.
Once instantiated, you can start the app by running

```sh
make start
```

<div class='WARNING'>
If you receive a warning message, go
<a href="https://github.com/componentjs/guide/blob/master/component/getting-started.md#setup-authentication">here</a>
and ensure your github credentials are exposed properly.
</div>

After a moment to install dependencies, our output should look something like this:

```sh
14:38:42 web.1   | started with pid 44663
14:38:42 web.1   |    info : auto-reload enabled
14:38:42 web.1   | Server listening on port 5000
```

<div class='NOTE'>
This log style may look familiar to you; we are using **[foreman](https://github.com/ddollar/foreman)** to
run on your machine exactly as it does in production.
</div>

It says it's listening, so let's navigate in our browser to `localhost:5000`.

![A newly initialied Poe UI app](img/new-app.png)

Great! We've got a running app.
