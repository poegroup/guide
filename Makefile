
start:
	./node_modules/.bin/startup start --port 3000

serve:
	./node_modules/.bin/serve --port 3001

index.html:
	curl http://localhost:3000/index.jade > /tmp/index.html && mv /tmp/index.html index.html

watch:
	watch -q -i 3 'make index.html' 1 &>/dev/null

.PHONY: index.html
