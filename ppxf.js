module.exports = function(formula) {
  const chars = formula.replace(/\s/g, '').split('')
  var factor = 0
  return chars.reduce((acc, cur) => {
    if (cur === '(') {
      factor += 2
      acc += `${cur}\n${' '.repeat(factor)}`
    } else if (cur === ')') {
      factor -= 2
      acc += `\n${' '.repeat(factor)}${cur}`
    } else if (cur === ',' || cur === ';') {
      acc += `${cur}\n${' '.repeat(factor)}`
    } else if (cur === '<' || cur === '>') {
      acc += ` ${cur} ` 
    } else {
      acc += cur
    }
    return acc
  }, '')
}
