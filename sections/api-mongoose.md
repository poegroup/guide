In our app's root, run

    npm i --save mongoose

And make sure you have [mongodb](http://www.mongodb.org/downloads) installed, then
go to a fresh terminal and run

    mongod

<div class='NOTE'>
If you're on OS X, install mongo via
<pre><code>
brew install mongodb
</pre></code>
</div>

Now, at the top of `api.js` right under `var api = ...` around line 14, add

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/todo-api');

    var Schema = mongoose.Schema;
    var ObjectID = Schema.ObjectId;

    var UserS = new Schema({
      username: String,
      password: String,
      firstName: String,
      lastName: String
    });

    var User = mongoose.model('User', UserS);

    api.param('user', function(req, res, next, id) {
      req.userBase = req.base + '/' + id;
      User.findById(id, function(err, user) {
        if (err) return next(err);
        if (!user) return res.send(404);
        res.locals.user = user;
        next();
      });
    });

And back at our `POST /` endpoints, we can add the user handling like so:

    api.post('/', function(req, res, next) {
      var b = req.body;
      if (b._action === 'login') return next('route');
      if (!b.username || !b.password) return res.send(400);
      var user = new User(bodyToUser(b));
      user.save(function(err) {
        if (err) return next(err);
        res.redirect(req.base + '/' + user._id);
      });
    });

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

So let's try it out! If you got the [hyper.chrome extension](https://chrome.google.com/webstore/detail/hyperchrome/micpjacfpmndnocgeldgmhdgjeaiokhk),
you can actually fill and submit forms right in the browser. Let's try it.

Go to [localhost:5000/api](http://localhost:5000/api) and fill out the `signup` form for

    username: rambo
    password: 123
    first name: John
    last name: Rambo

![First user signup](img/api-signup.png)

Now let's use mongo's command-line tool to query the database and see if we succeeded. In a new terminal, run

    mongo

This is mongo's interactive shell. If we check our database for users...

    > use todo-api
    switched to db todo-api
    > db.users.find({}).toArray()
    [
            {
                    "_id" : ObjectId("54c703a9ea6c44c06a625044"),
                    "username" : "rambo",
                    "firstName" : "John",
                    "lastName" : "Rambo",
                    "password" : "123",
                    "__v" : 0
            }
    ]
    >

Booya! We have out first user, John Rambo.
