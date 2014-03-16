# Brisk Client

Automation for client side assets.


## Dependencies

* [Brisk](http://github.com/makesites/brisk)
* [Grunt-render](http://github.com/makesites/grunt-render)

## Install

Using npm

```
npm install brisk-client
```


## Usage

In an node.js script, simply do:
```
client = require("brisk-client");

client.render( app, options );
```

Where:
* _app_ is an instance of Express.js
* _options_ is a custom config to control the various properties. Review the [default options](./config/client.js).


## Credits

Initiated by Makis Tracend ( [@tracend](http://github.com/tracend) )

Distributed through [Makesites.org](http://makesites.org/)

Released under the [MIT license](http://makesites.org/licenses/MIT)
