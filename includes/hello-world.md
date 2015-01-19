Start by opening your terminal and install a command line utility for generating new Poe UI apps.

<code class='block'>
npm install --global poe-ui
</code>

After install finishes, navigate to an empty directory somewhere. This will be our app's root.

<code class='block'>
mkdir ~/Projects/foo-bar
cd ~/Projects/foo-bar
poe-ui-create
</code>

At this point you'll be prompted to give your app a name, and optional description and organization. Once
everything has been created, you can start the app by running

```sh
npm install
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
14:38:42 web.1   | [LR] auto-reload enabled
14:38:42 web.1   | Server listening on port 5000
```

<div class='NOTE'>
This log style may look familiar to you; we are using **[foreman](https://github.com/ddollar/foreman)** to
run on your machine exactly as it does in production.
</div>

This means the app is up an running. So now if we navigate in our browser to `localhost:5000`, we can see the
default initialized app ready for us.

![Alt text](/img/new-app.png)
