package com.thoughtworks.resource

import com.thoughtworks.entity.Symptom
import io.quarkus.hibernate.orm.panache.kotlin.runtime.JpaOperations.persist
import javax.ws.rs.*
import javax.ws.rs.core.MediaType
import javax.transaction.Transactional
import javax.ws.rs.core.Response

@Path("/symptom")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
class SymptomResource() {

    @GET
    fun all() = Symptom.findAll().list()

    @POST
    @Transactional
    fun add(symptom: Symptom): Response {
        symptom.persist()
        return Response.ok(symptom).status(201).build()
    }

    /*@POST
    @Transactional
    fun add(symptom: Symptom): Response {
        repository.persist(symptom)
        return Response.ok(symptom).status(201).build()
    }
*/
}