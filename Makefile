GITHUB=github
APPHOST=heroku
LOCAL=master

.PHONY: test

all: commit e2e deploy

commit:
	git push -v $(GITHUB) $(LOCAL)

test:
	ng e2e

deploy:
	git push -v $(APPHOST) $(LOCAL)

srv:
	ng serve

build:
	ng build
