import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import CreateReservation from "./CreateReservation";
import useQuery from "../utils/useQuery.js";
import TableForm from "./Forms/tableForm";
import SeatForm from "./Forms/seatForm";
import Search from "../search/Search";
import EditReservation from "./EditReservation";

function Routes() {
  const query = useQuery();
  const date = query.get("date");
  
  return (
    <Switch>
      <Route exact path ="/search">
        <Search/>
      </Route>
      <Route exact path="/tables/new">
        <TableForm />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <SeatForm />
      </Route>
      <Route exact path='/reservations/:reservation_id/edit'>
        <EditReservation />
      </Route>
      <Route exact={true} path="/reservations/new">
        <CreateReservation />
      </Route>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date||today()} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
