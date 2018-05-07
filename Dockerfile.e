FROM rusxg/ubuntu-cmake

RUN apt-get update

RUN apt-get -qq update

RUN apt-get install -y build-essential curl git

RUN curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh

RUN bash nodesource_setup.sh

RUN apt-get install -y nodejs

CMD [ "node", "-e", "console.log('welcome to nodejs cmake ;)')" ]
