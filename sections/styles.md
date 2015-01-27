Poe uses [Stylus](http://learnboost.github.io/stylus/) to preprocess its stylesheets.
Although Stylus is the most feature-rich CSS preprocessor (compared to LESS and SASS),
vanilla CSS is still syntactically correct, so you may choose to make use of Stylus's
features or not. Up to you. In this tutorial, we will.

We'll also use the **[aglet](https://github.com/shoelace-ui/aglet)** framework and
the **[nib](https://github.com/tj/nib)** helper library. To install, run the following
in your application root:

    npm i --save shoelace-ui-aglet nib

There we go. We can now `@require` these from our stylesheet.

<div class='NOTE'>
To learn more about `@require`, check out the [Stylus documentation](http://learnboost.github.io/stylus/docs/import.html).
</div>

So let's bring them in and while we're at it, add some styles. How about we frame our app
in gray against a white background?

Open `public/stylesheets/index.styl` and change

    // define core styles

    html
      font-family sans-serif

    body
    body > div
      height 100%
      width 100%

    body
      position absolute
      margin 0
      text-align center
      > div
        display flex
        flex-direction column
        justify-content center

    h1
      font-weight 100
      margin-top 0

    a
      padding 10px

to

    // variables

    input--apply-all = true

    // dependencies

    @require 'shoelace-ui-aglet'
    @require 'nib'

    // core styles

    html
      font-family sans-serif
      font-size 14px

    body
      height 100%
      width 100%
      background rgba(black, .1)
      position absolute
      margin 0

    body > div
      background rgba(white .9)
      box-shadow 0 2px 6px 0 rgba(black, 0.2), 0 5px 50px 0 rgba(black, 0.15)
      box-sizing border-box
      display flex
      flex-direction column
      max-width 500px
      padding padding--extra-large
      margin @padding auto
      width 100%

    h1
      font-weight 100
      margin-top 0
      text-align center

    a
      padding-right 10px

<div class='NOTE'>
<p>
If this is the first time you've seen the `rem` unit, you can **[read about it here](http://snook.ca/archives/html_and_css/font-size-with-rem)**.
</p>
<p>
With the `@` sigil, we're making use of Stylus's **[property lookup](http://learnboost.github.io/stylus/docs/variables.html#property-lookup)**
feature.
</p>
<p>
We're also using the Stylus builtin **[rgba](http://learnboost.github.io/stylus/docs/bifs.html#alphacolor-value)** to write colors.
</p>
</div>

Our Todo app should look like this now:

![New background](img/background.png)
