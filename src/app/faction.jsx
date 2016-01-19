import React, {Component} from 'react'
import Relay, {createContainer, Route} from 'react-relay'
import Item from './item'
import {Ships} from './ships.jsx'

const Faction = ({faction: {name, ships}, relay: {setVariables, variables}}) => {
  return (
    <section>
      <h1>{name}</h1>
      <section>
        <h1>Ships</h1>
        <ul>
          {ships.edges.map((edge, idx) => (
            <li key={idx}>{edge.node.name}</li>
          ))}
        </ul>
        <nav>
          <select
            onChange={(event) => {setVariables({listSize: event.target.value})}}
            value={variables.listSize}>
            {[1, 2, 3, 5, 10].map((size, idx) => <option key={idx} value={size}>{size}</option>)}
          </select>
          <span>
            <button
              onClick={() => {setVariables({after: null, before: ships.pageInfo.startCursor})}}
              disabled={!ships.pageInfo.hasPreviousPage}>
              back
            </button>
          </span>
          <span>
            <button
              onClick={() => {setVariables({after: ships.pageInfo.endCursor, before: null})}}
              disabled={!ships.pageInfo.hasNextPage}>
              next
            </button>
          </span>
        </nav>
      </section>
    </section>
  )
}

export default createContainer(Faction, {
  initialVariables: {
    listSize: 1,
    after: null,
    before: null,
  },
  fragments: {
    faction: () => Relay.QL`
        fragment on Faction{
            name
            ships (first: $listSize, after: $after){
                edges {
                    node {
                        id
                        name
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                    hasPreviousPage
                    startCursor
                }
            }
        }
    `
  }
})
