import React from 'react';
import ChallengeCardPlaceholder from '../ComponentPlaceholders/ChallengeCardPlaceholder/ChallengeCardPlaceholder';
import ChallengeCard from '../ChallengeCard/ChallengeCard';

export function getChallengeCardPlaceholder(id) {
  return (
    <ChallengeCardPlaceholder key={id} />
  );
}

export function getChallengeCard(id, challenge, config, onTechTagClicked) {
  return (
    <ChallengeCard
      challenge={challenge}
      onTechTagClicked={onTechTagClicked}
      config={config}
      key={id}
    />
  );
}

export function getExpandBucketButton(onClick) {
  return (
    <button onClick={onClick} className="view-more">
      View more challenges
    </button>
  );
}
