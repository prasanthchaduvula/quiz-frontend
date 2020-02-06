import React from 'react';
import '../stylesheet/style.scss';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Hero from './Hero';
import Signup from './Signup';
import Signin from './Signin';
import Notfound from './Notfound';
import Home from './Home';
import Showquiz from './Showquiz';
import EditQuestion from './EditQuestion';
import CreateQuizset from './CreateQuizset';
import EditQuizset from './EditQuizset';
import AddQuestion from './AddQuestion';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      islogged: false
    };
  }

  handleIslogged = value => {
    this.setState({ islogged: value });
  };
  PublicRoutes() {
    return (
      <>
        <Switch>
          <Route exact path="/admins">
            <Header handleIslogged={this.handleIslogged} />
            <Hero />
          </Route>
          <Route exact path="/admins/signup">
            <Header handleIslogged={this.handleIslogged} />
            <Signup />
          </Route>
          <Route exact path="/admins/signin">
            <Header handleIslogged={this.handleIslogged} />
            <Signin handleIslogged={this.handleIslogged} />
          </Route>
          <Route exact>
            <Notfound />
          </Route>
        </Switch>
      </>
    );
  }
  PrivateRoutes() {
    return (
      <>
        <Switch>
          <Route exact path="/admins/:adminname">
            <Header handleIslogged={this.handleIslogged} />
            <Home />
          </Route>
          <Route exact path="/admins/:adminname/quizsets/create">
            <Header handleIslogged={this.handleIslogged} />
            <CreateQuizset />
          </Route>
          <Route exact path="/admins/:adminname/quizsets/:quizname/:id/edit">
            <Header handleIslogged={this.handleIslogged} />
            <EditQuizset />
          </Route>
          <Route exact path="/admins/:adminname/quizsets/:quizname/:id">
            <Header handleIslogged={this.handleIslogged} />
            <Showquiz />
          </Route>
          <Route
            exact
            path="/admins/:adminname/quizsets/:quizname/:id/addquestion"
          >
            <Header handleIslogged={this.handleIslogged} />
            <AddQuestion />
          </Route>
          <Route
            exact
            path="/admins/:adminname/quizsets/:quizname/:title/:id/edit"
          >
            <Header handleIslogged={this.handleIslogged} />
            <EditQuestion />
          </Route>
          <Route exact>
            <Notfound />
          </Route>
        </Switch>
      </>
    );
  }

  render() {
    return (
      <>
        {localStorage.quizAdminToken
          ? this.PrivateRoutes()
          : this.PublicRoutes()}
      </>
    );
  }
}

export default App;
