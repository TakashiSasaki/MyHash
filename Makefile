.PHONY: test

test:
	NODE_PATH=$(NODE_PATH):. node uint8test.js ;\
	NODE_PATH=$(NODE_PATH):. node test.js ;\
	NODE_PATH=$(NODE_PATH):. node honjitsu.js

