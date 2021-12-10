# Restaurant Reservation System

Live Application: https://restaurant-client-mc.herokuapp.com/dashboard

## Summary

This application is for restaurant owners that want a quick and easy to use system that can keep track of their reservations and tables.

![Dashboard](https://user-images.githubusercontent.com/87444494/145303192-81f5c121-c02d-4303-a76f-fceaaba5aae2.jpg)

The dashboard will always display all tables, but it will display reservations based on the date. If there are no reservations for a given day, then the reservations table will be empty.

To make a new reservation click on the "New Reservation" button in the top left which will bring you to a page with a form for you to fill out.

![CreateReservation](https://user-images.githubusercontent.com/87444494/145304073-52543695-f187-4959-b57e-ac062f341eaf.jpg)

The form is simple to use and will warn you if you try to submit without filling in all the required fields.

If you need to make a change to a reservation that already exists, then all you need to do is click the "Edit" button on the dashboard which corresponds to that reservation. This will load up the edit page which should look pretty familiar because it is the same form you used to create a reservation with the only difference being all of the fields are already filled in with the information you saved previously. Of course you can cancel a reservation at any time by hitting the red "Cancel" button and that will set the reservation status to cancelled.

You'll also probably want to add tables that you can use to seat customers. In order to add tables, just click on the "New Table" button on the dashboard and that will open up a new form where you just need to fill out the table's name and seating capacity.

![CreateTable](https://user-images.githubusercontent.com/87444494/145305792-6afc5c10-9155-4fe0-95e9-ec4708d372f7.jpg)

When you wish to finally seat a reservation, click on the seat button of the reservation on the dashboard. This will open up the seat form which is a scroll down menu that has all the available tables listed. Simply select the table you wish to use and click the "Submit" button. 

![SeatReservation](https://user-images.githubusercontent.com/87444494/145311424-499586ad-a4aa-4c85-bda1-b4abd1cc45b2.jpg)

This will change the status of the reservation to seated and the table will not be available until you click the "Finish" button on the dashboard.

![SeatingDemo](https://user-images.githubusercontent.com/87444494/145311766-48d7adb9-bc22-429e-b4c7-1652f53ef0b4.jpg)

Lastly, if you want to quickly search up a reservation given the phone number, then click on the "Search" button from the dashboard. This will bring you to a page with a search form where you just need to input the phone number. This will work even if you dont have the entire phone number as it will return the closest results.

![SearchDemo2](https://user-images.githubusercontent.com/87444494/145312766-39715814-b88c-42b8-8b43-cbcb1c24f2de.jpg)


## API

POST /reservations adds a new reservation

GET /reservations/:reservations_id returns the reservation with the corresponding id  <br/>
PUT /reservations/:reservations_id updates the reservation with new information <br/>

GET /:reservation_id/status returns the reservation with the corresponding id <br/>
PUT /:reservation_id/status updates the reservation status <br/>

GET /tables returns all of the tables <br/>
POST /tables adds a new table <br/>

PUT /:tableId/seat changes the reservation status to seated and saves the reservation id to the table <br/>
DELETE /:tableId/seat changes the reservation status to finished and removes the reservation id from the table <br/>

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

## Made with

JavaScript and HTML








