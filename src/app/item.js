import React, {Component} from 'react'
import Relay, {createContainer, Route} from 'react-relay'

const Item = ({store: {id, name}}) => {
  return (
    <div>
      <h1>{name}</h1>
      {id}
      <hr />
    </div>
  )
}

export default createContainer(Item, {
  fragments: {
    store: () => Relay.QL`
        fragment on ShipEdge {
            node {
                id
                name
            }
        }
    `
  }
})
