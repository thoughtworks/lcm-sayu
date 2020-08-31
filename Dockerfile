FROM oracle/graalvm-ce:latest AS builder
RUN gu install native-image

WORKDIR /app

COPY . .
RUN make build

FROM scratch

WORKDIR /app
COPY --from=builder /app/build/pain-control-1.0.0-SNAPSHOT-runner ./lcm-sayu
CMD ["./lcm-sayu"]
