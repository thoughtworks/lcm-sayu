FROM oracle/graalvm-ce:20.2.0-java11 AS builder
RUN gu install native-image
RUN CGO_ENABLED=0

WORKDIR /app

COPY . .
RUN make build

FROM oracle/graalvm-ce:20.2.0-java11
ARG username
ARG password
ARG url
ARG port
ARG name

ENV DB_USERNAME=$username
ENV DB_PASSWORD=$password
ENV DB_URL=$url
ENV DB_PORT=$port
ENV DB_NAME=$name

WORKDIR /app
COPY --from=builder /app/build/lcm-sayu-1.0.0-SNAPSHOT-runner lcm-sayu
CMD ["./lcm-sayu"]
