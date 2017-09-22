# ember-cli-flagpole

🎏 This addon provides a harness for expressing feature flags for an Ember application in an opinionated way. It is especially useful for configuring feature flags per-environment, along with default values for all environments.

<a id="example"></a>

```javascript
// config/flagpole.js
module.exports = function(flag) {
  flag('myCoolFeature')
    .default(true)
    .env('production', false);

  flag('anotherGreatFeature')
    .env('development', true)
    .env('staging', false)
    .env('production', false);
};
```
<a id="object-example"></a>
or, an alternate object syntax...
```javascript
// config/flagpole.js
module.exports = {
  myCoolFeature: {
    default: true,
    environments: {
      production: false
    }
  },

  anotherGreatFeature: {
    environments: {
      development: true,
      staging: false,
      production: false
    }
  }
};
```

```javascript
// then, at runtime...
import config from 'my-app/config/environment';

console.log(config.featureFlags); // ->
// in 'development': { myCoolFeature: true, anotherGreatFeature: true }
// in 'staging': { myCoolFeature: true, anotherGreatFeature: false }
// in 'production': { myCoolFeature: false, anotherGreatFeature: false }
```

Part of `ember-cli-flagpole`'s intent is to provide some build-time safety for configuring feature flags "in the large" by making certain expressions that are likely to be mistakes, like duplicate flag declarations or redeclaring a default value for a flag that already has one, build-time errors.

## Installation

* `ember install ember-cli-flagpole`

A default blueprint is included that generates the `config/flagpole.js` file for you.


## Why do I need this?
Chances are good that you _don't_, in case you don't have very many feature flags or you don't need to manage feature flags for mixes of different environments.

But, if you _do_ fit either of those descriptions, you may feel a need for a mechanism to configure per-environment feature flags that's more succinct than passing the config object through a bunch of conditional checks and writes. You may have already written some custom glue code to enable default settings. You may have concocted a custom object format for configuring flags more conveniently.

`ember-cli-flagpole` is designed to make those cases fit with the Ember philosophy of "convention over configuration". There's no escaping the actual configuration of flags, but you shouldn't have to configure _how_ those flags are transformed to be appropriate per build environment. `ember-cli-flagpole` helps to centralize where your flags are declared and offers a simple mechanism for declaring them.

## Usage
Flagpole looks for a file named `flagpole.js` (default path: `config/flagpole`). This file should export either a function that accepts the `flag` helper as its sole argument, or an object that adheres to a specific structure.

### The `flag` syntax
If `flagpole.js` exports a function, flagpole will call this function (passing the `flag` helper) to configure your set of feature flags. `flag` is helper function passed in by Flagpole at build time, allowing you to declare flags in a chained, declarative style. (See [example](#example) above).

#### `flag(name: string): <chain>`
You should call `flag` once per feature flag. It only accepts one argument, which must be a non-empty string to be used as the key for the feature flag's eventual value. It returns an object that exposes chainable methods for configuring the named flag's value across different environments.

#### `<chain>.default(setting: bool): <chain>`
`default` sets the default/base value for the feature flag represented by the chaining object. The default value takes effect for any environment which has not been more granularly configured using `.env()`.

#### `<chain>.env(environment: string, setting: bool): <chain>`
`env` configures a feature flag for a single environment, named by its first argument, taking the value of the second argument (which must **strictly** be a Boolean).

### The object syntax
If `flagpole.js` exports an object, flagpole will attempt to read the structure and contents of this object to configure your set of feature flags.

The basic shape is:
```javascript
{
  [featureFlagName: string]: {
    default?: boolean,
    environments?: {
      [environmentName]: boolean
    }
  }
}
```

See an [example usage](#object-example) above.

## Addon options
Some features of `ember-cli-flagpole` can be configured by passing options to `EmberApp` in your `ember-cli-build.js`.


```javascript
// ember-cli-build.js
module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Configure `ember-cli-flagpole` by declaring a property by its name in the `options` argument to `EmberApp`.
    'ember-cli-flagpole': {
      // configPath: string
      // Tell flagpole where it should look for flagpole.js if you don't want to use the default location. Omit the extension.
      // default: 'config/flagpole'
      configPath: 'path/to/my/flagpole',

      // propertyName: string
      // Tell flagpole which property it should add to your app's environment config to hold the flag values.
      // default: 'featureFlags'
      propertyName: 'featureFlags',

      // omitFalseFlags: bool
      // Tell flagpole to completely omit feature flag keys whose value is `false` for the current environment, instead of including them with the value `false`.
      // default: false
      omitFalseFlags: false,
    },
  });

  return app.toTree();
};
```

## Developing

### Running Tests
A unit test suite is included:
* `npm test` - runs tests using Mocha/Chai
* `npm test:watch` - runs tests using Mocha/Chai and reruns tests automatically when files change

### Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
