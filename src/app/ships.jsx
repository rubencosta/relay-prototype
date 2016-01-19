import React, {Component} from 'react'
import Relay, {createContainer} from 'react-relay'

class ShipsClass extends Component {
  render() {
    console.log(this.props)
    const {ships} = this.props
    return (
      <div>
        {ships.edges.map(edge => (
          <div key={edge.node.id}>
            <h3>{edge.node.name}</h3>
          </div>
        ))}
      </div>
    )
  }
}


export const Ships = createContainer(ShipsClass, {
  fragments: {
    faction: () => Relay.QL`
        fragment on Faction {
            ships (first:10){
                edges {
                    node {
                        id
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                    hasPreviousPage
                    startCursor
                }
            }
        }`
  }
})