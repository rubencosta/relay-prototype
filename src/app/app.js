import React, {Component} from 'react'
import Relay, {RootContainer, createContainer} from 'react-relay'
import {RelayRouter} from 'react-router-relay'
import {Route, Link, hashHistory} from 'react-router'

import Faction from './faction.jsx'

const empireQueries = {
  faction: () => Relay.QL`
      query {
          empire
      }
  `
}

const rebelsQueries = {
  faction: () => Relay.QL`
      query {
          rebels
      }
  `
}

const Dashboard = ({children}) => {
  return (
    <div>
      <h1>Star Wars</h1>
      <Link to="/empire">Empire</Link>
      <Link to="/rebels">Rebels</Link>
      {children}
    </div>
  )
}


export const App = () => {
  return (
    <RelayRouter history={hashHistory}>
      <Route
        path="/"
        component={Dashboard}>
        <Route
          path="/empire"
          component={Faction}
          queries={empireQueries}
        />
        <Route
          path="/rebels"
          component={Faction}
          queries={rebelsQueries}/>
      </Route>
    </RelayRouter>
  )
}