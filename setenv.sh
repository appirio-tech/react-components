#!/bin/bash
if [ "$TRAVIS_BRANCH" = "dev" ]; then
  process.env.ENV=dev
elif [ "$TRAVIS_BRANCH" = "release" ]; then
  process.env.ENV=qa
  process.env.BUILD_ARGS=--build
elif [ "$TRAVIS_BRANCH" = "master" ]; then
  process.env.ENV=prod
  process.env.BUILD_ARGS=--build
fi