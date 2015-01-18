[Component](http://component.github.io/) is a static asset tool. It's a dependency manager, distributor
as well as a general-purpose task runner. You can think of it as [npm](https://www.npmjs.com) for all
things static: javascript, styles, images, fonts, etc.

To install, update, or remove components from your project, you can either

  - edit your project's `component.json` file by hand (probably simpler)
  - or use the component [CLI](https://github.com/componentjs/guide/blob/master/component/getting-started.md)

You don&apos;t have to worry about actually building the components however; when Poe UI run, it watches for changes
to your `component.json` and will install/remove/rebuild as necessary.

As far as structure goes, the `component.json` works almost identically to npm&apos;s `package.json`.

<div class='.NOTE'>
Component pushed the community in a much more modular direction in 2012 - 2014, but has fallen out of popularity as
npm is becoming the standard for front- and back-end JS management. In the upcoming stable version of Poe UI this file
is replaced entirely by npm.
</div>

