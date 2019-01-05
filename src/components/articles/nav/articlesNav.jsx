import React from 'react'
import {Link} from 'react-router-dom'

const ArticlesNav = () => {
  return (
    <div className="grid-x grid-margin-x grid-padding-x grid-padding-y">
      <div className="cell text-center">
        <Link className="button hollow" to="/articles/new"><b>New Article</b></Link>
      </div>
    </div>
  )
}

export default ArticlesNav
