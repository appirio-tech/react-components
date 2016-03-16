import React from 'react'
import MenuBar from '../MenuBar/MenuBar'
import Panel from '../Panel/Panel'
import moment from 'moment'

require('./TCFooter.scss')

const TCFooter = ({domain}) => {
  const currentYear = moment().format('YYYY')
  const otherNavigationItems = [
    {img: '', text: 'SITE MAP', link: 'https://www.' + domain + '/sitemap'},
    {img: '', text: 'ABOUT', link: 'https://www.' + domain + '/about'},
    {img: '', text: 'CONTACT US', link: 'https://www.' + domain + '/contact-us'},
    {img: '', text: 'HELP CENTER', link: 'https://help.' + domain, target:'_blank'},
    {img: '', text: 'PRIVACY POLICY', link: 'https://www.' + domain + '/community/how-it-works/privacy-policy/'},
    {img: '', text: 'TERMS', link: 'https://www.' + domain + '/community/how-it-works/terms/'}
  ]

  return (
    <div className="TCFooter">
      <div className="other-nav-items non-mobile">
        <MenuBar items={otherNavigationItems} orientation="horizontal" mobileBreakPoint={767} />
      </div>
      <div className="other-nav-items mobile">
        <Panel expandTrigger="expand-trigger">
          <div className="panel-header">
            Links
          </div>
          <div className="panel-body">
            <MenuBar items={otherNavigationItems} orientation="vertical" mobileBreakPoint={0} />
          </div>
        </Panel>
      </div>
      <div className="social-links">
        <p>Topcoder is also on</p>
        <a href="https://www.facebook.com/topcoder" className="fb-link" target="fbwindow"/>
        <a href="http://www.twitter.com/topcoder" className="twitter-link" target="twwindow"/>
        <a href="https://www.linkedin.com/company/topcoder" className="linkedin-link" target="inwindow"/>
        <a href="https://plus.google.com/u/0/b/104268008777050019973/104268008777050019973/posts" className="google-link" target="gpwindow"/>
      </div>
      <p className="copyright-notice">© {currentYear} Topcoder. All Rights Reserved</p>
    </div>
  )
}

export default TCFooter
