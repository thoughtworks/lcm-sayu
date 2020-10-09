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
	cd ui && ./node_modules/.bin/cypress open

cypress_headless:
	cd ui && ./node_modules/.bin/cypress run

docker-local:
	@docker build --rm -t lcm-sayu .
	@cd src/main/docker && docker-compose up
