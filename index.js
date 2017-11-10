const be = require('./be')
const is = {
  plainObject: be.plainObject,
  string: be.string,
  uInt: x => be.number(x) && x >= 0 && x % 1 === 0
}

module.exports = function pxlf(formula, opts) {
  // setup
  const singleops = [ '+', '*', '-', '/', '%', '^', '=', '<', '>', '&' ]
  if (!is.plainObject(opts)) opts = {}
  if (!is.string(opts.indentType)) opts.indentType = ' '
  if (!is.uInt(opts.indentLength)) opts.indentLength = 2
  // preprocessing
  const chars = formula
    .replace(/(\d)\s+([A-Z])/g,'$1#$2')
    .replace(/\s/g, '')
    .replace(/#/g, ' ')
    .split('')
  // reducing
  var factor = 0
  return chars.reduce((acc, cur) => {
    if (cur === '(') {
      factor += opts.indentLength
      acc += `${cur}\n${opts.indentType.repeat(factor)}`
    } else if (cur === ')') {
      factor -= opts.indentLength
      acc += `\n${opts.indentType.repeat(factor)}${cur}`
    } else if (cur === ',' || cur === ';') {
      acc += `${cur}\n${opts.indentType.repeat(factor)}`
    } else if (cur === '=' && /<|>\s*$/.test(acc) ||
               cur === '>' && /<\s*$/.test(acc)) {
      acc.replace(/\s*$/, '')
      acc += `${cur} `
    } else if (singleops.includes(cur)) {
      acc += ` ${cur} `
    } else {
      acc += cur
    }
    return acc
  }, '')
}
