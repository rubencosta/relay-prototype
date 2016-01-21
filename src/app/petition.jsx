import React, {Component} from 'react'
import Relay, {createContainer, Route, Store} from 'react-relay'
import PetitionSigningForm from './petitionSigningForm.jsx'

class Petition extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  render() {
    const {petition, relay: {variables}, location} = this.props
    const {router} = this.context
    return (
      <section>
        <h1>{petition.title}</h1>
        <p>{petition.text}</p>
        <p>{petition.cover}</p>
        <PetitionSigningForm petition={petition}/>
      </section>
    )
  }
}

export default createContainer(Petition, {
  initialVariables: {
    count: null
  },
  fragments: {
    petition: () => Relay.QL`
        fragment on Petition{
            title
            text
            cover
            ${PetitionSigningForm.getFragment('petition')}
        }
    `
  }
})
