const be = require('be-of-type')
const is = {
  pojo: be.plainObject,
  truthyString: x => be.string(x) && x.length,
  uInt: x => be.number(x) && x >= 0 && x % 1 === 0
}

module.exports = function prettify (formula, opts) {
  const singleops = [ '+', '*', '-', '/', '%', '^', '=', '<', '>', '&' ]
  if (!is.pojo(opts)) opts = {}
  if (!is.truthyString(opts.indentType)) opts.indentType = ' '
  if (!is.uInt(opts.indentLength)) opts.indentLength = 2
  // split
  const chars = formula
    .replace(/(\d)\s+([A-Z])/g, '$1#$2').replace(/\s/g, '').replace(/#/g, ' ')
    .split('')
  // apply, combine
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
    } else if ((cur === '>' && /<\s*$/.test(acc)) ||
               (cur === '=' && /<|>\s*$/.test(acc))) {
      acc = acc.replace(/\s*$/, '').concat(`${cur} `)
    } else if (singleops.includes(cur)) {
      acc += ` ${cur} `
    } else {
      acc += cur
    }
    return acc
  }, '')
}
