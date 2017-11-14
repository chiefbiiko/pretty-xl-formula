#!/usr/bin/env node

const fs = require('fs')
const { Readable, Transform } = require('stream')
const pretty = require('./index')

const line = process.argv.slice(2).join(' ')
const input = process.argv.slice(2).filter(a => !/il=\d/i.test(a))[0] || ''
const il = /il=\d/i.test(line)
  ? parseInt(line.replace(/^.*il=(\d+).*$/i, '$1')) || 2 : 2

const pxlf = new Transform({
  transform (chunk, _, next) {
    this.push(pretty(chunk.toString(), { indentType: ' ', indentLength: il }))
    next()
  }
})

const makeReadable = stryng => {
  const r = new Readable()
  r.push(stryng)
  r.push(null)
  return r
}

const help = 'usage:\n    pxlf file\n  or\n' + '    pxlf < file\n  or\n' +
             '    echo sum(A2,A3) | pxlf\n  or\n' +
             '    cat file | pxlf > pretty.txt\n' +
             '  or\n    pxlf -il=4 sum(B5,B7)\n  or\n    ...\n\n' +
             '  file: text file containing an excel formula\n' +
             '  -il: indent length, defaults to -il=2\n\n' +
             '  when using this cli indent type always is " "\n'

if (/--?h(elp)?/i.test(line)) {
  makeReadable(help).pipe(process.stdout)
} else if (fs.existsSync(input)) {
  fs.createReadStream(input).pipe(pxlf).pipe(process.stdout)
} else if (input) {
  makeReadable(input).pipe(pxlf).pipe(process.stdout)
} else {
  process.stdin.pipe(pxlf).pipe(process.stdout)
  global.setTimeout(() => process.exit(0), 250)
}
