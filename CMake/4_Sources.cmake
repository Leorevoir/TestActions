########################################

function (memtide_add_module MODULE_NAME)

    file (GLOB_RECURSE SOURCES "${CMAKE_CURRENT_SOURCE_DIR}/*.cpp" "${CMAKE_CURRENT_SOURCE_DIR}/*.c")
    file (GLOB_RECURSE HEADERS "${CMAKE_CURRENT_SOURCE_DIR}/*.hpp" "${CMAKE_CURRENT_SOURCE_DIR}/*.h"
                               "${PROJECT_SOURCE_DIR}/Include/${MODULE_NAME}/*.hpp"
                               "${PROJECT_SOURCE_DIR}/Include/${MODULE_NAME}/*.h")

    add_library (${MODULE_NAME} SHARED ${SOURCES} ${HEADERS})

    set_target_properties (${MODULE_NAME} PROPERTIES
        POSITION_INDEPENDENT_CODE ON
        VERSION 1.0.0
        SOVERSION 1)

    target_include_directories (${MODULE_NAME}
        PUBLIC
            $<BUILD_INTERFACE:${PROJECT_SOURCE_DIR}/Include>
            $<INSTALL_INTERFACE:include>
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR})

endfunction ()

########################################

file (GLOB CHILDREN RELATIVE "${CMAKE_CURRENT_SOURCE_DIR}/Source" "${CMAKE_CURRENT_SOURCE_DIR}/Source/*")

foreach (child ${CHILDREN})

    if (IS_DIRECTORY "${CMAKE_CURRENT_SOURCE_DIR}/Source/${child}")
        add_subdirectory ("Source/${child}")
    endif ()

endforeach ()

add_subdirectory (Source)

########################################

