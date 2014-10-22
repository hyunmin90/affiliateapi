REPORTER = spec
APPNAME = developers

COMMON_OPTION = --reporter spec --ui bdd --require should --compilers coffee:coffee-script/register
MOCHA = @node_modules/.bin/mocha

all: clean-install test

install:
	@npm install --no-bin-links

clean:
	@rm -rf ./node_modules
	@rm -rf ./routes
	@rm -rf ./lib
	@rm -f ${APPNAME}.zip

clean-install: clean install

compile:
	@coffee --compile --output ./ src/

test: compile
	${MOCHA} ${COMMON_OPTION} -t 60000 test/*.coffee

package: clean compile
	zip -r ${APPNAME}.zip ./ -x node_modules\* .git\* .gitignore .DS_Store test\*

.PHONY: all install clean clean-install compile test package
