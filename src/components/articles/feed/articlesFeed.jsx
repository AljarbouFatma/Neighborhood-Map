import React from 'react'
import ArticleListItem from './listItem/articleListItem'
const ArticlesFeed = ({articles}) => {
  return (
    <div className="grid-x grid-margin-x grid-margin-y grid-padding-x grid-padding-y">
      {articles.map(article=>
        <ArticleListItem key={article._id} article={article} />
      )}
    </div>
  )
}

export default ArticlesFeed
