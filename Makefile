.PHONY: build
build: firefox chrome

.PHONY: firefox
firefox:
	zip -r -FS ./firefox-release.zip * --exclude "*.git"

.PHONY: chrome
chrome:
	echo "NOT YET IMPLEMENTED"
