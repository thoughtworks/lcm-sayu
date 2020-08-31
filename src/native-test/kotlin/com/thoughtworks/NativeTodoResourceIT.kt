package com.thoughtworks

import com.thoughtworks.resource.TodoResourceTest
import io.quarkus.test.junit.NativeImageTest

@NativeImageTest
class NativeTodoResourceIT : TodoResourceTest()