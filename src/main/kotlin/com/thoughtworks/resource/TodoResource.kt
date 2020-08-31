package com.thoughtworks.resource

import com.thoughtworks.entity.Todo
import javax.ws.rs.Consumes
import javax.ws.rs.GET
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType

@Path("/api/todos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
class TodoResource {

    @GET
    fun all() = Todo.findAll().list()

}