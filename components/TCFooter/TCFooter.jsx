import { PropTypes, Component } from 'react'
import MenuBar from '../MenuBar/MenuBar'
import moment from 'moment'

require('./TCFooter.scss')
const React    = require('react')

class TCFooter extends Component {
  constructor(props) {
    super(props)
    this.state = {mobile: false}
    this.handleResize = this.handleResize.bind(this)
  }

  componentWillMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    const breakPoint = this.props.mobileBreakPoint
    if (window.innerWidth > breakPoint) {
      this.setState({mobile: false})
    } else {
      this.setState({mobile: true})
    }
  }

  render() {
    const domain = this.props.domain
    const currentYear = moment().format('YYYY')
    const otherNavigationItems = [
      {img: '', text: 'SITE MAP', link: 'https://www.' + domain + '/sitemap'},
      {img: '', text: 'ABOUT', link: 'https://www.' + domain + '/about'},
      {img: '', text: 'CONTACT US', link: 'https://www.' + domain + '/contact-us'},
      {img: '', text: 'HELP CENTER', link: 'https://help.' + domain},// FIX ME configurable _target
      {img: '', text: 'PRIVACY POLICY', link: 'https://www.' + domain + '/community/how-it-works/privacy-policy/'},
      {img: '', text: 'TERMS', link: 'https://www.' + domain + '/community/how-it-works/terms/'}
    ]

    return (
      <div className="TCFooter">
        <MenuBar items={otherNavigationItems} orientation="horizontal" />
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
}

TCFooter.propTypes = {
  domain            : PropTypes.string.isRequired,
  mobileBreakPoint  : PropTypes.number
}

TCFooter.defaultProps = { mobileBreakPoint: 768 }

export default TCFooter
