import React, {Component} from 'react'
import Relay, {createContainer, Route, Store} from 'react-relay'
import {Link} from 'react-router'

const PetitionIndex = (props) => {
  console.log(props)
  const {petitionList} = props
  return (
    <section>
      {petitionList.edges.map((edge) => (
        <li key={edge.node.id}>
          <Link to={`/petitions/${edge.node.id}`}>
            {edge.node.title}
          </Link>
        </li>
      ))}
    </section>
  )
}

export default createContainer(PetitionIndex, {
  fragments: {
    petitionList: () => Relay.QL`
        fragment on AllPetitions{
            petitions(first:1){
                edges{
                    node{
                        id
                        title
                    }
                }
                pageInfo{
                    endCursor
                    hasNextPage
                    hasPreviousPage
                    startCursor
                }
            }
        }

    `
  }
})
