import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Questions from "./components/Questions";
import Question from "./components/Question";
import CreateQuestion from "./components/CreateQuestion";
import EditQuestion from "./components/EditQuestion";
import DeleteQuestion from "./components/DeleteQuestion";

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Questions />
      </Route>
      <Route path="/question/:id">
        <Question />
      </Route>
      <Route path="/createQuestion">
        <CreateQuestion />
      </Route>
      <Route path="/editQuestion/:id">
        <EditQuestion />
      </Route>
      <Route path="/deleteQuestion/:id">
        <DeleteQuestion />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
