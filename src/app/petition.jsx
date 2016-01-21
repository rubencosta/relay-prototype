import React, {Component} from 'react'
import Relay, {createContainer, Route, Store} from 'react-relay'
import PetitionSigningForm from './petitionSigningForm.jsx'

const Petition = ({petition}) => {
  return (
    <section>
      <h1>{petition.title}</h1>
      <p>{petition.text}</p>
      <p>{petition.cover}</p>
      <PetitionSigningForm petition={petition}/>
    </section>
  )
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
