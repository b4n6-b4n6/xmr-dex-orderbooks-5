#!/bin/bash

inp=$1
oup=$2

magick convert -density 384 -background transparent $inp -define icon:auto-resize=256,128,64,48,32,16 $oup