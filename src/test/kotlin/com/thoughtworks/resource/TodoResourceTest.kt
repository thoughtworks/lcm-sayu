package com.thoughtworks.resource

import io.quarkus.test.junit.QuarkusTest
import io.restassured.RestAssured.given
import org.hamcrest.CoreMatchers.*
import org.junit.jupiter.api.Test

@QuarkusTest
class TodoResourceTest {

    // @Test
    // fun testHelloEndpoint() {
    //     given()
    //       .`when`().get("/api/todos")
    //       .then()
    //          .statusCode(200)
    //          .body("id", hasItems(1, 2))
    // }

}