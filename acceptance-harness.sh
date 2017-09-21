#!/bin/sh
set -ex

for testcase in {function-config,object-config,omit-false}; do
  env FLAGPOLE_ACCEPTANCE_CASE="$testcase" ember test
done
