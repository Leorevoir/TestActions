if (CMAKE_CXX_COMPILER_ID MATCHES "Clang|AppleClang")
    target_compile_options(${PROJECT_NAME} PRIVATE
        -Wall -Wextra -Werror -Wpedantic
        -Wconversion -Wsign-conversion
        -Wshadow -Wnull-dereference
        -Wundef -Wuninitialized
        -Wcast-align -Wcast-qual
        -Wswitch-default
        -Wdouble-promotion
        -Wformat=2
        -Wwrite-strings
    )

elseif (CMAKE_CXX_COMPILER_ID STREQUAL "GNU")
    target_compile_options(${PROJECT_NAME} PRIVATE
        -Wall -Wextra -Werror -Wpedantic
        -Wconversion -Wsign-conversion
        -Wshadow -Wnull-dereference
        -Wundef -Wuninitialized -Winit-self
        -Wredundant-decls
        -Wcast-align -Wcast-qual
        -Wmissing-declarations -Wswitch-default
        -Wdouble-promotion -Wformat=2 -Wwrite-strings
    )

else ()
    message(FATAL_ERROR "Unsupported compiler: ${CMAKE_CXX_COMPILER_ID}")
endif ()

########################################
