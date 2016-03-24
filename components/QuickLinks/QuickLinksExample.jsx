require('./QuickLinksExample.scss')

import React from'react'
import QuickLinks from './QuickLinks'

const QuickLinksExample = () => (
	<div className="example-wrap">
		<QuickLinks domain="topcoder-dev.com" />
	</div>
)

module.exports = QuickLinksExample
