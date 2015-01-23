Make is Poe's dependency tracker for builds during development
and in productions. Although it doesn't actually watch files when
they change, it determines which files rely on which, and how to
build as effectively as possible.


Since Poe app's have a consistent structure, the poe-ui module
keeps it's own `mk` file which is the called by your Poe app's
Makefile when you first start. So although Make has some
complex tasks under the covers, you only need one line on your
Makefile.

This file may be going away in a future release of Poe as we
keep simplifying.

If you're interested in Make at all (and who isn't?), here is the
[files that does the heavy lifting in of Poe's builds](https://github.com/poegroup/poe-ui-kit/blob/master/build.mk).
