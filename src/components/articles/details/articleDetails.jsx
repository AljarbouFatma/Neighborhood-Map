import React from 'react'

const ArticleDetails  = ({match}) => {
  const {id} = match.params
  return (
    <div className="grid-container">
      <div className="grid-x grid-padding-x grid-padding-y grid-margin-x grid-margin-y">
        <div className="cell">
          <div><h1>{id}</h1></div>
        </div>
      </div>
    </div>
  )
}

export default ArticleDetails
