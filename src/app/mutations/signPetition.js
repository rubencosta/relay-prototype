import Relay, {Mutation} from 'react-relay'

export class SignPetitionMutation extends Mutation {
  static fragments = {
    petition: () => Relay.QL`
        fragment on Petition{
            id
        }
    `
  };

  getMutation() {
    return Relay.QL`
        mutation {
            signPetition
        }
    `
  }
  getVariables() {
    return {
      petitionId: this.props.petition.id,
      name: this.props.name,
      email: this.props.email,
    }
  }
  getFatQuery(){
    return Relay.QL`
        fragment on signPetitionPayload{
            petition
        }
    `
  }
  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          petition: this.props.petition.id
        }
      }]
  }
}
