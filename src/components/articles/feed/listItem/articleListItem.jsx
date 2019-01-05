import React from 'react'
import {Link,Route} from 'react-router-dom'
import Modal from '../../../common/modal/modal'
import ArticlesForm from '../../form/articlesForm'
import DeleteConfirmation from '../../../common/prompts/confirmation'
import moment from 'moment'

const ArticleListItem = ({article}) =>
  <div className="cell small-12 medium-6 large-4 app-item">
    <div><h3><Link to={"/articles/"+article._id}>{article.name}</Link></h3></div>
    <div className="grid-x grid-padding-x">
      <div className="cell">
        <Link className="button hollow" to={"/articles/"+article._id+"/edit"}>Edit</Link>
        <Link className="button hollow" to={"/articles/"+article._id+"/delete"}>delete</Link>
      </div>
    </div>
    <div dangerouslySetInnerHTML={{ __html: article.description  }} />
		{/* <div><img src={article.image} width="100%"/></div> */}
    <div>{article.quoteDate && moment(article.quoteDate).format('LLL')}</div>
		<div>{article.visible && "Currently Active"}</div>
		<div>{article.category}</div>
    <Route path={`/articles/${article._id}/edit`} render={()=>
      <Modal med>
        <ArticlesForm article={article} />
      </Modal>
    } />
    <Route path={`/articles/${article._id}/delete`} render={()=>
      <Modal flex sml>
        <DeleteConfirmation
          message={"Are you sure you want to delete this article ?"}
          resource={"articles"}
          record={article}
        />
      </Modal>
    } />
  </div>

export default ArticleListItem
