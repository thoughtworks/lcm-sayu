package com.thoughtworks.entity

import io.quarkus.hibernate.orm.panache.kotlin.PanacheCompanion
import io.quarkus.hibernate.orm.panache.kotlin.PanacheEntity
import javax.persistence.Entity
import javax.persistence.Table

@Entity
@Table(name = "todos")
class Todo : PanacheEntity() {

    companion object: PanacheCompanion<Todo, Long> {
        fun findByTitle(title: String) = find("title", title).firstResult()
    }

    lateinit var title: String
    lateinit var description: String
}