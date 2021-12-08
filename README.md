# Restaurant Reservation Project

Live Application: https://restaurant-client-mc.herokuapp.com/dashboard

## Database setup

1. Set up four new ElephantSQL database instances - development, test, preview, and production.
1. After setting up your database instances, connect DBeaver to your new database instances.

### Knex

Run `npx knex` commands from within the `back-end` folder, which is where the `knexfile.js` file is located.

## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5000`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.

If you have trouble getting the server to run, reach out for assistance.

## Running tests

This project has unit, integration, and end-to-end (e2e) tests.
End-to-end tests use browser automation to interact with the application just like the user does.

## Summary

This application is for restaurant owners that want a quick and easy to use system that can keep track of their reservations and available tables.

![Dashboard](https://user-images.githubusercontent.com/87444494/145303192-81f5c121-c02d-4303-a76f-fceaaba5aae2.jpg)

The dashboard will always display all tables, but it will display reservations based on the date. If there are no reservations for a given day, then the reservations table will be empty.

To make a new reservation click on the "New Reservation" button in the top left which will bring you to a page with a form for you to fill out.

![CreateReservation](https://user-images.githubusercontent.com/87444494/145304073-52543695-f187-4959-b57e-ac062f341eaf.jpg)

The form is simple to use and will warn you if you try to submit without filling in all the required fields.

If you need to make a change to a reservation that already exists, then all you need to do is click the "Edit" button on the dashboard which corresponds to that reservation. This will load up the edit page which should look pretty familiar because it is the same form you used to create a reservation with the only difference being all of the fields are already filled in with the information you saved previously. Of course you can cancel a reservation at any time by hitting the red "Cancel" button and that will set the reservation status to cancelled.


