docker run --device=/dev/video0:/dev/video0



docker run -it --privileged -v /dev/video0:/dev/video0 --device=/dev/video0:/dev/video0 open2

scp -r $(ls | grep -v -e node_modules) pi@192.168.0.16:Documents/recognizefaces-opencv

sudo modprobe bcm2835-v4l2

https://www.raspberrypi.org/forums/viewtopic.php?t=126358