import React, {Component} from 'react'
import Relay, {RootContainer, createContainer} from 'react-relay'
import {RelayRouter} from 'react-router-relay'
import {Route, Link, hashHistory} from 'react-router'

import Petition from './petition.jsx'
import PetitionIndex from './petitionIndex.jsx'

const petitionIndexQueries = {
  viewer: () => Relay.QL`query {viewer}`
}
const petitionQueries = {
  petition: () => Relay.QL`query {node(id: $id)}`
}

const Dashboard = ({children}) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/petitions">Petitions</Link>
      {children}
    </div>
  )
}

const prepareParams = (params, route) => ({
  ...params,
  count: params.count || route.defaultCount
})

export const App = () => {
  return (
    <RelayRouter history={hashHistory}>
      <Route
        path="/"
        component={Dashboard}
      >
        <Route
          path="petitions"
          component={PetitionIndex}
          queries={petitionIndexQueries}
        />
        <Route
          path="petitions/:id"
          component={Petition}
          queries={petitionQueries}
        />
      </Route>
    </RelayRouter>
  )
}