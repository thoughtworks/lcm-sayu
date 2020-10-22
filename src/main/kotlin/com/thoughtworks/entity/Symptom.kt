package com.thoughtworks.entity
import io.quarkus.hibernate.orm.panache.kotlin.PanacheCompanion
import io.quarkus.hibernate.orm.panache.kotlin.PanacheEntity
import javax.persistence.*

@Entity
@Table(name = "symptom")
class Symptom: PanacheEntity() {
    companion object: PanacheCompanion<Symptom, Long> {
        @get:Id
        @get:GeneratedValue(strategy = GenerationType.IDENTITY)
        @get:Column(name = "id")
        var id=0
    }


    lateinit var name: String
}