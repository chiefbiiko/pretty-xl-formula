const TransformStream = require('stream').Transform
const ppxf = require('./ppxf')

module.exports = function() {
  const transformer = new TransformStream({
    transform(chunk, _, next) {
      this.push(ppxf(chunk.toString()))
      next()
    }
  })
  return transformer
}
