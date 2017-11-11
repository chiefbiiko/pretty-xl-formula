# pretty-xl-formula

[![build status](http://img.shields.io/travis/chiefbiiko/pretty-xl-formula.svg?style=flat)](http://travis-ci.org/chiefbiiko/pretty-xl-formula) [![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/chiefbiiko/pretty-xl-formula?branch=master&svg=true)](https://ci.appveyor.com/project/chiefbiiko/pretty-xl-formula) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


***

Prettify xl excel formulas.

***

## Get it

```
npm install --save pretty-xl-formula
```

***

## Usage

Just pass a formula to the prettifier. The options object is optional, it defaults to the values shown below.

```js
const prettify = require('pretty-xl-formula')
prettify('sum(A3,A4%A5)', { indentType: ' ', indentLength: 2 }) // default opts
// -> 'sum(\n  A3,\n  A4 % A5\n)'
```

***

## License

[MIT](./license.md)
