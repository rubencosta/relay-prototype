import Relay, {Mutation} from 'react-relay'

export class IntroduceShipMutation extends Mutation {
  static fragments = {
    faction: () => Relay.QL`
        fragment on Faction{
            id
        }
    `
  };

  getMutation() {
    return Relay.QL`
        mutation {
            introduceShip
        }
    `
  }
  getVariables() {
    return {
      shipName: 'XXX',
      factionId: this.props.faction.id
    }
  }
  getFatQuery(){
    return Relay.QL`
        fragment on IntroduceShipPayload{
            faction{
                ships
            }
        }
    `
  }
  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          faction: this.props.faction.id
        }
      }]
  }
}
