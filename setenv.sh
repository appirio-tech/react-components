#!/bin/bash
if [ "$TRAVIS_BRANCH" = "dev" ]; then
  export NODE_ENV=development
elif [ "$TRAVIS_BRANCH" = "release" ]; then
  export NODE_ENV=production
elif [ "$TRAVIS_BRANCH" = "master" ]; then
  export NODE_ENV=production
fi