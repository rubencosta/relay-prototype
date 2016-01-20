import React, {Component} from 'react'
import Relay, {createContainer} from 'react-relay'

const Ship = ({ship: {name}}) => {
  return (
    <li>
      {name}
    </li>
  )
}

export default createContainer(Ship, {
  fragments: {
    ship: () => Relay.QL`
        fragment on Ship {
            name
        }
    `
  }
})
