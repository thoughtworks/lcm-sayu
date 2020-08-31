import React from "react";
import useSWR from "swr";

import { Container, Title, List } from "./styles";

import Todo from "../Todo";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Todos() {
  const { data, error } = useSWR("/api/todos", fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
      <Container>
        <Title>TODOS</Title>
        <List>
          {data.map(todo => <Todo key={todo.id} {...todo} />)}
        </List>
      </Container>
  );
}