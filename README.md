# About
This is the frontend application part of this challenge.

The project was built using React + Typescript, and Node v12.2.0.
I also use Sass and Bootstrap to build the interface/visual components.

**Developer:** Claudio Luis Freudenburg Dias \<claudioldf@gmail.com>

# How to runs this project
In order to runs this project I've created a Dockerfile/docker-compose file.
So you can runs it on docker, just do:
```bash
# Build the image
$ docker-compose build

# Install npm deps
$ docker-compose run app_frontend_react npm install

# Start the project
$ docker-compose up

# It will start the project on http://localhost:3000
```

However if you want to runs it without docker, you should do the following steps:
```bash
npm install
npm start
```