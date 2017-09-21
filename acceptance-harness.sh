#!/bin/sh
set -ex

for testcase in ./tests/acceptance-cases/*.js; do
  casefile=$(basename $testcase)
  env FLAGPOLE_ACCEPTANCE_CASE="${casefile%%.js}" ember test
done
