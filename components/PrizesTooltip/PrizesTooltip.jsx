import React from 'react'

require('./PrizesTooltip.scss')
import TcTooltip from '../TcTooltip'

// Convert a number to string with thousands separated by comma
const numberWithCommas = (n) => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const PrizesTooltip = ({challenge}) => {
  const tooltipPrizesHtml = `
    <div class="tooltip-content prizes-content">
      <h5>Prizes</h5>
      <ul class="prizes-list">
        <li><span class="placement first">1</span>$10,000</li>
        <li><span class="placement second">2</span>$3,500</li>
        <li><span class="placement third">3</span>$1,000</li>
        <li><span class="placement">4</span>$1,000</li>   
        <li><span class="placement">5</span>$500</li>
        <li><span class="placement">6</span>$300</li>
        <li><span class="placement">7</span>$150</li>
        <li><span class="placement">8</span>$80</li>     
      </ul>
      <h5 class="bonuses">Bonuses</h5>
      <div class="bonuses">
        <div class="bonus">
          <span class="bonus-type tco">TCO Points</span>
          <span class="bonus-value">18,000</span>
        </div>
        <div class="bonus">
          <span class="bonus-type blitz">Reliability Bonus</span>
          <span class="bonus-value">$${challenge.reliabilityBonus}</span>
        </div>
        <div class="bonus">
          <span class="bonus-type checkin">Checkin</span>
          <span class="bonus-value">$50 × 5</span>
        </div>
        <div class="bonus">
          <span class="bonus-type blitz">Blitz</span>
          <span class="bonus-value">10% of prize</span>
        </div>
             
      </div>
    </div>
  `;

  return (
    <div className="prizes-container">
      <TcTooltip tooltipContent={tooltipPrizesHtml} cName="prizes-tooltip">
        <div className="prizes">
          <div><span className="dollar">$</span>{numberWithCommas(challenge.totalPrize)}</div>
          <div className="label">1 prize</div>
        </div>
      </TcTooltip>
    </div>
  )
}

export default PrizesTooltip
