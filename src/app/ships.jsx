import React, {Component} from 'react'
import Relay, {createContainer, Store} from 'react-relay'

import Ship from './ship.jsx'

class ShipsClass extends Component {
  render() {
    const {ships} = this.props
    return (
      <section>
        <h1>Ships</h1>
        <ul>
          {ships.edges.map((edge) => (
            <Ship key={edge.node.id} ship={edge.node}/>
          ))}
        </ul>
      </section>
    )
  }
}


export const Ships = createContainer(ShipsClass, {
  fragments: {
    ships: () => Relay.QL`
        fragment on ShipConnection {
            edges {
                node {
                    id
                    ${Ship.getFragment('ship')}
                }
            }
            pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
            }
        }`
  }
})