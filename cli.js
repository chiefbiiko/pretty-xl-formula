#!/usr/bin/env node

const fs = require('fs')
const { Readable, Transform } = require('stream')
const prettify = require('./index')

const pxlf = new Transform({
  transform (chunk, _, next) {
    this.push(prettify(chunk.toString(), {
      indentType: ' ',
      indentLength: il
    }))
    next()
  }
})

const line = process.argv.slice(2).join(' ')
const il = /i(ndent)?l(ength)?=\d/i.test(line)
  ? parseInt(line.replace(/^.+i(ndent)?l(ength)?=(\d+).*$/i, '$3')) || 2 : 2

const makeReadable = x => {
  const r = new Readable()
  r.push(x.toString())
  r.push(null)
  return r
}

const help = 'usage:\n    pxlf file\n  or\n' + '    pxlf < file\n  or\n' +
             '    echo sum(A2,A3) | pxlf\n  or\n' +
             '    cat file | pxlf > pretty.txt\n' +
             '  or\n    pxlf -il=4 sum(B5,B7)\n\n' +
             '  file: text file containing an excel formula\n' +
             '  -il: indent length, defaults to -il=2\n\n' +
             '  when using this cli indent type is always " ".\n'

if (process.argv.slice(2).some(a => /--?h(elp)?/.test(a))) {
  makeReadable(help).pipe(process.stdout)
} else if (fs.existsSync(process.argv[2])) {
  fs.createReadStream(process.argv[2]).pipe(pxlf).pipe(process.stdout)
} else if (process.argv[2] && !/i(ndent)?l(ength)?=/i.test(process.argv[2])) {
  makeReadable(process.argv[2]).pipe(pxlf).pipe(process.stdout)
} else {
  process.stdin.pipe(pxlf).pipe(process.stdout)
  global.setTimeout(() => process.exit(0), 250)
}
