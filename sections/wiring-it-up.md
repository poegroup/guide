Now let's return to our UI app, which is still running on `localhost:5000`.

Let's make that loging page we made earlier into the new home page. Instead of rerouting users,
we'll just default to having them login or signup. That's a pretty good practice, right?

Remember where we added our `/login` route? We're just going to change it right there.

In case you forgot, we're going to navigate to the `public/javascript/routes.js` file. We'll change
it from

    module.exports = {
      '/': 'index',
      '/login': 'login'
    };

to

    module.exports = {
      '/': 'login'
    };

Again, the key `/` signifies the route, and the value `login` signifies the partial that will
be loaded on the page.

So now if we navigate to our root at `localhost:5000`...

![UI no change](img/ui-no-change.png)

That's odd, it doesn't seem to have changed... even though we've saved the files, the server isn't
picking it up.

<div class='INFO'>
<p>
When you're having trouble seeing changes happen on the front-end, there are a few things you can
check for right off the bat. 9/10 times, it's one of these.
</p>
</div>

#### **1.** Build Error

<div class='INFO no-header'>
<p>
If you're not seeing a change in the page, the first thing you should do is check your server. Is
is displaying normal output? It's normal to leave a character misplaced in your files, and often times
this will cause the builders to fail before they have a chance to send it to the browser. So remember:
always check your server first.
</p>
</div>

#### **2.** Cached Resources

<div class='INFO no-header'>
<p>
Since we'll be working very closely with APIs, it's important to remember that your browser has some
development gotchas that you'll stumble upon now and then. Usually, it's related to caching in one
form or another.
</p>
<p>
Remember to disable your cache (unless specifically testing it). In Chrome, you can do this easily by
opening the Developer Tools and clicking `Disable Cache` in the `Network` tab.
</p>

![Disable your cache](img/disable-cache.png)
</div>

#### **3.** Server Resart Required

<div class='INFO no-header'>
<p>
Some files, like the `.env` file, don't initiate a restart in your app. Poe UI's file watcher also
doesn't follow symlinks, so if you're linked to an npm or component project, you won't have that
project's files watched, and you'll have to trigger the builds yourself in some other way.
</p>
<p>
And when in doubt, just restart the server and `make start` again.
</p>
</div>

![Todo changed](img/todo-changed.png)

There we are. Now, instead of hard coding the values, let's use the forms that the API's providing.

If you're not familiar with `hyper+json`, you should give the [spec](https://github.com/hypergroup/hyper-json) a
quick once over. We'll be referencing it often, on the front- and back-end of our applications.

To render hyper+json forms, we'll use the [ng-hyper](https://github.com/hypergroup/ng-hyper) angular/hypermedia
client.

Again, if you're not familiar with `ng-hyper` at all, [here are the docs](https://github.com/hypergroup/ng-hyper)
so you can refer to terms or concepts as we go.

Here's our `ng-hyper`-ized login form in `login.jade`:

    form(data-hyper-form=".login")
      div(data-ng-repeat="input in inputs")
        input(data-hyper-input="input")
      input.button-primary(type="submit" value="Login")

It doesn't look much different than our old form. But now we've relieved the front-end of deciding how
to connect to the server; the `ng-hyper` client has mounted the `action` and `method` for us, so this
form is ready to go.

![A 404 response for login](img/login-404.png)

Hmm, it doesn't seem to work... or does it? Well, we told it not to. User `foo` doesn't exist, which means a `404`
is exactly the right response. We handle this at about line 100 of our api.js. Here's a refresher if you're lazy...

    api.post('/', function(req, res, next) {
      var b = req.body;
      var username = b.username;
      if (!username) return res.send(400);
      User.find({username: username}, function(err, users) {
        if (err) return next(err);
        if (!users || !users[0]) return res.send(404);
        var user = users[0];
        if (user.password !== b.password) return res.send(401);
        res.redirect(req.base + '/' + user._id);
      });
    });

Ah, that's right; our user's name is `rambo`. Let's try that.

![Rambo gets a 404](img/rambo-404.png)

Another 404, but this one is different: it tried to redirect us to another page, just like we told it to in our
`api.js`:

    res.redirect(req.base + '/' + user._id);

So now let's head back to the front end to make out user's page.
