FROM resin/rpi-raspbian:jessie

RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install -y wget
RUN apt-get install libraspberrypi-bin -y
RUN usermod -a -G video root
RUN apt-get install cmake
RUN apt-get install -y build-essential curl git

RUN curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh

RUN bash nodesource_setup.sh

RUN apt-get install -y nodejs

ADD . . 

RUN npm i 

CMD ["node", "index.js"]