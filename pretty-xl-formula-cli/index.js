const fs = require('fs')
const { Readable, Transform } = require('stream')
const pxlf = require('./../pretty-xl-formula')

const makeReadable = x => {
  const r = new Readable()
  r.push(x.toString())
  r.push(null)
  return r
}

const prettifier = new Transform({
  transform(chunk, _, next) {
    this.push(pxlf(chunk.toString()))
    next()
  }
})

const help = 'usage:\n    pxlf file\n  or\n' +
             '    echo sum(A2,A3) | pxlf\n  or\n    cat file | pxlf\n' +
             '  or\n    pxlf sum(B5,B7)\n\n' +
             '  file: text file containing an excel formula'

if (process.argv.slice(2).some(a => /--?h(elp)?/.test(a))) {
  console.log(help)
} else if (fs.existsSync(process.argv[2])) {
  fs.createReadStream(process.argv[2]).pipe(prettifier).pipe(process.stdout)
} else if (process.argv[2]) {
  makeReadable(process.argv[2]).pipe(prettifier).pipe(process.stdout)
} else {
  process.stdin.pipe(prettifier).pipe(process.stdout)
  global.setTimeout(() => {
    if (process.stdout.bytesWritten === 0) {
      console.log(help)
      process.exit(0)
    }
  }, 100)
}
