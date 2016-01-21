import React, {Component} from 'react'
import Relay, {RootContainer, createContainer} from 'react-relay'
import {RelayRouter} from 'react-router-relay'
import {Route, Link, hashHistory} from 'react-router'

import Petition from './petition.jsx'

const petitionQueries = {
  petition: () => Relay.QL`query {petition(id: $id)}`
}

const Dashboard = ({children}) => {
  return (
    <div>
      <h1>Petition</h1>
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
        component={Dashboard}>
        <Route
          path="petition/:id"
          component={Petition}
          queries={petitionQueries}
        />
      </Route>
    </RelayRouter>
  )
}