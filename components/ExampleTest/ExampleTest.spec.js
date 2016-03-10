import chai from 'chai'
import cheerio from 'cheerio'
import { createElement } from 'react'
import { renderToStaticMarkup as render } from 'react/lib/ReactDOMServer'

import ExampleTest from './ExampleTest.jsx'

chai.should()

describe('Manage Steps View', () => {
  describe('Savings label', () => {
    it('displays as savings when savings exist', () => {
      const props = {
        values: ['hello', 'world']
      }

      const html = render(createElement(ExampleTest, props))
      const $ = cheerio.load(html)
      const items = $('li')

      items.length.should.equal(2)
      items.html().should.equal('hello')
    })
  })
})
