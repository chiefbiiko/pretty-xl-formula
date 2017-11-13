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

### `prettify(formula[, opts])`

Just pass a formula to the prettifier. The options object is optional, it defaults to the values shown below.

```js
const prettify = require('pretty-xl-formula')
const defaults = { indentType: ' ', indentLength: 2 }

prettify('sum(A3,A4%A5)', defaults)
// -> 'sum(\n  A3,\n  A4 % A5\n)'
```

### CLI

`pretty-xl-formula` also exposes a cli as `pxlf`. It is just a transform stream that reads input from files or stdin and writes output to stdout.

You should install `pretty-xl-formula` globally to get the cli on your path instantly.

```
npm install -g pretty-xl-formula
```

Now you can do stuff like...

```
cat xlformula.txt | pxlf -il=4 > pretty.txt
```

Check out `pxlf -h`.

```
usage:
    pxlf file
  or
    pxlf < file
  or
    echo sum(A2,A3) | pxlf
  or
    cat file | pxlf > pretty.txt
  or
    pxlf -il=4 sum(B5,B7)
  or
    ...

  file: text file containing an excel formula
  -il: indent length, defaults to -il=2

  when using this cli indent type always is " "
```

***

## License

[MIT](./license.md)
