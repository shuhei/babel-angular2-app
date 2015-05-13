NPM_BIN=node_modules/.bin
WEBPACK=${NPM_BIN}/webpack

all: build

build: copy js

watch:
	${WEBPACK} --watch

js:
	${WEBPACK}

copy:
	mkdir -p public
	cp src/index.html public/
	cp node_modules/angular2/node_modules/zone.js/zone.js public/

clean:
	rm -rf public

patch:
	sed -i '' "s/Rx.hasOwnProperty('default')/\!Rx.hasOwnProperty('Subject')/g" ./node_modules/angular2/es6/dev/src/facade/async.es6
