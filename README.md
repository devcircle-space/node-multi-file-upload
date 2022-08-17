# node-multi-file-upload

A simple Node/Express application to demonstrate multi-file upload, using Multer.

## Stack

-   NodeJS
-   Express.js
-   Multer

## Getting Started

-   Clone the project and run `npm i` to install all dependencies.
-   By default, application starts up at `PORT=4001`
-   Make sure to provide your own MongoDB URI for upload functionality to work

## API Endpoints

Since this is a headless API, in order to see it in action, please use your preferred REST API testing tool - like Postman.

To keep everything simple, there are only 3 endpoints:

-   `/`
-   `/upload/single`.
-   `/upload/multiple` (by default accepts maximum 3 jpg/jpeg/png files only.)

