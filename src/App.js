import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllPeople from "./components/AllPeople";
import MainPage from "./components/MainPage";
import SinglePerson from "./components/SinglePerson";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>

        <Route path="/people" exact>
          <AllPeople />
        </Route>

        <Route path="/people/:personid" exact>
          <SinglePerson />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
