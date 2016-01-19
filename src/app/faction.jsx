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
          <span>
            {ships.pageInfo.hasNextPage && (
              <button
                onClick={() => {setVariables({count: variables.count + 1})}}>
                see more
              </button>
            )}
          </span>
        </nav>
      </section>
    </section>
  )
}

export default createContainer(Faction, {
  initialVariables: {
    count: 1,
    after: null
  },
  fragments: {
    faction: () => Relay.QL`
        fragment on Faction{
            name
            ships (first:$count){
                edges {
                    node {
                        id
                        name
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    `
  }
})
