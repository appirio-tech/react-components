import React from 'react';
import TrackAbbreviationTooltip from '../ChallengeCard/Tooltips/TrackAbbreviationTooltip';
import TrackIcon from '../TrackIcon/TrackIcon';
import Tooltip from '../ChallengeCard/Tooltips/Tooltip';
import Division from './Division/Division';
import RegistrantsIcon from '../Icons/RegistrantsIcon';
import SubmissionsIcon from '../Icons/SubmissionsIcon';

// constants
const NUM_REGISTRANTS = 28;
const NUM_SUBMISSION = 1365;

function numRegistrantsTipText(number) {
  switch (number) {
    case 0: return 'No percent';
    case 1: return '1 percent';
    default: return `${number} percent`;
  }
}

function numSubmissionsTipText(number) {
  switch (number) {
    case 0: return 'No submissions';
    case 1: return '1 total submission';
    default: return `${number} total submissions`;
  }
}

/*
* Past SRMCard
*/
const PastSRMCard = () => (
	<div className="SRMCard past">
		<div className="upper-row">
			<div className="left-panel past">
				<div className="SRM-track">
					<TrackAbbreviationTooltip track={'DATA_SCIENCE'} subTrack={'SRM'}>
						<TrackIcon track={'DATA_SCIENCE'} subTrack={'SRM'} />
					</TrackAbbreviationTooltip>
				</div>
				<div className="SRM-details">
					<p className="past-title">Competitive Programming - Single Round Match 679</p>
				</div>
			</div>
			<div className="right-panel past">
				<div className="past-info">
					<div className="SRM-date">Aug 31, 2015</div>
					<span className="challenge-stats">
						<span>
							<Tooltip content={numRegistrantsTipText(NUM_REGISTRANTS)}>
								<a className="num-reg" href="javascript:;">
									<RegistrantsIcon/> <span className="number">{NUM_REGISTRANTS}</span>
								</a>
							</Tooltip>
						</span>
						<span>
							<Tooltip content={numSubmissionsTipText(NUM_SUBMISSION)}>
								<a className="num-sub" href="javascript:;">
									<SubmissionsIcon/> <span className="number">{NUM_SUBMISSION}</span>
								</a>
							</Tooltip>
						</span>
					</span>
				</div>
			</div>
		</div>
    <div className="border-line"></div>

		<div className="division-row">
			<div className="division-col left">
				<Division division={'Division 1'}></Division>
			</div>
			<div className="division-col right">
				<Division division={'Division 2'}></Division>
			</div>
		</div>
	</div>
)

module.exports = PastSRMCard;
