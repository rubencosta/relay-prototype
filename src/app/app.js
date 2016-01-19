import React, {Component} from 'react'
import Relay, {RootContainer, createContainer, Route} from 'react-relay'

import Faction from './faction.jsx'

class EmpireRoute extends Route {
  static queries = {
    faction: () => Relay.QL`
        query {
            empire
        }
    `
  };

  static routeName = 'EmpireRoute';
}
class RebelsRoute extends Route {
  static queries = {
    faction: () => Relay.QL`
        query {
            rebels
        }
    `
  };

  static routeName = 'RebelsRoute';
}


export const App = () => {
  return (
    <div>
      <h1>StarWars</h1>
      <RootContainer Component={Faction} route={new EmpireRoute()}/>
      <RootContainer Component={Faction} route={new RebelsRoute()}/>
    </div>
  )
}