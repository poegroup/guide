To use a partial in a Poe, use the [`ng-include`](https://code.angularjs.org/1.2.27/docs/api/ng/directive/ngInclude) directive.

**Example:**

```jade
// article.jade
article(hyper="article")
   // note the single quotes inside the double quotes
  div(hyper="article.headline" ng-include="'./headline.jade'")
```

```jade
// headline.jade
.headline-container
  h3.headline(hyper-bind="headline")
```
