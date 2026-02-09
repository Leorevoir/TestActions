########################################

file (GLOB SOURCES "${CMAKE_CURRENT_SOURCE_DIR}/*.cpp")

add_executable (${PROJECT_NAME} ${SOURCES})

target_include_directories (${PROJECT_NAME} PRIVATE ${PROJECT_SOURCE_DIR}/Include)
target_link_libraries (${PROJECT_NAME} PRIVATE MemTideCore)

########################################
