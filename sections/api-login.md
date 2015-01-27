Let's have the api to serve a login form and a signup form on `/`. Change `api.js` from

    api.get('/', function(req, res, next) {
      res.json({
        app: {
          name: 'todo-api',
          description: 'todo api',
          author: {href: req.base + '/author'}
        }
      });
    });

to

    api.get('/', function(req, res) {
      res.json({
        signup: {
          method: 'POST',
          action: req.base,
          input: {
            _action: {
              type: 'hidden',
              value: 'signup'
            },
            username: {
              type: 'text',
              required: true
            },
            password: {
              type: 'password',
              required: true
            },
            'first-name': {
              type: 'text',
              placeholder: 'first name'
            },
            'last-name': {
              type: 'text',
              placeholder: 'last name'
            }
          }
        },
        login: {
          method: 'POST',
          action: req.base,
          input: {
            _action: {
              type: 'hidden',
              value: 'login'
            },
            username: {
              type: 'text',
              required: true
            },
            password: {
              type: 'password',
              required: true
            }
          }
        }
      });
    });

Take a look: we're giving back two forms: `login` and `signup`, each of which
submit a `POST` to our root, `/`. But if we submit the forms now, we wouldn't get any
response; we need to add endpoints in our API for `POST /`.

Let's add the following lines to our `api.js`:


    api.post('/', function(req, res, next) {
      var b = req.body;
      if (b._action === 'login') return next('route');
      if (!b.username || !b.password) return res.send(400);

      // TODO
      // save user then
      // redirect to user page

    });

    api.post('/', function(req, res, next) {
      var b = req.body;
      var username = b.username;
      if (!username) return res.send(400);

      // TODO
      // find user then
      // verify credentials
      // redirect to user page

    });

Obviously, this still won't work. We need some way of storing our users. Let's use [mongoose.js](http://mongoosejs.com/).
