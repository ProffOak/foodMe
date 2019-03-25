# Food Me

A MEAN-stack project for a new way to find interesting recipies online,
and facilitate the weekly grocery shopping for the whole family.
Built with Angular 2+ and Node express.


## Live
**Application at:** [https://foodme-7a008.firebaseapp.com/#/](https://foodme-7a008.firebaseapp.com/#/)

**Screen cast of project:** [https://youtu.be/CMI8UIB2y7c](https://youtu.be/CMI8UIB2y7c)


## Install and startup

(Requires [NodeJS](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) to be installed)

Install with `npm install`

Start both client and server `npm start`

Start server only:  `npm run server`

Start Client only:  `npm run client`

## Functional Specification

FoodMe will be a web application that offers an easy way to find recipes for the weekly grocery shopping.
You will be able to get recipes based on different categories, such as cuisine or dietary needs.
For simple recipe selection recipes will be randomly displayed one at a time, where you will either save the recipe to the cart or move on to the next recipe.
You will be able to create an account and access the cart across multiple devices.
You will be able to create own recipes, that will be stored in our own database and shown to others.


## Technical Specification

* Front-end: [Angular](https://angular.io/), [Angular Material](https://material.angular.io/) and Angular [Flex-layout](https://github.com/angular/flex-layout) for design
* Back-end: REST API written in [NodeJS](https://nodejs.org/en/) with [Express](https://expressjs.com/)
* Database: [MongoDB](https://www.mongodb.com/) hosted via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) on AWS server, [Mongoose](http://mongoosejs.com/) is used for object modelling and connecting database and server
* Deployment: [npm](https://www.npmjs.com/) for dependencies, [Angular CLI](https://cli.angular.io/) building frontend, [Travis CI](https://travis-ci.org/) for continuous integration and auto deployment
* Hosting: Front-end hosted via [Firebase](https://firebase.google.com/docs/hosting/), Back-end hosted on [Google App Engine](https://cloud.google.com/appengine/)
* For authentication and user credentials [Firebase Authentication](https://firebase.google.com/docs/auth/) is used both in frontend and backend