import React, {Component} from 'react'
import Relay, {createContainer, Route, Store} from 'react-relay'
import {Ships} from './ships.jsx'
import {IntroduceShipMutation} from './mutations/introduceShip'

const Faction = ({faction, relay: {setVariables, variables}, history, location}) => {
  const {name, ships} = faction
  return (
    <section>
      <h1>{name}</h1>
      <Ships ships={faction.ships}/>
      <div>
          <span>
            {ships.pageInfo.hasNextPage && (
              <button
                onClick={() => {history.push({
                state:{count: variables.count + 1},
                pathname: location.pathname
                })}}>
                see more
              </button>
            )}
          </span>
          <span>
            <button
              onClick={() => {Store.commitUpdate(new IntroduceShipMutation({faction}))}}>
              add ship
            </button>
          </span>
      </div>
    </section>
  )
}

export default createContainer(Faction, {
  initialVariables: {
    count: null
  },
  fragments: {
    faction: () => Relay.QL`
        fragment on Faction{
            name
            ships (first:$count){
                pageInfo{
                    endCursor
                    hasNextPage
                }
                ${Ships.getFragment('ships')}
            }
            ${IntroduceShipMutation.getFragment('faction')}
        }
    `
  }
})
