GITHUB=github
APPHOST=heroku
LOCAL=master

.PHONY: e2e

all: commit e2e deploy

commit:
	git push -v $(GITHUB) $(LOCAL)

e2e:
	ng e2e

deploy:
	git push -v $(APPHOST) $(LOCAL)

srv:
	ng serve

build:
	ng build