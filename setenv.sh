#!/bin/bash
if [ "$TRAVIS_BRANCH" = "dev" ]; then
  export ENV=dev
elif [ "$TRAVIS_BRANCH" = "release" ]; then
  export ENV=qa
  export BUILD_ARGS=--build
elif [ "$TRAVIS_BRANCH" = "master" ]; then
  export ENV=prod
  export BUILD_ARGS=--build
fi