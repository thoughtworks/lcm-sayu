import React from "react";

import { Container, Title, Description } from "./styles";

export default function Todo({id, title, description}) {
  return (
      <Container>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Container>
  );
}