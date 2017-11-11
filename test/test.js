const should = require('chai').should()
const prettify = require('./../index')

describe('prettify', () => {
  it('should format an xl formula', () => {
    prettify('sum(A3,A4)').should.equal('sum(\n  A3,\n  A4\n)')
  })
  it('should just work', () => {
    prettify('WENN(WENNFEHLER(SUCHEN("SDI";R56)>0;WAHR);WAHR;FALSCH)')
      .should.equal('WENN(\n  WENNFEHLER(\n    SUCHEN(\n      "SDI";\n' +
                    '      R56\n    ) > 0;\n    WAHR\n  );\n  WAHR;\n' +
                    '  FALSCH\n)')
  })
  it('should allow using xl\'s intersection op without killing it', () => {
    prettify('  \tsum(Z7, B1:B5 A3:C3)\n ')
      .should.equal('sum(\n  Z7,\n  B1:B5 A3:C3\n)')
  })
  it('should allow setting indent type and length in opts', () => {
    const opts = { indentType: '\t', indentLength: 1 }
    prettify('  \tsum(Z7, B1:B5 A3:C3)\n ', opts)
      .should.equal('sum(\n\tZ7,\n\tB1:B5 A3:C3\n)')
  })
})
