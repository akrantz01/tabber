.PHONY: build
build: icons
	zip -r -FS ./release.zip manifest.json *.js *.html icons/

icons:
	@mkdir -p icons
	inkscape -f icon.svg -w 16 -h 16 -e icons/16.png
	inkscape -f icon.svg -w 32 -h 32 -e icons/32.png
	inkscape -f icon.svg -w 48 -h 48 -e icons/48.png
	inkscape -f icon.svg -w 96 -h 96 -e icons/96.png
	inkscape -f icon.svg -w 128 -h 128 -e icons/128.png
