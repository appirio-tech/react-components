import MenuBar from './MenuBar'

require('./MenuBarExamples.scss')

const primaryNavigationItems = [
  {img: '../components/MenuBar/nav-community.svg', text: 'Community', link: '/community'},
  {img: '../components/MenuBar/nav-compete.svg', text: 'Compete', link: '/compete', selected: true},
  {img: '../components/MenuBar/nav-learn.svg', text: 'Learn', link: '/MenuBarExamples'}
]

const MenuBarExample = () => (
  
  <MenuBar items={primaryNavigationItems} mobileBreakPoint={767} orientation="horizontal" />
)

module.exports = MenuBarExample
