find_program(CCACHE_PROGRAM ccache)

if (CCACHE_PROGRAM)
    set_property(GLOBAL PROPERTY RULE_LAUNCH_COMPILE ${CCACHE_PROGRAM})
    set_property(GLOBAL PROPERTY RULE_LAUNCH_LINK ${CCACHE_PROGRAM})
    message(STATUS "INFO: using ccache to : ${CCACHE_PROGRAM}")
endif ()

########################################

include(ProcessorCount)
ProcessorCount(NCPU)

if (NOT NCPU EQUAL 0)
    set(CMAKE_BUILD_PARALLEL_LEVEL ${NCPU})
    set(PROCESSOR_COUNT ${NCPU} CACHE INTERNAL "Number of processors detected")
    message(STATUS "INFO: setting parallel build level to ${NCPU}")
endif ()

########################################

find_program(MOLD_LINKER mold)

if (MOLD_LINKER)
    set(MEMTIDE_CMAKE_LINKER mold)
endif ()

########################################

if (MEMTIDE_CMAKE_LINKER)
    add_link_options(
        -fuse-ld=${MEMTIDE_CMAKE_LINKER}
        -Wl,--threads=${PROCESSOR_COUNT}
    )
    message(STATUS "INFO: using ${MEMTIDE_CMAKE_LINKER} linker with ${PROCESSOR_COUNT} threads")
endif ()

########################################
