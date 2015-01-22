
serve:
	./node_modules/.bin/serve --port 3000

index.html:
	curl http://localhost:3000/index.jade > index.html

# index.html:
# 	curl http://localhost:3000/index.jade | minify -html > index.html

.PHONY: index.html
