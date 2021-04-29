
import { Box } from "@material-ui/core";
import { useClasses } from "./Content.style";
import { Switch, Route } from "react-router-dom";
import Login from "../../Pages/Login";
import SignUp from "../../Pages/SignUp";
import Home from "../../Pages/Home";
import NoMatch from "../../Pages/NoMatch";
import Welcome from "../../Pages/Welcome";
import Dashboard from "../../Pages/Dashboard";

export interface BasicLocation {
  longitude: number | null;
  latitude: number | null;
}

const ContentComponent = () => {
  const classes = useClasses();

  return (
    <Box className={classes.content_wrapper}>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/welcome">
          <Welcome/>
        </Route>
        <Route  path="/dashboard">
          <Dashboard/>
        </Route>
        <Route exact path="/">
          <Welcome/>
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Box>
  );
};

export default ContentComponent;
