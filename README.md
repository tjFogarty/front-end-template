# Template

## Setup
* Install [Gulp](http://gulpjs.com/) and [Bower](http://bower.io/).
* Modify `gulpfile.js` in the browser-sync section to reflect your local site.
* Run `npm install && bower install` in the terminal.
* Run `gulp watch` and this will handle your files as described in `gulpfile.js` such as Sass and JS compilation.

## Structure

Site includes [Foundation](http://foundation.zurb.com/) which is used for the grid and other CSS and JavaScript based functionality.

### CSS
Using [MVCSS](http://mvcss.github.io/) for the Sass structure, and [Browserify](http://browserify.org/) for the JavaScript.

### HTML
Basic HTML structure taken from [HTML 5 Boilerplate](https://github.com/h5bp/html5-boilerplate)

### JavaScript
Using custom build of Modernizr. Installing from Bower includes all the tests as opposed to the ones we might only use e.g. transitions, animations, svg support...

Browserify handles the JavaScript in order to keep things modular, and outputs to the assets/js/dist folder. See assets/js/app.js for an example.