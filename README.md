Track Usage Plugin
==================

This is an experimental babel plugin that tracks the usage of a set of configured modules.

Usage
-----

```
npm install --save-dev babel-plugin-track-usage
```

The module will recognize requires of the configured modules in the transpiled babel modules and will collect
statically analyzable calls to the declared functions.
 

Plugin Configuration
--------------------

```
    ["track-usage", {
        trackedFunctions: {
            i18n:  {
                module: "./service/i18n",
                fn: "",
                varArgs: true
            }
        },
        debug: false
    }]
```

The plugin options object needs a key "trackedFunctions" that contains function definitions for every function to be tracked.

The name needs to be unique and does not matter (results will show up under this name in the resulting JSON).

The "module" prop is a module location relative to sourceRoot. 

The "fn" prop is either empty if the module is called as function itself or fn contains the name of the method to invoke on the module.

If the "varArgs" prop is set to true, the method can have additional parameters to the first statically analyzable one.

All methods calls are identified by their first parameter, which needs to be a javascript literal at this point.


Access Usage Data
-----------------

```
    var usageData = require("babel-plugin-track-usage/data").get()
```

can be used to access the collected data will contain one field per module 

```
    "./components/Grid": {
        "module": "components/Grid",
        "requires": {
            "React": "react",
            "cx": "classnames",
            "i18n": "./service/i18n"
        },
        "calls": {
            "i18n": {
                "No Rows": true,
            }
        }
    }

```

The "module" prop repeats the module name (without leading "./").


The "requires" prop contains a map of modules required by this module. The module name will be absolute for modules 
required out of node_modules and again relative to source root for relative requires. This is exactly the format of the 
keys of the main data map. This can be used to track transitive call dependencies.

The calls prop contains a mapping the configured logical names of our methods to a map of 
first argument values that are called in the module.
