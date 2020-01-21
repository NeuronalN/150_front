import React, { Component } from 'react';
import './App.css';
import Home from './home/home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GroupList from './groupList/GroupList';
import GroupEdit from './groupEdit/GroupEdit';
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/users' exact={true} component={GroupList}/>
          <Route path='/users/:id' component={GroupEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;