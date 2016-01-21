import React, {Component} from 'react'
import Relay, {createContainer, Route, Store} from 'react-relay'
import {Link} from 'react-router'

const PetitionIndex = ({viewer, relay}) => {
  console.log(viewer.allPetitions.pageInfo)
  return (
    <section>
      <ul>
        {viewer.allPetitions.edges.map((edge) => (
          <li key={edge.node.id}>
            <Link to={`/petitions/${edge.node.id}`}>
              {edge.node.title}
            </Link>
          </li>
        ))}
      </ul>
      <span>
        <button
          onClick={() => {relay.setVariables({
          after: null,
          before: viewer.allPetitions.pageInfo.startCursor,
          isNext: false
          })}}>
          back
        </button>
      </span>
      <span>
        <button
          onClick={() => {relay.setVariables({
          after: viewer.allPetitions.pageInfo.endCursor,
          before: null,
          isNext: true
          })}}>
          next
        </button>
      </span>
    </section>
  )
}

export default createContainer(PetitionIndex, {
  initialVariables: {
    after: null,
    before: null,
    isNext: true,
    count: 2
  },
  fragments: {
    viewer: () => Relay.QL`
        fragment on Viewer{
            allPetitions(first:$count, after:$after) @include(if: $isNext){
                edges{
                    node{
                        id
                        title
                    }
                    cursor
                }
                pageInfo{
                    endCursor
                    hasNextPage
                    hasPreviousPage
                    startCursor
                }
            }
            allPetitions(before:$before, last:$count) @skip(if: $isNext){
                edges{
                    node{
                        id
                        title
                    }
                    cursor
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
