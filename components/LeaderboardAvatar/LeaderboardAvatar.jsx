import React from 'react'
import moment from 'moment'
import TcTooltip from '../TcTooltip'
import Abbreviation from '../TrackIcon/Abbreviation'
import './LeaderboardAvatar.scss'

// Constants
const VISIBLE_CHARACTERS = 3
const MAX_VISIBLE_SKILLS = 4
const USERS_API = 'https://api.topcoder.com/v2/users/'

// Mock SKILLS array
let MOCK_SKILLS = [
  { skill: 'IA' },
  { skill: 'Game Design' },
  { skill: 'Inegration' },
  { skill: 'Unity3D' },
  { skill: 'Javascript' },
  { skill: 'HTML5' },
  { skill: 'Node' },
  { skill: 'Mongodb' },
  { skill: 'Angular' },
  { skill: 'React' }
]
const lastItem = {
  skill: `+${MOCK_SKILLS.length - MAX_VISIBLE_SKILLS} more`
}
MOCK_SKILLS = MOCK_SKILLS.slice(0, MAX_VISIBLE_SKILLS)
MOCK_SKILLS.push(lastItem)

const renderSkills = MOCK_SKILLS.map((winner, index) => {
  if(index === MOCK_SKILLS.length-1) {
    return `<li>${winner.skill}</li>`
  }
  return `<li>${winner.skill},</li>`
})

// RATING array
let ratingSummary = []

class LeaderboardAvatar extends React.Component {
  constructor() {
    super()
    this.tooltipAvatarHtml = ``;
  }

  render() {
    const { member, isLast, userPro, track } = this.props

    ratingSummary = userPro.ratingSummary
    // console.log(ratingSummary.name)
    //${Abbreviation[track][ratingSummary.name]
    let renderRating = []
    let tName = ''
    let img = ``
    if(ratingSummary) {
      renderRating = ratingSummary.map((trackRating, index) => {
        if(trackRating.name === 'UI Prototypes') {
          tName = Abbreviation[track]['UI_PROTOTYPE_COMPETITION']
        } else if(trackRating.name === 'Assembly') {
          tName = Abbreviation[track]['ASSEMBLY_COMPETITION']
        } else if(trackRating.name === 'Algorithm') {
          tName = Abbreviation['DATA_SCIENCE']['SRM']
        } else {
          tName = Abbreviation[track][trackRating.name.toUpperCase().split(' ').join('_')]
        }
        return `<li>${trackRating.rating} ${tName}</li>`
      })
    }

    if(userPro.handle) {
      img = member.photoURL ? `<img src=${member.photoURL}>` :
          `<span class="member-abv">${userPro.handle.slice(0, VISIBLE_CHARACTERS)}</span>`
    }


    this.tooltipAvatarHtml = `
      <div class="tooltip-content avatar-tooltip-content">
        <div class="member-profile">
          <span class="member-pic">${img}</span>
          <h5 class="member-handle">${userPro.handle}</h5>
          <div class="use-info">
            <span class="country">${userPro.country}</span><span class="separater"> / </span>
            <span class="wins"></span>${member.wins} wins<span class="separater"> / </span>
            <span class="joined">Joined ${moment(userPro.memberSince).format('MMM YYYY')}</span>
          </div>
        </div>
        <div class="skills">
          <p>Skills: </p>
          <ul>
            ${renderSkills.join('')}
          </ul>
        </div>
        <div class="tracks-rating">
          <ul>
            ${renderRating.join('')}
          </ul>
        </div>
      </div>
    `;

    if(isLast) {
      return (
        <span className={`leaderboard-avatar ${member.position ? 'dark-gray' : 'light-gray'}`}>
          {member.photoURL ? <img src={member.photoURL} className="member-icon"/> : member.handle.slice(0, VISIBLE_CHARACTERS)}
          <span className={member.position ? `placement placement-${member.position}` : 'hidden'}>
            {member.position}
          </span>
        </span>
      )
    }
    return (
      <span className={`leaderboard-avatar ${member.position ? 'dark-gray' : 'light-gray'}`}>
        <TcTooltip tooltipContent={this.tooltipAvatarHtml} cName="avatar-tooltip">
          {member.photoURL ? <img src={member.photoURL} className="member-icon"/> : member.handle.slice(0, VISIBLE_CHARACTERS)}
          <span className={member.position ? `placement placement-${member.position}` : 'hidden'}>
            {member.position}
          </span>
        </TcTooltip>
      </span>
    )
  }
}

export default LeaderboardAvatar
