run:
	node dist/src/app.js

up-pq:
	docker run --name=node-first-app -e POSTGRES_PASSWORD="qwerty" -p 5436:5432 -d --rm postgres

init:
	npm install typescript --save-dev