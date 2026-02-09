cmake_minimum_required(VERSION 3.16)
project(MemTide LANGUAGES CXX C)

########################################

list(APPEND CMAKE_MODULE_PATH "${CMAKE_SOURCE_DIR}/CMake")

########################################

include(1_Options)
include(2_Optimizations)
include(3_External)
include(4_Sources)
include(5_Warnings)
include(6_Install)
include(7_Tests)
