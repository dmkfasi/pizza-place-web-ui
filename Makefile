GITHUB=github
APPHOST=heroku
LOCAL=master

all: commit deploy

commit:
	git push -v $(GITHUB) $(LOCAL)

deploy:
	git push -v $(APPHOST) $(LOCAL)

