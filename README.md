# lcm-sayu project

This project uses Quarkus, the Supersonic Subatomic Java Framework. Also uses GraalVM and in combination with Quarkus
we can get a native executable = Fast and low memory footprint!

If you want to learn more about Quarkus, please visit its website: https://quarkus.io/ .

##Developing

### Running the application in dev mode

You can run your application in dev mode that enables live coding using:
```
make dev
```

### Creating a native executable

With Quarkus and GraalVM we can create a native binary executable of our application.
Take note that this executable is generated inside a docker image then uses the
architecture of that image, if you use that same binary in another image odds are that
won't run there.

Use this make task to generate a binary executable:

```
make build
```

### Running the application in docker mode

You can run your application in local mode and resembling as best as possible the production environment in AWS using docker-compose as following:

```
make docker-local
```

This fireup two containers: one with a native executable (as in ```make build```) inside and another with postgresql 13 ready for connections.

Take a look to src/main/docker/docker-compose.yml file for configurations details.

##Testing

### Running Cypress headless

```
make cypress_headless
```
### Running Cypress with UI

```
make cypress_ui
```

##Deploying

### CI/CD

We use CircleCi as our CI/CD tool of choice. In ```.circleci/config.yml``` you can find the defined pipeline (pipeline as code ftw!).
Take note that as the process to generate a native executable is resource consuming is necessary to use a linux vm in CircleCi
and that can be very different from the docker image we use in docker mode. Feel free to migrate this pipeline to your 
CI/CD tool of choice.

### AWS

We use AWS as our PaaS of choice. At the end of the pipeline it pushes a docker image with the application to ECR service
and update the ECS service. All infra configuration namely ECR, ECS, RDS, VPC, ELB, Clodwatch and S3 are in 
https://github.com/dsantibanezvera/lcm-sayu-infra with it owns pipeline, CircleCi as well.