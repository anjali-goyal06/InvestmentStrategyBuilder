import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import { Navbar } from './components/Navbar';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';
import { Home } from "./components/Home";
import { ReadPStrategy } from "./components/ReadPStrategy";
import AllImplementationsData  from './components/AllImplementationsData'
import { ViewStrategy } from "./components/ViewStrategy";

function App() {
  return (
    <>
    <Router>
    <Navbar/>
    <Switch>
      <Route exact path="/">
      <SignUp/>
      </Route>
      <Route exact path="/login">
        <Login/>
      </Route>
      <Route exact path="/home">
        <Home/>
      </Route>
      <Route exact path="/Implementations">
        <AllImplementationsData/>
      </Route>
      <Route exact path="/read-p-strategy">
        <ReadPStrategy/>
      </Route>

      <Route path="/StrategyImplementations">
         <ViewStrategy/>
      </Route>

    </Switch>
    </Router>
    </>
  );
}

export default App;
