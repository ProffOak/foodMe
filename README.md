# Food Me

A MEAN-stack project for a new way to find interesting recipies online,
and facilitate the weekly grocery shopping for the whole family.
Built with Angular 2+ and Node express.


## Live
Application at https://foodme-199118.firebaseapp.com/#/
API at https://foodme-199118.appspot.com/


## Install and startup

Install with `npm install`

Start both client and server `npm start`

Start server only:  `npm run server`

Start Client only:  `npm run client`

## Functional Specification

FoodMe will be a web application that offers an easy way to find recipes for the weekly grocery shopping.
You will be able to search recipes based on different categories, such as cuisine or dietary needs.
For simple recipe selection recipes will be randomly displayed one at a time, where you will either save the recipe to shopping list or move on to the recipe.
You will be able to create own recipes, that will be stored in our own database

## Technical Specification

* Front-end: Angular, Angular Material for design
* Back-end: REST API written in NodeJS with Express
* Database: MongoDB hosted via mongoDB Atlas on AWS server, Mongoose library is used for connecting database and server
* Deployment: npm for dependencies and building, Travis CI for auto deployment
* Hosting: Front-end hosted via Firebase, back-end hosted on Google App Engine