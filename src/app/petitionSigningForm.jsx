import React, {Component} from 'react'
import Relay, {createContainer, Store} from 'react-relay'
import {SignPetitionMutation} from './mutations/signPetition'

class PetitionSigningForm extends Component {
  onSubmit(event) {
    event.preventDefault()
    const {name: {value: name}, email: {value: email}} = event.target.elements
    Store.applyUpdate(new SignPetitionMutation({
      petition: this.props.petition,
      name,
      email
    }), {onFailure: ::this.onFailure, onSuccess: ::this.onSuccess}).commit()
  }

  onSuccess() {
    this.reset()
  }

  onFailure(transaction) {
    const error = transaction.getError() || new Error('Mutation failed.')
    console.error(error)
  }

  reset() {
    this.refs.form.reset()
  }

  render() {
    return (
      <section>
        <form ref="form" onSubmit={::this.onSubmit}>
          <label htmlFor="name">name:</label>
          <input
            type="text"
            name="name"
            required/>
          <label htmlFor="email">email:</label>
          <input
            type="email"
            name="email"
            required/>
          <button type="submit">Sign</button>
          <button onClick={::this.reset}>reset</button>
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
