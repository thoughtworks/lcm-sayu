build-image:
	docker build -t lcm-sayu:latest .
build:
	docker-compose build
run:
	docker-compose up
dev:
	make -j 2 db-up server-dev
stop:
	docker stop $(docker ps -a -q --filter ancestor=lcm-sayu --format="{{.ID}}")
db-up:
	docker-compose up postgres
server-dev:
	yarn dev
