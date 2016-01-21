import React, {Component} from 'react'
import Relay, {createContainer, Route, Store} from 'react-relay'
import {SignPetitionMutation} from './mutations/signPetition'

class PetitionSigningForm extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  onSubmit(event) {
    event.preventDefault()
    const {name: {value: name}, email: {value: email}} = event.target.elements
    Store.commitUpdate(new SignPetitionMutation({
      petition: this.props.petition,
      name,
      email
    }))
  }

  render() {
    return (
      <section>
        <form onSubmit={::this.onSubmit}>
          <label htmlFor="name">name:</label>
          <input type="text" name="name"/>
          <label htmlFor="email">email:</label>
          <input type="email" name="email"/>
          <button type="submit">Sign</button>
        </form>
      </section>
    )
  }
}

export default createContainer(PetitionSigningForm, {
  initialVariables: {
    count: null
  },
  fragments: {
    petition: () => Relay.QL`
        fragment on Petition{
            ${SignPetitionMutation.getFragment('petition')}
        }
    `
  }
})
