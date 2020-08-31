package com.thoughtworks.resource

import io.quarkus.runtime.StartupEvent
import io.quarkus.runtime.configuration.ProfileManager
import io.vertx.ext.web.Router
import io.vertx.ext.web.handler.StaticHandler
import javax.enterprise.context.ApplicationScoped
import javax.enterprise.event.Observes
import javax.inject.Inject

@ApplicationScoped
class StaticResource {

    @Inject
    lateinit var router: Router

    fun startup(@Observes event: StartupEvent?) {
        if (ProfileManager.getActiveProfile() == "dev") {
            router.route("/static/*").handler { ctx ->
                ctx.response().sendFile("../../../../ui" + ctx.request().path())
            }
        } else {
            router.route("/static/*").handler(StaticHandler.create("META-INF/resources/static"))
        }
    }
}