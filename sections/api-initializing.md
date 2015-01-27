Let's navigate to a new directory like we did earlier.

    mkdir -p ~/Projects/mndvns/todo-api
    cd ~/Projects/mndvns/todo-api
    poe create api

Once again, we're asked to fill some project fields. Let's use the following values:

    project: todo-api
    description: todo api
    port: 5001

And the confirmation should resemble 

    {
      "project": "todo-api",
      "username": "mndvns",
      "email": "mail@mndvns.com",
      "fullname": "Michael Andrew Vanasse",
      "description": "todo api",
      "PORT": "5001"
    }

Just like before, let's run

    make start

Once it's running, we'll check out [localhost:5001](http://localhost:5001) and see

![Our new API](img/new-api.png)

<div class='NOTE'>
If you're using Chrome, I highly encourage getting the [hyper.chrome](https://chrome.google.com/webstore/detail/hyperchrome/micpjacfpmndnocgeldgmhdgjeaiokhk)
extension. It makes navigating hypermedia APIs easy and fun.
</div>

Nice! So if everything's working right, we should be able to see this API mounted on our UI
under `/api`. Let's check...

![API mounted properly](img/api-mounted.png)

Bam. Done and done.
