dev: clean
	@npx yarn --cwd ui install
	@npx yarn --cwd ui watch &
	@wait ${!}
	@./gradlew quarkusDev

build: clean
	@npx yarn --cwd ui install
	@npx yarn --cwd ui deploy
	@cp -rf ui/static src/main/resources/META-INF/resources/static
	@./gradlew build -Dquarkus.package.type=native

clean:
	@rm -rf \
		build \
		ui/static \
		src/main/resources/META-INF/resources/static

cypress_ui:
	ui/node_modules/.bin/cypress open

cypress_headless:
	./ui/node_modules/.bin/cypress run

docker-local:
	@docker build --rm -t lcm-sayu .
	@cd src/main/docker && docker-compose up

validate-pipeline:
	circleci config validate
