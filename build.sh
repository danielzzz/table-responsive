#!/bin/bash

rm -rf ./dist

./node_modules/.bin/esbuild index.js  --target=es2020 --outfile=dist/table-responsive.js
./node_modules/.bin/esbuild index.js  --minify --sourcemap --target=es2020 --outfile=dist/table-responsive.min.js

./node_modules/.bin/esbuild example/style.css  --target=es2020 --outfile=dist/styles.css
./node_modules/.bin/esbuild example/style.css  --minify --sourcemap --target=es2020 --outfile=dist/styles.min.css