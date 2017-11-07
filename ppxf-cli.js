const fs = require('fs')
const ReadableStream = require('stream').Readable
const ppxfStream = require('./ppxf-stream')()

const help = 'usage:\n    ppxf file\n  or\n' +
             '    echo sum(A2,A3) | ppxf\n  or\n    cat file | ppxf\n\n' +
             '  file: text file containing an excel formula'

if (process.argv.slice(2).some(a => /--?h(elp)?/.test(a))) {
  console.log(help)
} else if (fs.existsSync(process.argv[2])) {
  fs.createReadStream(process.argv[2]).pipe(ppxfStream).pipe(process.stdout)
} else if (process.argv[2]) {
  const r = new ReadableStream()
  r.push(process.argv[2])
  r.push(null)
  r.pipe(ppxfStream).pipe(process.stdout)
} else {
  process.stdin.pipe(ppxfStream).pipe(process.stdout)
  global.setTimeout(() => {
    if (process.stdout.bytesWritten === 0) {
      console.error(help)
      process.exit(1)
    }
  }, 100)
}
