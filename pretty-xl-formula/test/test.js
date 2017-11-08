const should = require('chai').should()
const pxlf = require('./../index')

describe('pxlf', () => {
  it('should format an excel formula', () => {
    pxlf('sum(A3,A4)').should.equal('sum(\n  A3,\n  A4\n)')
  })
  it('should just work', () => {
    pxlf('WENN(WENNFEHLER(SUCHEN("SDI";R56)>0;WAHR);WAHR;FALSCH)')
      .should.equal('WENN(\n  WENNFEHLER(\n    SUCHEN(\n      "SDI";\n' +
                    '      R56\n    ) > 0;\n    WAHR\n  );\n  WAHR;\n' +
                    '  FALSCH\n)')
  })
})
