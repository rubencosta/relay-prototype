import React, {Component} from 'react'
import Relay, {createContainer, Route, Store} from 'react-relay'
import {Ships} from './ships.jsx'
import {IntroduceShipMutation} from './mutations/introduceShip'

class Faction extends Component{
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  render() {
    const {faction, relay: {variables}, location} = this.props
    const {router} = this.context
    return (
      <section>
        <h1>{name}</h1>
        <div>
          <span>
            {faction.ships.pageInfo.hasNextPage && (
              <button
                onClick={() => {router.push({
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
        <Ships ships={faction.ships}/>
      </section>
    )
  }
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
